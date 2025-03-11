<script>
	const { id, alt, mobilePosition } = $props();
</script>

<img
	src={`assets/img/clip_stills/${id}.png`}
	{alt}
	style={`--mobile-object-position: ${mobilePosition}`}
/>

<style>
	img {
		object-fit: cover;
		width: 100%;
		height: 100dvh;
		opacity: 0.9;
	}

	@media (max-width: 600px) {
		img {
			object-position: var(--mobile-object-position);
		}
	}
</style>
