<script>
	let { images } = $props();
</script>

<div class="image-grid">
	{#each images as { src, caption }}
		<div class="image">
			<img {src} alt={caption} />
			<div class="caption">{caption}</div>
		</div>
	{/each}
</div>

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		gap: 1rem;
		padding: 1rem;
	}

	.caption {
		color: var(--color-gray-800);
		font-size: var(--14px);
		margin-top: 0.5rem;
	}

	img {
		margin: 0;
	}
</style>
