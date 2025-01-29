<script>
	import Clip from "$components/Clip.svelte";

	let { clips, slideI } = $props();

	let currentClipIndex = $state(0);
	const currentClip = $derived(clips[currentClipIndex]);

	const advance = (i) => {
		currentClipIndex = (currentClipIndex + i) % clips.length;
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
