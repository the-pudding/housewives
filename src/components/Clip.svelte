<script>
	import { onMount } from "svelte";
	import { current } from "$runes/misc.svelte.js";

	const { id, slideI } = $props();

	let videoEl;
	let currentTime = $state(0);
	let duration = $state(0);
	let paused = $state(true);
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
		<div class="overlay">
			<button onclick={pausePlay}>{paused ? "play" : "pause"}</button>
			<!-- <button onclick={restart}>restart</button> -->
		</div>

		<video
			playsinline
			bind:this={videoEl}
			bind:currentTime
			bind:duration
			onended={onEnd}
			src={`assets/video/${id}.mp4`}
		/>

		<div class="progress" style:width={`${percentComplete}%`} />
		<!-- <figcaption>S{season} Ep{episode}</figcaption> -->
	</div>
</figure>

<style>
	.progress {
		height: 1rem;
		background: var(--color-gray-500);
	}

	figure {
		height: 100%;
	}

	.wrapper {
		position: relative;
		height: 100%;
	}

	.overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 10;
	}

	video {
		height: 100%;
	}

	figcaption {
		margin-top: 0.5rem;
		font-size: var(--12px);
		font-family: var(--mono);
	}

	button {
		font-size: var(--12px);
	}
</style>
