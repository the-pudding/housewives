<script>
	import data from "$data/data.csv";
	import _ from "lodash";
	import { scaleLinear, scaleTime } from "d3-scale";
	import { timeParse } from "d3-time-format";

	const { id } = $props();

	const parseDuration = timeParse("%H:%M:%S");
	const totalEpisodes = _.maxBy(data, "totalEpisode").totalEpisode;
	let width = $state(0);

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

	const xScale = $derived(
		scaleTime()
			.domain([standardize("00:00:00"), standardize("01:00:00:00")])
			.range([0, width])
	);
</script>

<div {id} class="chart" bind:clientWidth={width}>
	{#each _.range(totalEpisodes) as i}
		{@const apologiesInEpisode = data.filter((d) => +d.totalEpisode === i + 1)}
		<div class="episode">
			{#each apologiesInEpisode as { timestamp }}
				{@const parsedTime = standardize(timestamp)}
				{@const left = `${xScale(parsedTime)}px`}
				<div class="apology" style:left></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.chart {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.episode {
		position: relative;
		height: 8px;
		width: 100%;
		background: var(--color-gray-300);
	}

	.apology {
		position: absolute;
		background: var(--color-green);
		height: 8px;
		width: 20px;
	}
</style>
