<script>
	import { current } from "$runes/misc.svelte.js";

	let { allSlides } = $props();

	const firstSlide = $derived(current.slide === 0);
	const lastSlide = $derived(current.slide === allSlides.length - 1);

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

<div class="tap">
	<button class="left" class:hidden={firstSlide} onclick={() => advance(-1)}
	></button>
	<button class="right" class:full={firstSlide} onclick={() => advance(1)}
	></button>
</div>

<style>
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

	button.hidden {
		width: 0;
		padding: 0;
	}

	button.full {
		width: 100%;
	}
</style>
