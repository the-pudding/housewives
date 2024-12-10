<script>
	import Clip from "$components/Clip.svelte";
	import Chart from "$components/Chart.svelte";
	import { slide } from "$runes/misc.svelte.js";
	import copy from "$data/copy.json";

	let w = $state();

	const totalSlides = copy.sections.reduce(
		(acc, { slides }) => acc + slides.length,
		0
	);

	const advance = (i) => {
		if (slide.value + i >= 0 && slide.value + i < totalSlides) {
			slide.value += i;
		}
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 39) {
			if (slide.value < 42 - 1) slide.value += 1;
		} else if (e.keyCode === 37) {
			if (slide.value > 0) slide.value -= 1;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<article bind:clientWidth={w}>
	<div class="slider">
		<div
			class="slides"
			style:transform={`translate(${slide.value * w * -1}px, 0)`}
		>
			{#each copy.sections as { title, slides }, sectionI}
				{#each slides as { text, clip, chart, visual }, slideI}
					{@const index =
						slideI +
						copy.sections
							.slice(0, sectionI)
							.reduce((acc, { slides }) => acc + slides.length, 0)}

					<div class="slide" id={`slide-${index}`}>
						<div class="content">
							<p>{text}</p>

							{#if clip}
								<Clip id={clip} slideI={index} />
							{:else if chart}
								<Chart id={chart} />
							{/if}

							{#if visual}
								<small>{visual}</small>
							{/if}
						</div>
					</div>
				{/each}
			{/each}
		</div>
	</div>
</article>

<div class="tap">
	<button onclick={() => advance(-1)}></button>
	<button onclick={() => advance(1)}></button>
</div>

<style>
	article {
		position: absolute;
		top: 7rem;
		left: 50%;
		transform: translate(-50%, 0);
		width: 100%;
		max-width: 45rem;
		z-index: 2;
	}

	.slider {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	.slides {
		display: flex;
		flex-direction: row;
		position: relative;
		width: 100%;
		height: 100%;
	}

	.slide {
		position: relative;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		padding: 0 1rem;
	}

	.content {
		max-width: 600px;
		margin: 0 auto;
	}

	small {
		padding-left: 2rem;
	}

	.tap {
		position: fixed;
		top: 0;
		height: 100%;
		width: 100%;
		display: flex;
		z-index: 1;
	}

	.tap button {
		height: 100%;
		width: 50%;
		opacity: 0.2;
	}
</style>
