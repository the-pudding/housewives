<script>
	import Chapters from "$components/Chapters.svelte";
	import Text from "$components/Text.svelte";
	import ClipPreview from "$components/ClipPreview.svelte";
	import Clip from "$components/Clip.svelte";
	import Clips from "$components/Clips.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import IntroFaces from "$components/IntroFaces.svelte";
	import Checklist from "$components/Checklist.svelte";
	import EpisodeChart from "$components/EpisodeChart.svelte";
	import ImageGrid from "$components/ImageGrid.svelte";
	import BarChart from "$components/BarChart.svelte";
	import Footer from "$components/Footer.svelte";
	import StartOver from "$components/StartOver.svelte";
	import CMS from "$components/helpers/CMS.svelte";
	import vennDiagram from "$svg/venn-diagram.svg";
	import { current } from "$runes/misc.svelte.js";
	import copy from "$data/copy.json";
	import _ from "lodash";

	const components = {
		Text,
		Clip,
		Clips,
		ClipPreview,
		Checklist,
		EpisodeChart,
		BarChart,
		TalkingHead,
		ImageGrid,
		Footer,
		StartOver,
		IntroFaces
	};
	const svgs = {
		vennDiagram
	};

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

<article bind:clientWidth={w} style={`--n: ${allSlides.length}`}>
	<Chapters {allSlides} />

	<div class="outer">
		<div
			class="inner"
			style:transform={`translate(${current.slide * w * -1}px, 0)`}
		>
			{#each allSlides as { content, multi, section }, slideI}
				{@const neededComponents = multi
					? Object.fromEntries(
							Object.entries(components).filter(([key]) =>
								content[current.subslide].content.some(
									(item) => item.type === key
								)
							)
						)
					: Object.fromEntries(
							Object.entries(components).filter(([key]) =>
								content.some((item) => item.type === key)
							)
						)}
				{@const slideContent = multi
					? content[current.subslide].content
					: content}
				{@const full =
					Object.keys(neededComponents).includes("ClipPreview") ||
					(Object.keys(neededComponents).includes("Clip") &&
						content.find((d) => d.type === "Clip").value.inline !== "true")}
				{@const intro = section === 0}

				<div class="slide" id={`slide-${slideI}`}>
					<div class="content" class:full class:intro>
						<CMS
							components={neededComponents}
							{svgs}
							content={slideContent}
							{slideI}
						/>
					</div>
				</div>
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
		width: 100%;
		height: 100vh;
		z-index: 2;
		pointer-events: none;
		position: relative;
	}

	.outer {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.inner {
		width: calc(var(--n) * 100%);
		height: 100%;
		display: flex;
	}

	.slide {
		position: relative;
		background: linear-gradient(
			to bottom,
			var(--color-purple-100) 0%,
			var(--color-purple-300) 100%
		);
		width: calc(100% / var(--n));
		flex-shrink: 0;
	}

	.content {
		position: relative;
		font-size: var(--18px);
		max-width: 45rem;
		margin: 0 auto;
		padding: 0 1rem;
		margin-top: 6rem;
		margin-bottom: 2rem;
	}

	.slide:last-of-type .content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content.full {
		height: 100vh;
		width: 100%;
		max-width: none;
		margin: 0;
		padding: 0;
	}

	.content.intro {
		margin: 0;
		padding: 0;
		max-width: none;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}

	#slide-1 .content.intro {
		justify-content: start;
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

	:global(.slide a, button, #episode-chart .apology.highlight, details) {
		pointer-events: auto;
	}

	:global(span.dark-purple) {
		background: var(--color-purple-400);
		color: var(--color-white);
		font-weight: bold;
		padding: 0 2px;
		line-height: 1.4;
	}

	:global(.reddit:first-of-type) {
		transform: rotate(-1deg);
	}

	:global(.reddit:nth-of-type(2)) {
		transform: rotate(3deg);
	}

	:global(.reddit:nth-of-type(3)) {
		transform: rotate(1deg);
	}

	:global(.intro span.tap) {
		background: var(--color-purple-100);
		padding: 1rem;
		text-transform: uppercase;
		font-size: var(--16px);
	}

	:global(.intro span.byline) {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		font-size: var(--14px);
		font-weight: bold;
	}

	:global(.intro span.small) {
		font-size: var(--14px);
	}
</style>
