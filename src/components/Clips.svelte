<script>
	import Clip from "$components/Clip.svelte";
	import { mediaPlaying } from "$runes/misc.svelte.js";

	let { clips, slideI } = $props();

	let currentClipIndex = $state(0);
	const currentClip = $derived(clips[currentClipIndex]);

	const advance = (i) => {
		currentClipIndex =
			currentClipIndex + 1 < 0
				? clips.length - 1
				: (currentClipIndex + 1) % clips.length;
		mediaPlaying.id = undefined;
	};
</script>

<div class="clips">
	<button onclick={() => advance(-1)}>prev</button>
	{#each clips as { id }}
		<div class="clip" class:visible={currentClip.id === id}>
			<Clip {id} {slideI} />
		</div>
	{/each}
	<button onclick={() => advance(1)}>next</button>
</div>

<style>
	.clips {
		display: flex;
		gap: 2px;
		align-items: center;
	}

	.clip {
		display: none;
	}

	.clip.visible {
		display: flex;
	}
</style>
