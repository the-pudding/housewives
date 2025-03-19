<script>
	let { text, position = "top-right" } = $props();
</script>

<div class={position}>{@html text}</div>

<style>
	div {
		position: absolute;
		background: var(--color-purple-200);
		font-size: var(--36px);
		padding: 0.5rem 1rem;
		max-width: 38rem;
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
		bottom: 6rem;
		left: 2rem;
	}

	.bottom-left-shifted {
		bottom: 12rem;
		left: 2rem;
	}

	.bottom-right {
		bottom: 4rem;
		right: 2rem;
	}

	@media (max-width: 600px) {
		div {
			font-size: var(--20px);
			top: 6rem !important;
			bottom: auto !important;
			right: auto !important;
			left: 50% !important;
			transform: translate(-50%, 0);
			width: 100%;
			max-width: 20rem;
		}
	}
</style>
