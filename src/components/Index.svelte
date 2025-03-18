<script>
	import Slide from "$components/Slide.svelte";
	import Tap from "$components/Tap.svelte";
	import Modal from "$components/Modal.svelte";
	import Mute from "$components/Mute.svelte";
	import Title from "$components/Title.svelte";
	import Chapters from "$components/Chapters.svelte";
	import Text from "$components/Text.svelte";
	import ClipPreview from "$components/ClipPreview.svelte";
	import Clip from "$components/Clip.svelte";
	import Clips from "$components/Clips.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import Checklist from "$components/Checklist.svelte";
	import EpisodeChart from "$components/EpisodeChart.svelte";
	import ImageGrid from "$components/ImageGrid.svelte";
	import BarChart from "$components/BarChart.svelte";
	import Footer from "$components/Footer.svelte";
	import StartOver from "$components/StartOver.svelte";
	import vennDiagram from "$svg/venn-diagram.svg";
	import { current } from "$runes/misc.svelte.js";
	import copy from "$data/copy.json";
	import _ from "lodash";

	const components = {
		Title,
		Mute,
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
		StartOver
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
</script>

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

				<Slide
					{neededComponents}
					{svgs}
					{slideContent}
					{full}
					{intro}
					{slideI}
				/>
			{/each}
		</div>

		<Modal {allSlides} />
	</div>
</article>

<Tap {allSlides} />

<style>
	article {
		width: 100%;
		height: 100dvh;
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

	small {
		padding-left: 2rem;
	}

	:global(.content p:first-child) {
		margin-top: 0;
	}

	:global(.content:not(.full) img) {
		border: 6px solid black;
	}

	:global(span.bad) {
		background: var(--color-bad);
		font-weight: bold;
		padding: 0 4px;
	}

	:global(span.good) {
		background: var(--color-good);
		font-weight: bold;
		padding: 0 4px;
	}

	:global(span.complicated) {
		background: var(--color-gray-300);
		font-weight: bold;
		padding: 0 4px;
	}

	:global(.slide a, button, #episode-chart .apology.highlight, details) {
		pointer-events: auto;
	}

	:global(span.dark-purple) {
		background: var(--color-purple-400);
		color: var(--color-white);
		font-weight: bold;
		padding: 0 4px;
		line-height: 1.4;
	}

	:global(span.blue) {
		background: var(--color-blue);
		color: var(--color-white);
		font-weight: bold;
		padding: 0 4px;
		line-height: 1.4;
	}

	:global(p + p) {
		margin-top: 0;
	}

	@media (max-width: 600px) {
		:global(h2) {
			margin-top: 0;
			margin-bottom: 0.5rem;
		}
	}

	/* 
	@media (max-height: 800px) {
		.slide {
			overflow: scroll;
		}
	} */
</style>
