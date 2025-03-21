<script>
	import Toggle from "$components/helpers/migrate/Toggle.svelte";
	import { scaleLinear } from "d3-scale";
	import { max } from "d3-array";
	import dataRaw from "$data/people.csv";
	import _ from "lodash";

	const { slideI, keys, highlight, showNumbers = true } = $props();

	let width = $state(0);
	let toggleValue = $state(
		!keys.includes("num_real_sorrys") ? "percent" : "number"
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
			`num_real_sorrys`,
			"desc"
		)
	);
	const xScale = $derived(
		scaleLinear()
			.domain([
				0,
				max(data, (d) => keys.map((k) => d[k]).reduce((a, b) => a + b))
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
		{ text: "#", value: "number" },
		{ text: "%", value: "percent" }
	];
	const colors = {
		num_good_apologies: "var(--color-good)",
		num_bad_apologies: "var(--color-bad)",
		num_real_sorrys: "var(--color-light-blue)"
	};
</script>

{#if title}<h3>{@html title}</h3>{/if}
<div id={`slide-${slideI}-chart`} class="bar-chart" bind:clientWidth={width}>
	{#each data as d}
		<div
			id={_.kebabCase(d.apologizer)}
			class="row"
			class:fade={highlight && highlight !== _.kebabCase(d.apologizer)}
		>
			<div class="label">
				<div class="name">
					{d.apologizer}
				</div>
				<div class="seasons">
					{d.num_seasons_main} season{d.num_seasons_main > 1 ? "s" : ""}
				</div>
			</div>

			{#each keys as key}
				{@const total = _.sum(keys.map((k) => +d[k]))}
				<div
					class={`bar ${key}`}
					class:split={keys.length > 1}
					style:width={`${xScale(d[key])}px`}
					style:background={colors[key]}
				>
					{#if showNumbers && d[key] !== 0}
						<div
							class="number"
							class:text-outline={keys.length > 1}
							class:percent={toggleValue === "percent"}
							class:light={colors[key] === "var(--color-bad)"}
						>
							{toggleValue === "percent"
								? `${((+d[key] / total) * 100).toFixed(0)}%`
								: d[key].toFixed(0)}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	{#if !keys.includes("num_real_sorrys")}
		<div class="toggle">
			<Toggle label="Show" options={toggleOptions} bind:value={toggleValue}
			></Toggle>
		</div>
	{/if}
</div>

<style>
	.bar-chart {
		margin-left: 190px;
		margin-right: 30px;
		display: flex;
		flex-direction: column;
		gap: 4px;
		flex: 1;
		max-height: 500px;
		min-height: 300px;
	}

	h3 {
		margin: 1rem 0;
	}

	.row {
		position: relative;
		height: 36px;
		display: flex;
		align-items: center;
		flex: 1;
	}

	.row.fade {
		opacity: 0.2;
	}

	.label {
		position: absolute;
		width: 190px;
		left: 0;
		transform: translate(-205px, 0);
		font-family: var(--sans);
		display: flex;
		flex-direction: column;
		align-items: end;
	}

	.label .name {
		text-transform: uppercase;
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
	}

	.label .seasons {
		font-size: var(--12px);
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
		font-size: var(--14px);
		transform: translate(calc(100% + 6px), 0);
	}

	.split .number {
		margin: 0;
		transform: translate(0, 0);
	}

	#jennie-nguyen .num_bad_apologies .number.percent {
		transform: translate(12px, 0);
	}

	#bronwyn-newport .num_bad_apologies .number.percent {
		transform: translate(12px, 0);
	}

	.toggle {
		font-size: var(--14px);
	}

	@media (max-width: 600px) {
		.bar-chart {
			margin-left: 165px;
		}

		.label {
			width: 165px;
			transform: translate(-180px, 0);
		}

		h3 {
			margin: 0.75rem 0;
		}

		.label .name {
			font-size: var(--12px);
			line-height: 1;
		}

		.row {
			height: 25px;
		}

		.number {
			font-size: var(--12px);
		}

		.toggle {
			font-size: var(--12px);
		}

		#angie-katsanevas .num_bad_apologies .number {
			display: none;
		}

		#jennie-nguyen .num_bad_apologies .number {
			display: none;
		}

		#bronwyn-newport .num_bad_apologies .number {
			display: none;
		}
	}

	@media (max-width: 400px) {
		#monica-garcia .num_bad_apologies .number {
			display: none;
		}
	}
</style>
