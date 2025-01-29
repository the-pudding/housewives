<script>
	import { current } from "$runes/misc.svelte.js";
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";

	const { id, caption, slideI } = $props();

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
		} else {
			videoEl.pause();
		}
		paused = !paused;
	};

	const onEnd = () => {
		currentTime = 0;
		paused = true;
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
		const comingUp = Math.abs(slideI - current.slide) <= 2;
		if (!loaded && comingUp) {
			videoEl.src = `assets/video/${id}/${id}.mp4`;
			videoEl.load();
			loaded = true;
		}

		if (slideI !== current.slide && !paused) {
			paused = true;
			currentTime = 0;
			videoEl.pause();
		}
	};

	$effect(() => slideChange(current.slide));
</script>

<figure>
	{#if caption}
		<figcaption>
			<span>S{season}E{episode}</span>
			{@html caption}
		</figcaption>
	{/if}

	<div class="wrapper">
		<div class="overlay">
			<button onclick={pausePlay} class="playpause"
				>{@html paused ? playSvg : pauseSvg}</button
			>
		</div>

		<button class="cc" onclick={toggleCC}>CC</button>

		<video
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
			/>
		</video>
	</div>

	<div class="progress" style:width={`${percentComplete}%`}></div>
</figure>

<style>
	.progress {
		height: 1rem;
		background: var(--color-purple);
	}

	figure {
		height: 100%;
	}

	.wrapper {
		position: relative;
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
		height: 100%;
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
		color: var(--color-fg);
		height: 3rem;
		width: 3rem;
		padding: 0;
		display: flex;
		opacity: 0.4;
	}

	.playpause:hover {
		color: var(--color-purple);
		opacity: 1;
	}

	.cc {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 10;
	}
</style>
