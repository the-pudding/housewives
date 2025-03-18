<script>
	import _ from "lodash";
	import angieSvg from "$svg/faces/angie.svg";
	import bronwynSvg from "$svg/faces/bronwyn.svg";
	import heatherSvg from "$svg/faces/heather.svg";
	import jenSvg from "$svg/faces/jen.svg";
	import jenSvg2 from "$svg/faces/jen2.svg";
	import lisaSvg from "$svg/faces/lisa.svg";
	import lisaSvg2 from "$svg/faces/lisa2.svg";
	import marySvg from "$svg/faces/mary.svg";
	import meredithSvg from "$svg/faces/meredith.svg";
	import whitneySvg from "$svg/faces/whitney.svg";
	import soundSvg from "$svg/sound-on.svg";
	import { mediaPlaying, videoSettings } from "$runes/misc.svelte.js";
	import { current } from "../runes/misc.svelte";

	let {
		name,
		audio,
		quote,
		title = false,
		queen,
		bounce,
		clickedOne = $bindable(),
		slide
	} = $props();

	const svgs = {
		angie: angieSvg,
		bronwyn: bronwynSvg,
		heather: heatherSvg,
		jen: jenSvg,
		jen2: jenSvg2,
		lisa: lisaSvg,
		lisa2: lisaSvg2,
		mary: marySvg,
		meredith: meredithSvg,
		whitney: whitneySvg
	};

	let wrapperEl;
	let audioEls = [];
	let svg = svgs[name];
	let numTaglines = Array.isArray(quote) ? quote.length : 1;
	let taglineI = $state(0);
	let paused = true;

	const onClick = () => {
		if (!clickedOne) clickedOne = true;
		if (queen) return;
		if (mediaPlaying.id === name) {
			mediaPlaying.id = undefined;
			resetFace();
			return;
		}

		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-light-blue)";
		wrapperEl.style.transform = `rotate(${Math.random() * 5}deg) scale(1.5)`;

		const allAudioEls = document.querySelectorAll("audio");
		allAudioEls.forEach((el) => {
			el.pause();
			el.currentTime = 0;
		});

		const toPlay = audioEls[taglineI];
		toPlay.play();
		taglineI = (taglineI + 1) % numTaglines;

		paused = false;
		mediaPlaying.id = name;

		toPlay.onended = () => {
			paused = true;
			mediaPlaying.id = undefined;
			resetFace();
		};
	};

	const resetFace = () => {
		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-purple-400)";
		wrapperEl.style.transform = "none";
	};

	const onMouseEnter = () => {
		if (mediaPlaying.id === name || queen) return;
		wrapperEl.style.transform = `rotate(${Math.random() * 3}deg) scale(1.1)`;
	};

	const onMouseLeave = () => {
		if (mediaPlaying.id === name || queen) return;
		resetFace();
	};

	const slideChange = () => {
		if (!paused) {
			mediaPlaying.id = undefined;
			resetFace();
		}
	};

	$effect(() => {
		// Another face is clicked while this one is playing
		if (mediaPlaying.id !== name && !paused) {
			audioEls.forEach((el) => {
				el.pause();
				el.currentTime = 0;
				paused = true;
			});
			resetFace();
		}
	});
	$effect(() => {
		// Turn on/off sound
		audioEls.forEach((el) => {
			el.muted = !videoSettings.soundOn;
		});
	});
	$effect(() => slideChange(current.slide));
</script>

<div
	class="wrapper"
	class:absolute={!title}
	class:queen={queen === "true"}
	class:bounce={bounce && !clickedOne}
>
	{#if title}
		<div class="name" class:hide={mediaPlaying.id === name}>
			{_.startCase(name)} <span class="sound">{@html soundSvg}</span>
		</div>
	{/if}

	<button
		id={`${name}-face`}
		class="face"
		class:playing={mediaPlaying.id === name}
		onclick={onClick}
		onmouseenter={onMouseEnter}
		onmouseleave={onMouseLeave}
		bind:this={wrapperEl}
		tabindex={title && current.slide === 1 && slide !== 0 ? 0 : -1}
	>
		{@html svg}

		{#if queen}
			<span class="crown">👑</span>
		{/if}
	</button>

	<!-- <div class="quote" class:visible={mediaPlaying.id === name}>
		{Array.isArray(quote) ? quote[taglineI] : quote}
	</div> -->

	{#if audio}
		<audio bind:this={audioEls[0]} src={`assets/audio/${audio}.mp3`}></audio>
	{:else}
		{#each _.range(numTaglines) as i}
			<audio
				bind:this={audioEls[i]}
				src={`assets/audio/${name}${i > 0 ? i + 1 : ""}.mp3`}
			></audio>
		{/each}
	{/if}
</div>

<style>
	.wrapper {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.wrapper.absolute {
		position: absolute;
		width: 11rem;
		right: 0;
		bottom: 0;
	}

	.wrapper.queen {
		position: static;
		margin: 5rem auto 1rem;
		width: 50%;
	}

	.wrapper.bounce {
		animation: bounce 0.8s ease-in-out infinite;
	}

	.queen button {
		pointer-events: none;
	}

	.crown {
		font-size: var(--128px);
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%) rotate(-10deg);
	}

	button.face {
		position: relative;
		display: flex;
		background: none;
		padding: 0;
		width: 100%;
		transition: transform calc(var(--1s) * 0.2) ease-out;
	}

	.name {
		text-align: center;
		pointer-events: none;
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.name.hide {
		opacity: 0;
	}

	.quote {
		visibility: hidden;
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(0, -100%);
		z-index: 1000;
		background: var(--color-white);
		padding: 0.5rem;
		border-radius: 6px;
		font-size: var(--18px);
		text-align: center;
		outline: 4px solid var(--color-blue);
		opacity: 0.9;
	}

	.quote.visible {
		visibility: visible;
	}

	.sound {
		color: var(--color-purple-500);
		display: flex;
		height: 20px;
		width: 20px;
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-1rem);
		}
		100% {
			transform: translateY(0);
		}
	}

	:global(button.face svg path) {
		transition: fill calc(var(--1s) * 0.2);
	}

	@media (max-width: 600px) {
		.crown {
			font-size: var(--80px);
		}

		.quote {
			top: 100%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 200px;
		}
	}
</style>
