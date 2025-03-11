<script>
	const { id, alt } = $props();
</script>

<img src={`assets/img/clip_stills/${id}.png`} {alt} />

<style>
	img {
		object-fit: cover;
		width: 100%;
		height: 100vh;
		opacity: 0.9;
	}
</style>
