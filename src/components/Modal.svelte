<script>
	import Clip from "$components/Clip.svelte";
	import closeSvg from "$svg/close.svg";
	import data from "$data/apologies.csv";
	import { mediaPlaying, current, modalState } from "$runes/misc.svelte.js";

	const { allSlides } = $props();

	const modalSlide = allSlides.filter((d) => d.multi)[0].slide;

	let onModalSlide = $derived(current.slide === modalSlide);
	let chartView = $derived(
		onModalSlide
			? allSlides
					.find((d) => d.slide === current.slide)
					.content[
						current.subslide
					].content.find((d) => d.type === "EpisodeChart").value.view
			: undefined
	);
	let progressColor = $derived(
		chartView === "all"
			? "var(--color-purple-300)"
			: `var(--color-${chartView})`
	);
	let visible = $derived(mediaPlaying.id && onModalSlide);
	let context = $derived.by(() => {
		if (!visible) return;
		const examples = data.filter((d) => d.chart_highlight === "TRUE");
		const season = mediaPlaying.id.split("_")[0]?.replace("s", "");
		const episode = mediaPlaying.id.split("_")[1]?.replace("e", "");
		const example = examples.find(
			(d) => d.season === season && d.episode === episode
		);
		return example.summary;
	});

	const close = () => {
		mediaPlaying.id = undefined;
		// modalState.open = false;
	};

	$effect(() => {
		if (!visible) modalState.open = false;
	});
</script>

<div id="modal" class:visible>
	{#if visible}
		<Clip
			autoplay={visible}
			slideI={modalSlide}
			id={mediaPlaying.id}
			{progressColor}
			{context}
			modal={true}
		/>
	{/if}
	<button class="close" onclick={close}>{@html closeSvg}</button>
</div>

<style>
	#modal {
		background: lightblue;
		width: 90%;
		max-width: 60rem;
		height: 65vh;
		max-height: 500px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
		border: 6px solid black;
	}

	#modal.visible {
		display: block;
	}

	.close {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		background: none;
		padding: 0;
		color: white;
		height: 32px;
		width: 32px;
	}

	.close:hover {
		color: var(--color-purple-200);
	}
</style>
