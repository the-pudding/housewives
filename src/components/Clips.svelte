<script>
	import Clip from "$components/Clip.svelte";

	let { clips, slideI } = $props();

	const captionsShowing = $state(
		clips.map((d) => ({ id: d.id, caption: d.caption, show: false }))
	);

	const finish = (id) => {
		captionsShowing.find((d) => d.id === id).show = true;
	};
</script>

<div class="clips">
	{#each clips as { id, caption }, i}
		<div class="clip">
			<Clip {id} {slideI} autoplay={i === 0} {finish} />
			<div
				class="caption"
				class:visible={captionsShowing.find((d) => d.id === id).show}
			>
				{caption}
			</div>
		</div>
	{/each}
</div>

<style>
	.clips {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 400px;
		gap: 3rem;
	}

	.caption {
		font-size: 1.2rem;
		margin-top: 0.25rem;
		opacity: 0.2;
		transition: opacity calc(var(--1s) * 0.2);
	}

	.caption.visible {
		opacity: 1;
	}
</style>
