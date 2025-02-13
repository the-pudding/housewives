<script>
	import Clip from "$components/Clip.svelte";
	import closeSvg from "$svg/close.svg";

	const {
		showing,
		previewVisible,
		left,
		close,
		slideI,
		season,
		episode,
		background
	} = $props();

	let videoEl;

	const id =
		season === "1" && episode === "1"
			? `s1_e1_slam`
			: `s${season}_e${episode}_example`;

	let visible = $derived(showing === id);

	$inspect({ previewVisible, season, episode });

	$effect(() => {
		// Pause previews when we're watching an example
		if (showing) {
			videoEl.pause();
		} else {
			videoEl.play();
		}
	});
</script>

<div class="example" class:visible>
	<Clip autoplay={visible} {slideI} {id} progressColor={background} />
	<button class="close" onclick={close}>{@html closeSvg}</button>
</div>

<video
	bind:this={videoEl}
	style:left
	class="preview"
	class:visible={previewVisible}
	src={`assets/video/${id}/${id}_preview.mp4`}
	muted
	loop
	autoplay
></video>

<style>
	.example {
		position: fixed;
		height: var(--video-example-height);
		width: 720px;
		height: 360px;
		top: 50%;
		transform: translate(0, -50%);
		visibility: hidden;
	}

	.example.visible {
		visibility: visible;
		z-index: 100;
	}

	.example:hover {
		cursor: pointer;
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

	video.preview {
		height: 6rem;
		position: absolute;
		z-index: 10;
		transform: translate(calc(-50% + 6px), 4px);
		transition: opacity calc(var(--1s) * 0.3);
		display: none;
	}

	video.preview.visible {
		opacity: 1;
		display: flex;
	}
</style>
