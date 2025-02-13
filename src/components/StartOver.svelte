<script>
	import { current } from "$runes/misc.svelte.js";

	const restart = () => {
		current.section = 0;
		current.slide = 0;
		current.subslide = 0;
		current.slideInSection = 0;
	};
</script>

<button onclick={restart}>Start from the beginning</button>

<style>
	button {
		background: var(--color-purple-400);
		border-radius: 0;
		color: var(--color-white);
		font-size: var(--20px);
		text-transform: uppercase;
		font-weight: bold;
	}

	button:hover {
		background: var(--color-purple-300);
	}
</style>
