<script>
	import Preview from "$components/EpisodeChart.Preview.svelte";
	import data from "$data/apologies.csv";
	import _ from "lodash";
	import { scaleTime } from "d3-scale";
	import { timeParse } from "d3-time-format";
	import { current, mediaPlaying } from "$runes/misc.svelte.js";

	const { slideI, view } = $props();

	let width = $state(0);

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
		mediaPlaying.id = id;
	};

	const slideChange = () => {
		if (current.slide !== slideI) return;
		mediaPlaying.id = undefined;
	};

	$effect(() => slideChange(current.slide, current.subslide));
</script>

<figure bind:clientWidth={width} id="episode-chart">
	<div class="episodes">
		<div class="x-labels">
			<div>0 minutes</div>
			<div>60 m</div>
		</div>
		{#each _.range(totalEpisodes) as i}
			{@const apologiesInEpisode = data.filter(
				(d) => +d.totalEpisode === i + 1
			)}
			{@const season = apologiesInEpisode[0]?.season}
			{@const episode = apologiesInEpisode[0]?.episode}
			{@const id =
				season === "1" && episode === "1"
					? `s1_e1_slam`
					: `s${season}_e${episode}_example`}

			<div class="episode">
				{#if i === 0 || i === totalEpisodes - 1}
					<div class="y-label">ep #{i + 1}</div>
				{/if}

				<div class="long-bar">
					{#each apologiesInEpisode as { timestamp, solid_apology, chart_highlight, season, episode, summary }}
						{@const parsedTime = standardize(timestamp)}
						{@const left = `${xScale(parsedTime)}px`}
						{@const highlight =
							(chart_highlight === "TRUE" &&
								view === "good" &&
								solid_apology === "TRUE") ||
							(chart_highlight === "TRUE" &&
								view === "bad" &&
								solid_apology === "FALSE") ||
							(view === "all" && id === "s1_e1_slam")}
						{@const background =
							view === "all"
								? "var(--color-purple-400)"
								: solid_apology === "TRUE"
									? "var(--color-good)"
									: "var(--color-bad)"}
						{@const opacity =
							view === "all" ||
							view === "wrapping-up" ||
							(solid_apology === "TRUE" && view === "good") ||
							(solid_apology === "FALSE" && view === "bad")
								? 1
								: 0.3}
						<div
							id={chart_highlight === "TRUE" ? id : undefined}
							class="apology"
							class:highlight
							class:pulse={highlight && !mediaPlaying.id}
							style:left
							style:background
							style:opacity
							onclick={() => onClick(id)}
						></div>

						{#if chart_highlight === "TRUE" || (view === "all" && id === "s1_e1_slam")}
							<Preview
								{id}
								visible={highlight && current.slide === slideI}
								{left}
							/>
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
		top: 8.5rem;
		left: 1rem;
		width: calc(100% - 2rem);
		height: calc(100vh - 14.5rem);
		display: flex;
		gap: 0.5rem;
		padding-bottom: 3rem;
	}

	.episodes {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.episode {
		display: flex;
		flex: 1;
		align-items: center;
		transition:
			height calc(var(--1s) * 0.5),
			opacity calc(var(--1s) * 0.5);
	}

	.long-bar {
		position: relative;
		height: 100%;
		width: 100%;
		background: var(--color-gray-50);
	}

	.apology {
		position: absolute;
		height: 100%;
		width: 20px;
		transition:
			transform calc(var(--1s) * 0.4),
			left calc(var(--1s) * 0.4),
			width calc(var(--1s) * 0.4),
			opacity calc(var(--1s) * 0.4);
		visibility: visible;
	}

	.apology.highlight {
		height: 11px;
		width: 26px;
		border: 3px solid var(--color-gray-900);
		transform: scale(1.5);
		z-index: 11;
	}

	.apology.highlight:hover {
		cursor: pointer;
		transform: scale(1.75);
	}

	button.apology {
		padding: 0;
		border-radius: 0;
	}

	.pulse {
		animation: pulse var(--1s) infinite;
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

	/* pulse animation */
	@keyframes pulse {
		0% {
			transform: scale(1.5);
		}
		50% {
			transform: scale(2);
		}
		100% {
			transform: scale(1.5);
		}
	}
</style>
