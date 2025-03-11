<script>
	import restartSvg from "$svg/restart.svg";
	import { current } from "$runes/misc.svelte.js";

	const restart = () => {
		current.section = 0;
		current.slide = 0;
		current.subslide = 0;
		current.slideInSection = 0;
	};
</script>

<button onclick={restart}>Start over<span>{@html restartSvg}</span></button>

<style>
	button {
		background: var(--color-purple-400);
		color: white;
		width: 205px;
		padding: 0.75rem;
		text-transform: uppercase;
		font-size: var(--20px);
		margin-top: 6rem;
		display: flex;
		align-items: center;
	}

	button:hover {
		background: var(--color-purple-300);
	}

	span {
		display: flex;
		height: 2.2rem;
		margin-left: 0.8rem;
	}
</style>
