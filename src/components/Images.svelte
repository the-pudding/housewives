<script>
	let { images } = $props();
</script>

<div class="images">
	{#each images as { id, url }}
		<a href={url} target="_blank">
			<img
				src={`assets/img/${id}.png`}
				alt={`screenshot of news article from ${id} about the steps of a good apology`}
			/>
		</a>
	{/each}
</div>

<style>
	.images {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 1rem;
	}

	img {
		width: 100%;
	}

	a {
		transition: transform 0.3s;
	}

	a:nth-of-type(1) {
		transform: rotate(-1deg);
	}
	a:nth-of-type(2) {
		transform: rotate(3deg);
	}
	a:nth-of-type(3) {
		transform: rotate(-3deg);
		grid-column: 1 / span 2;
		padding: 0 4rem;
	}

	a:hover {
		transform: scale(1.03);
		opacity: 0.8;
	}
</style>
