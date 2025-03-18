<script>
	import Loading from "$components/Loading.svelte";
	import { current, mediaPlaying, videoSettings } from "$runes/misc.svelte.js";
	import restartSvg from "$svg/restart.svg";
	import ccSvg from "$svg/closed-captioning.svg";
	import playSvg from "$svg/play.svg";

	const {
		id,
		context,
		slideI,
		finish,
		modal,
		mobilePosition,
		autoplay = true,
		inline,
		small,
		progressColor = "var(--color-purple-300)"
	} = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let done = $state(false);
	let loaded = $state(false);
	let startedLoad = $state(false);
	let currentObjectPosition = $derived.by(() => {
		if (!mobilePosition) return null;
		const i = mobilePosition.findIndex((d) => d.t > currentTime);
		if (i === -1) return mobilePosition[mobilePosition.length - 1].position;
		return mobilePosition[i - 1].position;
	});
	let percentComplete = $derived((currentTime / duration) * 100);
	const season = +id.split("_")[0]?.replace("s", "");
	const episode = +id.split("_")[1]?.replace("e", "");
	let ccButton = !small;
	let playButton = inline || small;
	let restartButton = !modal;
	let seasonEpisodeLabel = !small;

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

<figure class:inline class:small class:modal>
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
		style={`--mobile-object-position: ${currentObjectPosition}`}
	>
		<track
			kind="captions"
			src={`assets/video/${id}/${id}-shifted.vtt`}
			srclang="en"
			mode="showing"
		/>
	</video>

	{#if ccButton}
		<button
			class="cc"
			class:on={videoSettings.ccOn}
			onclick={toggleCC}
			aria-label="Toggle CCs"
		>
			{@html ccSvg}
		</button>
	{/if}

	{#if restartButton}
		<button
			class="restart"
			class:visible={done}
			tabindex={done ? "0" : "-1"}
			onclick={restartPlay}
			aria-label="Restart">{@html restartSvg}</button
		>
	{/if}

	{#if playButton}
		<button
			class="play"
			class:visible={paused && !done && loaded}
			tabindex={paused && !done && loaded ? "0" : "-1"}
			onclick={restartPlay}
			aria-label="Play">{@html playSvg}</button
		>
	{/if}

	<div class="progress-outer">
		<div
			class="progress-inner"
			style:width={`${percentComplete}%`}
			style:background={progressColor}
		></div>

		{#if seasonEpisodeLabel}
			<div class="context">
				{#if season && episode}
					<span class="season-episode">S{season}E{episode}</span>
				{/if}
				{#if context}
					<span class="context-text">{@html context}</span>
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

	.small video {
		object-position: 50% -10px;
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

	figure {
		position: relative;
		width: 100%;
		height: 100%;
	}

	figure.inline {
		border: 6px solid black;
		max-height: 400px;
		margin-top: 1rem;
		overflow: hidden;
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
		object-position: 50% -2rem;
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
		object-position: 50% -2rem;
	}

	.inline img.still {
		object-position: 0px -21px;
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

	.small .restart,
	.small .play {
		top: calc(50% - 0.5rem);
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
	}

	:global(video.inline::cue) {
		font-size: var(--20px);
	}

	:global(.small video::cue) {
		font-size: var(--16px);
	}

	@media (max-width: 600px) {
		figure.inline {
			min-height: 233px;
			margin-top: 0;
		}

		video {
			object-position: var(--mobile-object-position);
		}

		:global(video::cue) {
			font-size: var(--24px);
		}

		.cc {
			bottom: 7rem;
			opacity: 0.7;
		}

		.inline .cc {
			bottom: auto;
			top: 1rem;
		}

		.modal .cc {
			right: 1rem;
			left: auto;
			top: 1rem;
			bottom: auto;
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
