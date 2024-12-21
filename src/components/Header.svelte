<script>
	// shadow, plain, line, bubble
	import wordmark from "$svg/wordmark-sticker.svg";
	import logo from "$svg/logo-white.svg";
	import { current } from "$runes/misc.svelte.js";
</script>

<header class:small={current.slide > 0}>
	<div class="wordmark" class:visible={current.slide === 0}>
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>

	<div class="wordmark" class:visible={current.slide > 0}>
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html logo}</a
		>
	</div>
</header>

<style>
	header {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: 1000;
	}

	header.small {
		max-width: 3rem;
		top: auto;
		bottom: 1rem;
		right: 1rem;
	}

	.wordmark {
		display: none;
		max-width: 10em;
		margin: 0 auto;
		padding: 32px 0;
		transform: rotate(-4deg);
	}

	.wordmark:hover {
		cursor: pointer;
		transform: rotate(-2deg);
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	.small .wordmark {
		padding: 0;
		transition: transform 0.1s;
	}

	.small .wordmark:hover {
		transform: scale(1.1);
	}

	.visible {
		display: flex;
	}
</style>
