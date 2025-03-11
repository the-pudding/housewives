<script>
	import { videoSettings } from "$runes/misc.svelte.js";
	import soundOnSvg from "$svg/sound-on.svg";
	import soundOffSvg from "$svg/sound-off.svg";

	const { positionStatic = false } = $props();
</script>

<button
	class="mute"
	class:static={positionStatic}
	onclick={() => (videoSettings.soundOn = !videoSettings.soundOn)}
	aria-label="Toggle sound"
>
	{@html videoSettings.soundOn ? soundOnSvg : soundOffSvg}
</button>

<style>
	button {
		position: fixed;
		max-width: 2.5rem;
		top: 1rem;
		right: 1rem;
		background: var(--color-purple-400);
		border-radius: 50%;
		color: var(--color-white);
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
		z-index: 100;
	}

	button.static {
		position: static;
	}

	button:hover {
		background: var(--color-purple-200);
	}
</style>
