<script>
	import { current, modalState } from "$runes/misc.svelte.js";

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
		if (e.keyCode === 39) {
			advance(1);
			e.preventDefault();
		} else if (e.keyCode === 37) {
			advance(-1);
			e.preventDefault();
		} else if (modalState.open && (e.key === "Tab" || e.keyCode === 9)) {
			e.preventDefault();
			const elements = ["button.close", "button.cc"];
			const focusableElements = [
				...document.querySelectorAll(
					elements.map((el) => `#modal ${el}`).join(", ")
				)
			];
			if (document.activeElement === focusableElements[0]) {
				focusableElements[1].focus();
			} else {
				focusableElements[0].focus();
			}
		} else if (e.key === "Tab" || e.keyCode === 9) {
			const elements = ["button", "[href]", "input", "select", "textarea"];
			const focusableElements = [
				...document.querySelectorAll(
					elements.map((el) => `#slide-${current.slide} ${el}`).join(", ")
				),
				...document.querySelectorAll(
					elements.map((el) => `header ${el}`).join(", ")
				),
				...document.querySelectorAll(
					elements.map((el) => `#chapters ${el}`).join(", ")
				)
			].filter((el) => el.tabIndex !== -1);

			const activeElement = document.activeElement;
			const activeIndex = focusableElements.findIndex(
				(d) => d === activeElement
			);
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			e.preventDefault();
			if (activeIndex === -1) {
				focusableElements[0].focus();
			} else if (document.activeElement === firstElement && e.shiftKey) {
				lastElement.focus();
			} else if (document.activeElement === lastElement && !e.shiftKey) {
				firstElement.focus();
			} else {
				focusableElements[
					e.shiftKey ? activeIndex - 1 : activeIndex + 1
				].focus();
			}
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="tap">
	<button
		class="left"
		class:hidden={firstSlide}
		onclick={() => advance(-1)}
		aria-label="Tap left to go to the previous slide"
		tabindex="-1"
	></button>
	<button
		class="right"
		class:full={firstSlide}
		onclick={() => advance(1)}
		aria-label="Tap right to go to the next slide"
		tabindex="-1"
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
