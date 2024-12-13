<script>
	import Clip from "$components/Clip.svelte";

	let { ids, slideI } = $props();
</script>

<div class="grid">
	{#each ids as id}
		<Clip {id} {slideI} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 1rem;
	}
</style>
