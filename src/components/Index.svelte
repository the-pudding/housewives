<script>
	import Chapters from "$components/Chapters.svelte";
	import Title from "$components/Title.svelte";
	import Clip from "$components/Clip.svelte";
	import Clips from "$components/Clips.svelte";
	import Checklist from "$components/Checklist.svelte";
	import EpisodeChart from "$components/EpisodeChart.svelte";
	import BarChart from "$components/BarChart.svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import { current } from "$runes/misc.svelte.js";
	import copy from "$data/copy.json";
	import _ from "lodash";

	const components = { Title, Clip, Clips, Checklist, EpisodeChart, BarChart };

	let w = $state();

	const allSlides = copy.sections
		.reduce((acc, current, i) => {
			let slides = current.slides;
			const section = i;

			slides = slides.map((slide, slideInSection) => ({
				section,
				slideInSection: slideInSection,
				content: slide.content,
				multi: slide.multi === "true"
			}));

			return acc.concat(slides);
		}, [])
		.map((d, i) => ({ slide: i, ...d }));

	const advance = (i) => {
		const currentSlideIndex = allSlides.findIndex(
			(d) =>
				d.section === current.section &&
				d.slideInSection === current.slideInSection &&
				d.slide === current.slide
		);
		const isMulti = allSlides[currentSlideIndex].multi;
		const numSubslides = isMulti
			? allSlides[currentSlideIndex].content.length
			: 1;
		if (
			isMulti &&
			current.subslide + i < numSubslides &&
			current.subslide + i >= 0
		) {
			current.subslide += i;
		} else if (
			currentSlideIndex + i >= 0 &&
			currentSlideIndex + i < allSlides.length
		) {
			const next = allSlides[currentSlideIndex + i];
			current.section = next.section;
			current.slideInSection = next.slideInSection;
			current.slide = next.slide;
		}
	};

	const onKeyDown = (e) => {
		if (e.keyCode === 39) advance(1);
		else if (e.keyCode === 37) advance(-1);
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<article bind:clientWidth={w}>
	<Chapters {allSlides} />

	<div class="slider">
		<div
			class="slides"
			style:transform={`translate(${current.slide * w * -1}px, 0)`}
		>
			{#each allSlides as { content, section: sectionI, multi }, slideI}
				{@const index =
					slideI +
					copy.sections
						.slice(0, sectionI)
						.reduce((acc, { slides }) => acc + slides.length, 0)}
				{@const neededComponents = Object.fromEntries(
					Object.entries(components).filter(([key]) =>
						content.some((item) => item.type === key)
					)
				)}
				{#if multi}
					<div class="slide" id={`slide-${slideI}`}>
						<div class="content">
							<CMS
								components={Object.fromEntries(
									Object.entries(components).filter(([key]) =>
										content[current.subslide].content.some(
											(item) => item.type === key
										)
									)
								)}
								content={content[current.subslide].content}
								{slideI}
							/>
						</div>
					</div>
				{:else}
					<div class="slide" id={`slide-${slideI}`}>
						<div class="content">
							<CMS components={neededComponents} {content} {slideI} />
						</div>
					</div>
				{/if}
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
		top: 3rem;
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
		position: relative;
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
		opacity: 0;
	}

	:global(span.bad) {
		background: var(--color-bad);
		color: white;
		padding: 0 4px;
	}

	:global(span.good) {
		background: var(--color-good);
		padding: 0 4px;
	}
</style>
