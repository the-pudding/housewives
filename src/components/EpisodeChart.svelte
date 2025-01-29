<script>
	import Clip from "$components/Clip.svelte";
	import data from "$data/apologies.csv";
	import _ from "lodash";
	import { scaleTime } from "d3-scale";
	import { timeParse } from "d3-time-format";
	import { current } from "$runes/misc.svelte.js";

	const { slideI, view } = $props(); // TODO: instead of slideI, probably use current within Clip to detect changes

	let showing = $state(undefined);
	let width = $state(0);
	let showApologies = $derived(view !== "blank");

	const parseDuration = timeParse("%M:%S:%L");
	const totalEpisodes = _.maxBy(data, "totalEpisode").totalEpisode;

	const standardize = (timestamp) => {
		const parsedTime = parseDuration(timestamp);
		if (!parsedTime) return null;

		const baseDate = new Date(0);
		const standardizedTime = new Date(baseDate);
		standardizedTime.setHours(parsedTime.getHours());
		standardizedTime.setMinutes(parsedTime.getMinutes());
		standardizedTime.setSeconds(parsedTime.getSeconds());
		return standardizedTime;
	};

	// TODO: each episode has a different duration
	const xScale = $derived(
		scaleTime()
			.domain([standardize("00:00:00"), standardize("59:59:59")])
			.range([0, width])
	);

	const onClick = (id) => {
		showing = id;
	};

	const slideChange = () => {
		if (current.slide !== slideI) return;
		showing = undefined;
	};

	$effect(() => slideChange(current.slide, current.subslide));
</script>

<figure bind:clientWidth={width}>
	<div class="episodes">
		<div class="x-labels">
			<div>0 minutes</div>
			<div>60 m</div>
		</div>
		{#each _.range(totalEpisodes) as i}
			{@const apologiesInEpisode = data.filter(
				(d) => +d.totalEpisode === i + 1
			)}
			<div class="episode">
				{#if i === 0 || i === totalEpisodes - 1}
					<div class="y-label">ep #{i + 1}</div>
				{/if}

				<div class="full">
					{#each apologiesInEpisode as { timestamp, solid_apology, chart_highlight, season, episode }}
						{@const id =
							season === "1" && episode === "1"
								? `s1_e1_slam`
								: `s${season}_e${episode}_example`}
						{@const parsedTime = standardize(timestamp)}
						{@const left = `${xScale(parsedTime)}px`}
						{@const highlight =
							(chart_highlight === "TRUE" &&
								view === "good" &&
								solid_apology === "TRUE") ||
							(chart_highlight === "TRUE" &&
								view === "bad" &&
								solid_apology === "FALSE")}
						{@const background =
							view === "all"
								? "var(--color-dark-purple)"
								: solid_apology === "TRUE"
									? "var(--color-good)"
									: "var(--color-bad)"}
						{@const opacity =
							view === "all" ||
							(solid_apology === "TRUE" && view === "good") ||
							(solid_apology === "FALSE" && view === "bad")
								? 1
								: 0.3}
						<div
							class="apology"
							class:visible={showApologies}
							class:highlight
							class:showing={highlight && showing === id}
							style:left={highlight && showing && showing === id ? 0 : left}
							style:background
							style:opacity
							on:click={() => onClick(id)}
						></div>

						{#if highlight}
							<div class="example" style:left>
								<!-- <Clip
									{slideI}
									id={season === "1" && episode === "1"
										? `s1_e1_slam`
										: `s${season}_e${episode}_example`}
								/> -->
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<figcaption class="sr-only">
		A chart showing 91 episodes of The Real Housewives of Salt Lake City with
		markings where the apology moments occur.{view !== "all"
			? ` Currently highlighting the ${view} apologies.`
			: ""}
	</figcaption>
</figure>

<style>
	figure {
		position: absolute;
		top: 6rem;
		width: 100%;
		display: flex;
		gap: 0.5rem;
		padding-bottom: 1rem;
	}

	.episodes {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.episode {
		display: flex;
		align-items: center;
	}

	.full {
		position: relative;
		height: 5px;
		width: 100%;
		background: var(--color-gray-100);
	}

	.apology {
		position: absolute;
		height: 100%;
		width: 20px;
		opacity: 0;
		transition:
			transform calc(var(--1s) * 0.5),
			width calc(var(--1s) * 0.5),
			opacity calc(var(--1s) * 0.5);
	}

	.apology.visible {
		opacity: 1;
	}

	.apology.highlight {
		height: 11px;
		width: 26px;
		border: 3px solid var(--color-gray-900);
		transform: scale(1.5);
		z-index: 11;
	}

	.apology.highlight:not(.apology.showing):hover {
		cursor: pointer;
		transform: scale(1.75);
	}

	.apology.showing {
		transform: none;
		width: 100%;
		border: none;
	}

	.x-labels {
		font-size: var(--12px);
		font-family: var(--mono);
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.y-label {
		font-size: var(--12px);
		font-family: var(--mono);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		white-space: nowrap;
		position: absolute;
		left: 0;
		transform: translate(-110%, 0);
	}

	.example {
		position: absolute;
		top: 0;
		height: 100px;
		transform: translate(-50%, 0);
		z-index: 10;
	}

	.example:hover {
		cursor: pointer;
	}
</style>
