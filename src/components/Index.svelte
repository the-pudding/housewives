<script>
	import Clip from "$components/Clip.svelte";
	import Clips from "$components/Clips.svelte";
	import Images from "$components/Images.svelte";
	import EpisodeChart from "$components/EpisodeChart.svelte";
	import BarChart from "$components/BarChart.svelte";
	import { current } from "$runes/misc.svelte.js";
	import copy from "$data/copy.json";
	import _ from "lodash";

	let w = $state();

	const advance = (i) => {
		const allSlides = copy.sections.reduce(
			(acc, section) => acc.concat(section.slides),
			[]
		);
		let newSlideIndex = current.slide + i;
		newSlideIndex = Math.max(0, Math.min(newSlideIndex, allSlides.length - 1));
		current.slide = newSlideIndex;

		let accumulatedSlides = 0;
		for (
			let sectionIndex = 0;
			sectionIndex < copy.sections.length;
			sectionIndex++
		) {
			const section = copy.sections[sectionIndex];
			const slidesInSection = section.slides.length;

			if (newSlideIndex < accumulatedSlides + slidesInSection) {
				current.section = sectionIndex;
				current.slideInSection = newSlideIndex - accumulatedSlides;
				break;
			}

			accumulatedSlides += slidesInSection;
		}
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 39) advance(1);
		else if (e.keyCode === 37) advance(-1);
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<article bind:clientWidth={w}>
	<div class="chapters">
		{#each copy.sections as { title, slides }, sectionI}
			<div class="section" class:active={current.section === sectionI}>
				<div class="title">{sectionI + 1} — {@html title}</div>
				<div class="bars">
					{#each _.range(slides.length) as barI}
						<div
							class="bar"
							class:active={current.section === sectionI &&
								current.slideInSection === barI}
						/>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="slider">
		<div
			class="slides"
			style:transform={`translate(${current.slide * w * -1}px, 0)`}
		>
			{#each copy.sections as { title, slides }, sectionI}
				{#each slides as { text, big, clip, clips, chart, view, keys, highlight, image, images, visual }, slideI}
					{@const index =
						slideI +
						copy.sections
							.slice(0, sectionI)
							.reduce((acc, { slides }) => acc + slides.length, 0)}

					<div class="slide" id={`slide-${index}`}>
						<div class="content">
							{#if big}
								<h2>{@html text}</h2>
							{:else}
								<p>{@html text}</p>
							{/if}

							{#if clip}
								<Clip id={clip} slideI={index} />
							{:else if clips}
								<Clips {clips} slideI={index} />
							{/if}

							{#if chart === "episodes"}
								<EpisodeChart slideI={index} {view} />
							{:else if chart === "bar"}
								<BarChart slideI={index} {keys} {highlight} />
							{/if}

							{#if images}
								<Images {images} />
							{:else if image}
								<img src={`assets/img/${image}`} alt="" />
							{/if}

							{#if visual}
								<small>{@html visual}</small>
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

	.chapters {
		display: flex;
		gap: 4px;
		margin-bottom: 1rem;
	}

	.section {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.section.active {
		flex: 5;
	}

	.title {
		position: absolute;
		top: 0;
		transform: translate(0, -110%);
		font-size: var(--14px);
		visibility: hidden;
	}

	.section.active .title {
		visibility: visible;
	}

	.bars {
		display: flex;
		gap: 1px;
	}

	.bar {
		flex: 1;
		height: 2px;
		background: var(--color-gray-300);
	}

	.bar.active {
		background: var(--color-gray-800);
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

	:global(span.good) {
		background: var(--color-green);
		padding: 0 4px;
	}

	:global(span.bad) {
		background: var(--color-red);
		padding: 0 4px;
	}
</style>
