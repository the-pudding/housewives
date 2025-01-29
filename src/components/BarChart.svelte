<script>
	import { scaleLinear } from "d3-scale";
	import { max } from "d3-array";
	import dataRaw from "$data/people.csv";
	import _ from "lodash";

	const { slideI, keys, highlight, showNumbers = true, percent } = $props();

	let width = $state(0);

	const data = _.orderBy(
		dataRaw.map((d) => ({
			apologizer: d.apologizer,
			num_good_apologies: +d.num_good_apologies,
			num_bad_apologies: +d.num_bad_apologies,
			num_apologies: +d.num_apologies,
			num_sorrys: +d.num_sorrys,
			num_real_sorrys: +d.num_real_sorrys
		})),
		keys.length > 1 ? keys[1] : keys[0],
		"desc"
	);
	const title = keys.includes("num_real_sorrys")
		? "Total 'sorry's by character"
		: keys.includes("num_good_apologies")
			? "Good vs. bad apologies by character"
			: null;

	const xScale = $derived(
		scaleLinear()
			.domain([
				0,
				max(data, (d) => keys.map((k) => d[k]).reduce((a, b) => a + b))
			])
			.range([0, width])
	);
	const colors = {
		num_good_apologies: "var(--color-good)",
		num_bad_apologies: "var(--color-bad)",
		num_apologies: "var(--color-purple)",
		num_sorrys: "var(--color-purple)",
		num_real_sorrys: "var(--color-purple)"
	};
</script>

<div id={`slide-${slideI}-chart`} class="bar-chart" bind:clientWidth={width}>
	{#if title}<h3>{title}</h3>{/if}

	{#each data as d}
		<div
			class="row"
			class:fade={highlight && highlight !== _.kebabCase(d.apologizer)}
		>
			<div class="label">{d.apologizer}</div>

			{#each keys as key}
				{@const total = _.sum(keys.map((k) => +d[k]))}
				<div
					class="bar"
					class:split={keys.length > 1}
					style:width={`${xScale(d[key])}px`}
					style:background={colors[key]}
				>
					{#if showNumbers && d[key] !== 0}
						<div
							class="number"
							class:light={colors[key] === "var(--color-bad)"}
						>
							{percent === "true"
								? `${((+d[key] / total) * 100).toFixed(0)}%`
								: d[key]}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.bar-chart {
		margin-left: 150px;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	h3 {
		margin: 0;
		margin-bottom: 0.5rem;
		font-size: var(--20px);
		font-family: var(--sans);
	}

	.row {
		position: relative;
		height: 25px;
		display: flex;
		align-items: center;
	}

	.row.fade {
		opacity: 0.2;
	}

	.label {
		position: absolute;
		left: 0;
		transform: translate(-110%, 0);
		font-family: var(--sans);
		font-size: var(--14px);
	}

	.bar {
		position: relative;
		height: 100%;
		background: lightgrey;
		display: flex;
		justify-content: end;
		align-items: center;
	}

	.bar.split {
		justify-content: center;
	}

	.number {
		z-index: 10;
		margin-left: 4px;
		font-family: var(--mono);
		font-size: var(--12px);
		transform: translate(calc(100% + 6px), 0);
	}

	.number.light {
		color: white;
	}

	.split .number {
		margin: 0;
		transform: translate(0, 0);
	}
</style>
