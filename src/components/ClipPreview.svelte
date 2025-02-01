<script>
	const { id } = $props();
</script>

<img src={`assets/img/clip_stills/${id}.png`} />

<style>
	img {
		object-fit: cover;
		height: 100vh;
		opacity: 0.9;
	}
</style>
