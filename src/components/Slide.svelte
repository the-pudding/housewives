<script>
	import CMS from "$components/helpers/CMS.svelte";
	import { modalState } from "$runes/misc.svelte.js";

	let { neededComponents, svgs, slideContent, full, intro, slideI } = $props();
</script>

<div class="slide" id={`slide-${slideI}`}>
	<div class="content" class:full class:intro class:fade={modalState.open}>
		<CMS components={neededComponents} {svgs} content={slideContent} {slideI} />
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

	@media (max-width: 600px) {
		.content {
			font-size: var(--16px);
		}
	}
</style>
