<script>
	import { mediaPlaying } from "../runes/misc.svelte";

	const { id, visible, left } = $props();

	let videoEl;

	const onClick = () => {
		mediaPlaying.id = id;
	};

	$effect(() => {
		// Pause previews when we're watching an example
		if (mediaPlaying.id) {
			videoEl.pause();
		} else {
			videoEl.play();
		}
	});
</script>

<video
	bind:this={videoEl}
	class="preview"
	class:visible
	style:left
	src={`assets/video/${id}/${id}_preview.mp4`}
	muted
	loop
	autoplay
	onclick={onClick}
></video>

<style>
	.example {
		position: fixed;
		width: 720px;
		height: -webkit-fill-available;
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

	video.preview {
		height: 7rem;
		position: absolute;
		z-index: 10;
		transform: translate(calc(-50% + 6px), 4px);
		transition: opacity calc(var(--1s) * 0.3);
		display: none;
		pointer-events: all;
		object-fit: cover;
		object-position: 0px -6px;
	}

	video.preview:hover {
		cursor: pointer;
	}

	video.preview.visible {
		opacity: 1;
		display: flex;
	}
</style>
