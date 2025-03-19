<script>
	import CMS from "$components/helpers/CMS.svelte";
	import { modalState, current } from "$runes/misc.svelte.js";

	let { neededComponents, svgs, slideContent, full, intro, slideI, advance } =
		$props();

	const firstSlide = $derived(current.slide === 0);
</script>

<div class="slide" id={`slide-${slideI}`}>
	<div class="content" class:full class:intro class:fade={modalState.open}>
		<CMS components={neededComponents} {svgs} content={slideContent} {slideI} />
	</div>

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
</div>

<style>
	.slide {
		position: relative;
		background: linear-gradient(
			to bottom,
			var(--color-purple-100) 0%,
			var(--color-purple-300) 100%
		);
		width: calc(100% / var(--n));
		flex-shrink: 0;
		pointer-events: auto;
		overflow-y: scroll;
		overflow-x: hidden;
	}

	.content {
		position: relative;
		font-size: var(--22px);
		max-width: 45rem;
		margin: 0 auto;
		padding: 0 1rem;
		margin-top: 6rem;
		margin-bottom: 2rem;
		transition: opacity calc(var(--1s) * 0.3);
		display: flex;
		flex-direction: column;
		height: calc(100% - 8rem);
		pointer-events: none;
		z-index: 2;
	}

	.slide:last-of-type .content {
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 60rem;
		height: 100%;
		margin: 0 auto;
		gap: 3rem;
	}

	.content.full {
		height: 100dvh;
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

	.content.fade {
		opacity: 0.3;
	}

	.tap {
		position: absolute;
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

	button:hover {
		cursor: pointer;
	}

	@media (max-width: 600px) {
		.content {
			font-size: var(--16px);
		}
	}
</style>
