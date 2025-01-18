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
		let upper;
		let lower;
		let maxPHeight;
		if (hasLocked(content)) {
			let i = slideI;
			while (!upper) {
				i++;
				if (!hasLocked(allSlides[i].content)) upper = allSlides[i - 1];
			}
			i = slideI;
			while (!lower) {
				i--;
				if (!hasLocked(allSlides[i].content)) lower = allSlides[i + 1];
			}

			if (lower !== upper) {
				const adjacent = _.range(lower.slide, upper.slide + 1); // [10, 11]
				const ps = adjacent.map((d) =>
					document.querySelectorAll(`#slide-${d} .content p`)
				);
				const h = ps.map((paragraphs) =>
					_.sumBy(paragraphs, (p) => p.offsetHeight)
				);
				const maxH = _.max(h);
				console.log({ maxH });
			}
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
