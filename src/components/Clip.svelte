<script>
	import Loading from "$components/Loading.svelte";
	import { current, mediaPlaying, videoSettings } from "$runes/misc.svelte.js";
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import restartSvg from "$svg/restart.svg";
	import ccSvg from "$svg/closed-captioning.svg";

	const {
		id,
		context,
		autoplay = true,
		inline = false,
		controls = true,
		slideI,
		finish,
		progressColor = "var(--color-purple-200)"
	} = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let done = $state(false);
	let loaded = $state(false);
	let startedLoad = $state(false);
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
		done = true;
		paused = true;
		videoEl.pause();
		mediaPlaying.id = undefined;
	};

	export const restart = () => {
		done = false;
		paused = false;
		currentTime = 0;
		mediaPlaying.id = id;
		videoEl.play();
	};

	const toggleCC = () => {
		videoSettings.ccOn = !videoSettings.ccOn;
	};

	const slideChange = () => {
		// Load video when slide is near
		const comingUp = Math.abs(slideI - current.slide) <= 2;
		if (!loaded && !startedLoad && comingUp) {
			videoEl.src = `assets/video/${id}/${id}.mp4`;
			startedLoad = true;
			videoEl.load();

			videoEl.addEventListener("canplaythrough", () => {
				loaded = true;
			});
		}

		// Start video
		if (slideI === current.slide && autoplay && loaded && paused && !done) {
			paused = false;
			videoEl.play();
			mediaPlaying.id = id;
		}

		// When the slide changes, pause and restart the clip
		if (slideI !== current.slide && (!paused || done)) {
			done = false;
			paused = true;
			currentTime = 0;
			videoEl.pause();
			mediaPlaying.id = undefined;
		}

		// We've moved on, either wihin the slide or to the next one
		if ((mediaPlaying.id === undefined || mediaPlaying.id !== id) && !paused) {
			paused = true;
			videoEl.pause();
			currentTime = 0;
		}
	};

	$effect(() => slideChange(current.slide));

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
	<div class="loading" class:visible={current.slide === slideI && !loaded}>
		<img class="still" src={`assets/img/clip_stills/${id}.png`} />
		<div class="animation">
			<Loading />
		</div>
	</div>

	<video
		class:visible={current.slide === slideI && loaded}
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
			<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
				{@html ccSvg}
			</button>

			<button class="restart" onclick={restart}>{@html restartSvg}</button>
		</div>
	{/if}

	<div class="progress-outer">
		<div
			class="progress-inner"
			style:width={`${percentComplete}%`}
			style:background={progressColor}
		></div>
		<div class="context">
			{#if season && episode}
				<span>S{season}E{episode}</span>
			{/if}
			{#if context}
				{context}
			{/if}
		</div>
	</div>
</figure>

<style>
	.progress-outer {
		position: absolute;
		left: 0;
		bottom: 0;
		height: 2.5rem;
		width: 100%;
		display: flex;
		align-items: center;
		background: var(--color-purple-100);
		padding-left: 1rem;
	}

	.progress-inner {
		position: absolute;
		left: 0;
		height: 100%;
	}

	.context {
		z-index: 10;
	}
	.context span {
		font-weight: bold;
		margin-right: 1rem;
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

	.loading {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.loading.visible {
		display: block;
	}

	img.still {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.animation {
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 100;
		color: white;
		transform: translate(-50%, -50%);
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
		color: var(--color-purple-400);
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
		color: var(--color-purple-200);
		opacity: 1;
	}

	.controls {
		position: absolute;
		bottom: 3rem;
		left: 1rem;
		z-index: 10;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.controls button {
		background: var(--color-purple-400);
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
		background: var(--color-purple-200);
	}

	.episode {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: var(--color-purple-400);
		color: white;
		font-size: var(--18px);
		padding: 2px 4px;
		opacity: 0.9;
	}

	:global(video::cue) {
		color: var(--color-white);
		font-family: var(--sans);
		font-size: var(--32px);
	}

	:global(.full .episode) {
		top: 4rem;
		right: 0.5rem;
	}
</style>
