<script>
	import copy from "$data/copy.json";
	import _ from "lodash";
	import { onMount } from "svelte";

	let { components = {}, content = [], slideI } = $props();

	const allSlides = copy.sections
		.reduce((acc, current, i) => {
			let slides = current.slides;
			const section = i;

			slides = slides.map((slide, slideInSection) => ({
				section,
				slideInSection: slideInSection,
				content: slide.content
			}));

			return acc.concat(slides);
		}, [])
		.map((d, i) => ({ slide: i, ...d }));
	const lockedContent = ["EpisodeChart"];
	const hasLocked = (slideContent) =>
		!!slideContent.find((d) => lockedContent.includes(d.type));

	onMount(() => {
		if (hasLocked(content)) {
			const slides = allSlides.filter((d) => hasLocked(d.content));

			const figures = slides.map((d) =>
				document.querySelector(`#slide-${d.slide} figure`)
			);
			const offsetTops = figures.map((d) => d.offsetTop);
			const maxOffsetTop = Math.max(...offsetTops);
			const toAdjust = figures.filter((d) => d.offsetTop < maxOffsetTop);
			toAdjust.forEach((figure) => {
				figure.style.transform = `translate(0, ${maxOffsetTop - figure.offsetTop}px)`;
			});
		}
	});
</script>

{#each content as { type, value }}
	{@const C = components[type]}
	{@const isString = typeof value === "string"}
	{#if C}
		<C {...value} {slideI} />
	{:else if type === "text"}
		<p>{@html value}</p>
	{:else if isString}
		<svelte:element this={type}>
			{@html value}
		</svelte:element>
	{:else}
		<svelte:element this={type} {...value}></svelte:element>
	{/if}
{/each}
