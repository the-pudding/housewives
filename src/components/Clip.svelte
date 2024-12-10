<script>
	import { onMount } from "svelte";
	import { slide } from "$runes/misc.svelte.js";

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

	const slideChange = () => {
		if (slideI !== slide.value && !paused) {
			paused = true;
			currentTime = 0;
			videoEl.pause();
		}
	};

	$effect(() => slideChange(slide.value));

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
		<button onclick={pausePlay}>{paused ? "play" : "pause"}</button>
		<button onclick={restart}>restart</button>

		<video
			playsinline
			bind:this={videoEl}
			bind:currentTime
			bind:duration
			src={`assets/video/${id}.mp4`}
		/>
		<figcaption>season {season} episode {episode}</figcaption>

		<div class="progress" style:width={`${percentComplete}%`} />
	</div>
</figure>

<style>
	.progress {
		height: 1rem;
		background: var(--color-green);
	}

	video {
		margin-top: 0.5rem;
	}

	figcaption {
		margin-top: 0.5rem;
	}

	button {
		font-size: var(--12px);
	}
</style>
