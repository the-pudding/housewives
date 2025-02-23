<script>
	import Viewport from "$runes/Viewport.svelte.js";

	const viewport = new Viewport();

	let { text, position = viewport.width < 600 ? "bottom-left" : "top-right" } =
		$props();
</script>

<div class={position}>{@html text}</div>

<style>
	div {
		position: absolute;
		background: var(--color-purple-200);
		font-size: var(--36px);
		padding: 0.5rem 1rem;
		max-width: 38rem;
		font-weight: bold;
		z-index: 2;
	}

	.top-left {
		top: 6rem;
		left: 2rem;
	}

	.top-right {
		top: 6rem;
		right: 2rem;
	}

	.bottom-left {
		bottom: 6rem;
		left: 2rem;
	}

	.bottom-right {
		bottom: 4rem;
		right: 2rem;
	}

	@media (max-width: 600px) {
		div {
			font-size: var(--20px);
			max-width: 20rem;
		}
	}
</style>
