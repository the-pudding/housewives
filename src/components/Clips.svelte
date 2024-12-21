<script>
	import Clip from "$components/Clip.svelte";

	let { clips, slideI } = $props();
</script>

<div class="grid">
	{#each clips as { id, caption }}
		<Clip {id} {caption} {slideI} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>
