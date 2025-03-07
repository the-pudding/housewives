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
		if (
			(!loaded && !startedLoad && comingUp) ||
			(id === "s1_e1_opening" && !loaded && !startedLoad)
		) {
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

<figure class:inline class:small={!controls}>
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
		onclick={inline ? restartPlay : null}
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

	<div class="progress-outer">
		<div
			class="progress-inner"
			style:width={`${percentComplete}%`}
			style:background={progressColor}
		></div>
		{#if controls}
			<div class="context">
				{#if season && episode}
					<span class="season-episode">S{season}E{episode}</span>
				{/if}
				{#if context}
					<span class="context-text">{@html context}</span>
					<!-- <details>
						<summary>Click for more context</summary>
						{context}
					</details> -->
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
	}

	.small .progress-outer {
		height: 1rem;
	}

	.progress-inner {
		position: absolute;
		left: 0;
		height: 100%;
	}

	.season-episode {
		font-weight: bold;
		margin-left: 1rem;
		z-index: 10;
		font-size: var(--16px);
	}

	.context {
		z-index: 10;
		display: flex;
		align-items: center;
	}

	.context-text {
		font-size: var(--14px);
		margin-left: 1rem;
	}

	.context details:hover {
		cursor: pointer;
	}

	figure {
		position: relative;
		width: 100%;
		height: 100%;
	}

	figure.inline {
		border: 6px solid black;
		max-height: 400px;
	}

	.inline video {
		pointer-events: all;
	}

	.inline video:hover {
		cursor: pointer;
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

	.small video {
		object-position: 0px -10px;
	}

	video.visible {
		display: block;
	}

	video.inline {
		position: static;
		object-position: 0px -21px;
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

	.cc,
	.restart,
	.play {
		background: var(--color-purple-400);
		border-radius: 50%;
		color: var(--color-white);
		height: 55px;
		width: 55px;
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
	}

	.cc {
		position: absolute;
		bottom: 3rem;
		left: 1rem;
		z-index: 10;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		height: 40px;
		width: 40px;
	}

	.cc.on {
		outline: 3px solid var(--color-white);
	}

	.restart,
	.play {
		position: absolute;
		top: calc(50% - 1.25rem);
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

	:global(video::cue) {
		color: var(--color-white);
		font-family: var(--sans);
		font-size: var(--32px);
		transform: translate(0, -40px);
	}

	@media (max-width: 600px) {
		figure.inline {
			min-height: 233px;
		}

		.context details {
			margin: 0.75rem;
		}
	}

	@media (max-width: 400px) {
		.season-episode {
			margin-left: 0.5rem;
			font-size: var(--12px);
		}

		.context-text {
			font-size: var(--12px);
			margin-left: 0.5rem;
		}
	}
</style>
