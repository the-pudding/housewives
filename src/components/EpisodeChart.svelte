<script>
	import Clip from "$components/Clip.svelte";
	import data from "$data/apologies.csv";
	import _ from "lodash";
	import { scaleTime } from "d3-scale";
	import { timeParse } from "d3-time-format";

	const { slideI, view } = $props();

	const parseDuration = timeParse("%M:%S:%L");
	const totalEpisodes = _.maxBy(data, "totalEpisode").totalEpisode;
	let width = $state(0);
	let showApologies = $derived(view !== "blank");

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
</script>

<figure id={`slide-${slideI}-chart`} bind:clientWidth={width}>
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

				<div
					class="full"
					class:highlighted={view === "all" && apologiesInEpisode.length > 0}
				>
					{#each apologiesInEpisode as { timestamp, solid_apology, chart_highlight, season, episode }}
						{@const parsedTime = standardize(timestamp)}
						{@const left = `${xScale(parsedTime)}px`}
						{@const highlight =
							view === "color-coded" && chart_highlight === "TRUE"}
						<div
							class="apology"
							class:visible={showApologies}
							class:highlight
							style:left
							style:background={view === "color-coded"
								? `var(--color-${solid_apology === "TRUE" ? "green" : "red"})`
								: `var(--color-purple)`}
						></div>
						{#if highlight}
							<div class="example" style:left>
								<Clip {slideI} id={`s${season}_e${episode}_example`} />
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<figcaption></figcaption>
</figure>

<style>
	figure {
		display: flex;
		position: relative;
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
		background: var(--color-gray-500);
	}

	.full.highlighted {
		background: var(--color-gray-400);
	}

	.apology {
		position: absolute;
		height: 100%;
		width: 20px;
		opacity: 0;
	}

	.apology.visible {
		opacity: 1;
	}

	.apology.highlight {
		outline: 3px solid black;
		transform: scale(1.5);
		z-index: 11;
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
		height: 80px;
		transform: translate(-50%, 0);
		z-index: 10;
	}

	.example:hover {
		z-index: 12;
		transform: translate(-50%, 0) scale(2);
		cursor: pointer;
	}
</style>
