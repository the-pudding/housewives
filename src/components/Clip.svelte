<script>
	import { onMount } from "svelte";
	import { current } from "$runes/misc.svelte.js";
	import playSvg from "$svg/play.svg";
	import pauseSvg from "$svg/pause.svg";
	import Clip from "$components/Clip.svelte";

	const {
		id,
		caption,
		apologyText,
		forcePause,
		overlayId,
		enablePause = true,
		slideI
	} = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
	let showOverlayVideo = $state(false);
	let loaded = false;
	let percentComplete = $derived((currentTime / duration) * 100);
	const season = +id.split("_")[0].replace("s", "");
	const episode = +id.split("_")[1].replace("e", "");

	const pausePlay = () => {
		if (paused) {
			videoEl.play();
		} else {
			videoEl.pause();
		}
		paused = !paused;
	};

	const restart = () => {
		currentTime = 0;
		if (paused) {
			paused = false;
			videoEl.play();
		}
	};

	const onEnd = () => {
		currentTime = 0;
		paused = true;
	};

	const slideChange = () => {
		if (slideI !== current.slide) {
			paused = true;
			currentTime = 0;
			videoEl.pause();
		}
	};

	$effect(() => slideChange(current.slide));
	$effect(() => {
		if (forcePause && currentTime > forcePause && !paused) {
			pausePlay();
			showOverlayVideo = true;
		}
	});

	onMount(() => {
		const src = `assets/video/${id}.mp4`;
		const request = new XMLHttpRequest();
		request.open("GET", src, true);

		request.responseType = "blob";
		request.onload = function () {
			if (this.status === 200) {
				const videoBlob = this.response;
				const videoUrl = URL.createObjectURL(videoBlob);
				videoEl.src = videoUrl;

				// if (hasCC) {
				// 	videoEl.addEventListener("canplay", () => {
				// 		turnCCOn();
				// 	});
				// 	videoEl.textTracks[0].mode = "showing";
				// }
				loaded = true;
			}
		};
		request.send();
	});
</script>

<figure>
	<div class="wrapper">
		{#if enablePause}
			<div class="overlay">
				<button onclick={pausePlay} class="playpause"
					>{@html paused ? playSvg : pauseSvg}</button
				>
			</div>
		{/if}

		{#if caption}
			<figcaption>
				<span>S{season}E{episode}</span>
				{@html caption}
			</figcaption>
		{/if}

		<video
			playsinline
			bind:this={videoEl}
			bind:currentTime
			bind:duration
			onended={onEnd}
			src={`assets/video/${id}.mp4`}
		/>

		{#if forcePause && overlayId}
			<div class="lazarus" class:visible={showOverlayVideo}>
				<Clip id={overlayId} enablePause={false} />
			</div>
		{/if}

		{#if apologyText}
			<div class="apology">"{@html apologyText}"</div>
		{/if}
	</div>

	<div class="progress" style:width={`${percentComplete}%`} />
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

	.apology {
		font-size: var(--36px);
		margin-top: 1rem;
		width: 100%;
		text-align: center;
	}

	:global(.apology strong) {
		color: var(--color-purple);
	}
</style>
