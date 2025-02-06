<script>
	let { text, position = "top-right" } = $props();
</script>

<div class={position}>{@html text}</div>

<style>
	div {
		position: absolute;
		background: var(--color-purple);
		font-size: var(--36px);
		padding: 0.5rem 1rem;
		max-width: 38rem;
		font-family: var(--serif);
		font-weight: bold;
		z-index: 2;
	}

	.top-left {
		top: 6rem;
		left: 2rem;
	}

	.top-right {
		top: 6rem;
		right: 2rem;
	}

	.bottom-left {
		bottom: 4rem;
		left: 2rem;
	}

	.bottom-right {
		bottom: 4rem;
		right: 2rem;
	}
</style>
