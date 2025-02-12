<script>
	import Toggle from "$components/helpers/migrate/Toggle.svelte";
	import { scaleLinear } from "d3-scale";
	import { max } from "d3-array";
	import dataRaw from "$data/people.csv";
	import _ from "lodash";

	const { slideI, keys, highlight, showNumbers = true, percent } = $props();

	let width = $state(0);
	let normalize = $state("off");

	const keysCurrent = $derived(
		normalize === "on" ? keys.map((k) => `${k}_normalized`) : keys
	);
	const data = $derived(
		_.orderBy(
			dataRaw.map((d) => {
				const result = { apologizer: d.apologizer };
				Object.keys(d).forEach((key) => {
					if (key !== "apologizer") {
						result[key] = +d[key];
					}
				});
				return result;
			}),
			`num_real_sorrys${normalize === "on" ? "_normalized" : ""}`,
			"desc"
		)
	);
	const xScale = $derived(
		scaleLinear()
			.domain([
				0,
				max(data, (d) => keysCurrent.map((k) => d[k]).reduce((a, b) => a + b))
			])
			.range([0, width])
	);

	const title = $derived.by(() => {
		return keys.includes("num_real_sorrys")
			? 'Total "sorry"s by cast member'
			: keys.includes("num_good_apologies")
				? "<span class=good>Good</span> vs. <span class=bad>bad</span> apologies by cast member"
				: null;
	});

	const toggleOptions = [
		{ text: "On", value: "on" },
		{ text: "Off", value: "off" }
	];
	const colors = {
		num_good_apologies: "var(--color-good)",
		num_good_apologies_normalized: "var(--color-good)",
		num_bad_apologies: "var(--color-bad)",
		num_bad_apologies_normalized: "var(--color-bad)",
		num_apologies: "var(--color-purple-300)",
		num_sorrys: "var(--color-purple-300)",
		num_real_sorrys: "var(--color-purple-300)",
		num_real_sorrys_normalized: "var(--color-purple-300)"
	};
</script>

<div id={`slide-${slideI}-chart`} class="bar-chart" bind:clientWidth={width}>
	{#if title}<h3>{@html title}</h3>{/if}

	{#each data as d}
		<div
			class="row"
			class:fade={highlight && highlight !== _.kebabCase(d.apologizer)}
		>
			<div class="label">{d.apologizer}</div>

			{#each keysCurrent as key}
				{@const total = _.sum(keysCurrent.map((k) => +d[k]))}
				<div
					class="bar"
					class:split={keysCurrent.length > 1}
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
								: d[key].toFixed(0)}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	<div class="toggle">
		<Toggle
			label="Normalize by # of seasons on the show"
			options={toggleOptions}
			bind:value={normalize}
		></Toggle>
	</div>
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

	.toggle {
		font-size: var(--14px);
	}
</style>
