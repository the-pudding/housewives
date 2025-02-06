<script>
	import { current, mediaPlaying, videoSettings } from "$runes/misc.svelte.js";
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import soundOnSvg from "$svg/sound-on.svg";
	import soundOffSvg from "$svg/sound-off.svg";
	import restartSvg from "$svg/restart.svg";
	import ccSvg from "$svg/closed-captioning.svg";

	const {
		id,
		caption,
		autoplay = true,
		inline = false,
		controls = true,
		slideI,
		finish,
		progressColor = "var(--color-purple)"
	} = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let loaded = $state(false);
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
		if (finish) finish(id);
		paused = true;
		mediaPlaying.id = undefined;
	};

	export const restart = () => {
		currentTime = 0;
		mediaPlaying.id = id;
		paused = false;
		videoEl.play();
	};

	const toggleCC = () => {
		videoSettings.ccOn = !videoSettings.ccOn;
	};

	const toggleSound = () => {
		videoSettings.soundOn = !videoSettings.soundOn;
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
	$effect(() => {
		// If within the same slide the media changes
		if (mediaPlaying.id !== id && !paused) {
			paused = true;
			videoEl.pause();
			currentTime = 0;
		}
	});
	$effect(() => {
		// Turn on/off CC
		const tracks = videoEl.textTracks;
		if (tracks && tracks.length > 0) {
			const captionsTrack = tracks[0];
			if (videoSettings.ccOn) {
				captionsTrack.mode = "showing";
			} else {
				captionsTrack.mode = "hidden";
			}
		}
	});
	$effect(() => {
		// Turn on/off sound
		videoEl.muted = !videoSettings.soundOn;
	});
</script>

<figure>
	<video
		class:visible={current.slide === slideI}
		class:inline
		playsinline
		bind:this={videoEl}
		bind:currentTime
		bind:duration
		onended={onEnd}
	>
		<track
			kind="captions"
			src={`assets/video/${id}/${id}.vtt`}
			srclang="en"
			mode="showing"
		/>
	</video>

	<div class="playpause-wrapper">
		{#if !autoplay}
			<button onclick={pausePlay} class="playpause" class:playing={!paused}
				>{@html paused ? playSvg : pauseSvg}</button
			>
		{/if}
	</div>

	{#if controls}
		<div class="controls">
			<button class="mute" onclick={toggleSound}>
				{@html videoSettings.soundOn ? soundOnSvg : soundOffSvg}
			</button>

			<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
				{@html ccSvg}
			</button>

			<button class="restart" onclick={restart}>{@html restartSvg}</button>
		</div>
	{/if}

	{#if season && episode && controls}
		<div class="episode">S{season} E{episode}</div>
	{/if}

	<div
		class="progress"
		style:width={`${percentComplete}%`}
		style:background={progressColor}
	></div>
</figure>

<style>
	.progress {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1rem;
	}

	figure {
		position: relative;
		width: 100%;
		height: 100%;
	}

	video {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	video.visible {
		display: block;
	}

	video.inline {
		position: static;
	}

	.playpause-wrapper {
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

	.controls {
		position: absolute;
		bottom: 2rem;
		left: 1rem;
		z-index: 10;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.controls button {
		background: var(--color-dark-purple);
		border-radius: 50%;
		color: var(--color-white);
		height: 40px;
		width: 40px;
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
	}

	.cc.on {
		outline: 3px solid var(--color-white);
	}

	.controls button:hover {
		background: var(--color-purple);
	}

	.episode {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--color-dark-purple);
		color: white;
		font-size: var(--18px);
		padding: 2px 4px;
		opacity: 0.9;
	}

	:global(.full .episode) {
		top: 3.5rem;
		right: 0.5rem;
	}
</style>
