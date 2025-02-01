<script>
	import { current, mediaPlaying } from "$runes/misc.svelte.js";
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";

	const { id, autoplay = true, caption, slideI } = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let loaded = $state(false);
	let showCC = $state(false);
	let percentComplete = $derived((currentTime / duration) * 100);
	const season = +id.split("_")[0]?.replace("s", "");
	const episode = +id.split("_")[1]?.replace("e", "");

	const pausePlay = () => {
		if (paused) {
			videoEl.play();
			mediaPlaying.id = id;
		} else {
			videoEl.pause();
			mediaPlaying.id = undefined;
		}
		paused = !paused;
	};

	const onEnd = () => {
		currentTime = 0;
		paused = true;
		mediaPlaying.id = undefined;
	};

	const toggleCC = () => {
		const tracks = videoEl.textTracks;
		if (tracks && tracks.length > 0) {
			const captionsTrack = tracks[0];
			if (captionsTrack.mode === "showing") {
				captionsTrack.mode = "hidden";
				showCC = false;
			} else {
				captionsTrack.mode = "showing";
				showCC = true;
			}
		}
	};

	const slideChange = () => {
		// Load video when slide is near
		const comingUp = Math.abs(slideI - current.slide) <= 2;
		if (!loaded && comingUp) {
			videoEl.src = `assets/video/${id}/${id}.mp4`;
			videoEl.load();
			videoEl.addEventListener("loadedmetadata", () => {
				loaded = true;
			});
		}

		// Start video if autoplay
		if (slideI === current.slide && autoplay) {
			paused = false;
			videoEl.play();
			mediaPlaying.id = id;
		}

		// When the slide changes, pause and restart the clip
		if (slideI !== current.slide && !paused) {
			paused = true;
			currentTime = 0;
			videoEl.pause();
			mediaPlaying.id = undefined;
		}
	};

	$effect(() => slideChange(current.slide));
	$effect(() => {
		// If mediaPlaying is set to undefined, pause and restart the clip
		if (mediaPlaying.id === undefined && !paused) {
			paused = true;
			videoEl.pause();
			currentTime = 0;
		}
	});
</script>

<figure>
	{#if caption}
		<figcaption>
			<span>S{season}E{episode}</span>
			{@html caption}
		</figcaption>
	{/if}

	<div class="overlay">
		{#if !autoplay}
			<button onclick={pausePlay} class="playpause" class:playing={!paused}
				>{@html paused ? playSvg : pauseSvg}</button
			>
		{/if}
	</div>

	<button class="cc" class:on={showCC} onclick={toggleCC}>CC</button>

	<video
		class:visible={current.slide === slideI}
		playsinline
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		onended={onEnd}
	>
		<track kind="captions" src={`assets/video/${id}/${id}.vtt`} srclang="en" />
	</video>

	<div class="progress" style:width={`${percentComplete}%`}></div>
</figure>

<style>
	.progress {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1rem;
		background: var(--color-purple);
	}

	figure {
		width: 100%;
		height: 100%;
	}

	figcaption {
		margin-bottom: 0.5rem;
		font-size: var(--12px);
		font-family: var(--mono);
	}

	figcaption span {
		background: var(--color-dark-purple);
		color: var(--color-bg);
		padding: 2px 4px;
	}

	video {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		object-fit: cover;
	}

	video.visible {
		display: block;
	}

	.lazarus {
		display: none;
	}

	.lazarus.visible {
		display: flex;
	}

	.overlay {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.playpause {
		background: none;
		color: var(--color-dark-purple);
		height: 3rem;
		width: 3rem;
		padding: 0;
		display: flex;
		opacity: 0.75;
	}

	.playpause.playing {
		opacity: 0.2;
	}

	.playpause:hover {
		color: var(--color-purple);
		opacity: 1;
	}

	.cc {
		position: absolute;
		left: 1rem;
		bottom: 1.5rem;
		background: var(--color-gray-600);
		border-radius: 50%;
		color: var(--color-white);
		height: 42px;
		width: 42px;
		font-weight: bold;
		z-index: 10;
	}

	.cc.on {
		background: var(--color-dark-purple);
	}

	.cc:hover {
		color: var(--color-purple);
	}
</style>
