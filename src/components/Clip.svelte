<script>
	import Loading from "$components/Loading.svelte";
	import { current, mediaPlaying, videoSettings } from "$runes/misc.svelte.js";
	import restartSvg from "$svg/restart.svg";
	import ccSvg from "$svg/closed-captioning.svg";
	import playSvg from "$svg/play.svg";

	const {
		id,
		context,
		autoplay = true,
		inline = false,
		controls = true,
		slideI,
		finish,
		progressColor = "var(--color-purple-300)"
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

	export const restartPlay = () => {
		mediaPlaying.id = id;
		done = false;
		paused = false;
		currentTime = 0;
		videoEl.play();
	};

	const onEnd = () => {
		if (finish) finish(id);
		done = true;
		paused = true;
		videoEl.pause();
		mediaPlaying.id = undefined;
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
		if (
			slideI === current.slide &&
			autoplay &&
			!inline &&
			loaded &&
			paused &&
			!done
		) {
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
			// BUG HERE that is pausing Mary's first video when we return to it from another slide
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

<figure class:inline>
	<figcaption class="sr-only">{context}</figcaption>

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

	{#if controls}
		<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
			{@html ccSvg}
		</button>

		<button class="restart" class:visible={done} onclick={restartPlay}
			>{@html restartSvg}</button
		>

		<button
			class="play"
			class:visible={inline && paused && !done && loaded}
			onclick={restartPlay}>{@html playSvg}</button
		>
	{/if}

	<div class="progress-outer" class:small={!controls}>
		<div
			class="progress-inner"
			style:width={`${percentComplete}%`}
			style:background={progressColor}
		></div>
		{#if controls}
			<div class="context">
				{#if season && episode}
					<span>S{season}E{episode}</span>
				{/if}
				{#if context}
					<span>{context}</span>
				{/if}
			</div>
		{/if}
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

	.progress-outer.small {
		height: 1rem;
	}

	.progress-inner {
		position: absolute;
		left: 0;
		height: 100%;
	}

	.context {
		z-index: 10;
		display: flex;
		align-items: center;
	}

	.context span:first-child {
		font-weight: bold;
		margin-right: 1rem;
	}

	.context span:last-child {
		font-size: var(--14px);
	}

	figure {
		position: relative;
		width: 100%;
		height: 100%;
	}

	figure.inline {
		min-height: 400px;
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
		color: var(--color-purple-100);
		transform: translate(-50%, -50%);
	}

	.cc {
		position: absolute;
		bottom: 3rem;
		left: 1rem;
		z-index: 10;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.cc,
	.restart,
	.play {
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

	.restart,
	.play {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		visibility: hidden;
	}

	.restart.visible,
	.play.visible {
		visibility: visible;
	}

	.cc:hover,
	.restart:hover,
	.play:hover {
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
