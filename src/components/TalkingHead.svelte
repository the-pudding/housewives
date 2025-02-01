<script>
	import _ from "lodash";
	import angieSvg from "$svg/faces/angie.svg";
	import bronwynSvg from "$svg/faces/bronwyn.svg";
	import heatherSvg from "$svg/faces/heather.svg";
	import jenSvg from "$svg/faces/jen.svg";
	import lisaSvg from "$svg/faces/lisa.svg";
	import marySvg from "$svg/faces/mary.svg";
	import meredithSvg from "$svg/faces/meredith.svg";
	import whitneySvg from "$svg/faces/whitney.svg";
	import { mediaPlaying } from "$runes/misc.svelte.js";
	import { current } from "../runes/misc.svelte";

	const { name, audio } = $props();

	const housewives = [
		{ name: "meredith", phrases: 2, svg: meredithSvg },
		{ name: "mary", phrases: 2, svg: marySvg },
		{ name: "heather", phrases: 2, svg: heatherSvg },
		{ name: "angie", phrases: 1, svg: angieSvg },
		{ name: "lisa", phrases: 2, svg: lisaSvg },
		{ name: "jen", phrases: 2, svg: jenSvg },
		{ name: "bronwyn", phrases: 1, svg: bronwynSvg },
		{ name: "whitney", phrases: 2, svg: whitneySvg }
	];

	let { svg, phrases } = housewives.find(
		(housewife) => housewife.name === name
	);

	let wrapperEl;
	let audioEls = [];
	let paused = true;

	const onClick = () => {
		if (mediaPlaying.id === name) {
			mediaPlaying.id = undefined;
			resetFace();
			return;
		}

		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-blue)";
		wrapperEl.style.transform = `rotate(${Math.random() * 5}deg) scale(1.5)`;

		const allAudioEls = document.querySelectorAll("audio");
		allAudioEls.forEach((el) => {
			el.pause();
			el.currentTime = 0;
		});

		const choice = audioEls.length > 1 ? _.sample(audioEls) : audioEls[0];
		choice.play();
		paused = false;
		mediaPlaying.id = name;

		choice.onended = () => {
			paused = true;
			mediaPlaying.id = undefined;
			resetFace();
		};
	};

	const resetFace = () => {
		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-dark-purple)";
		wrapperEl.style.transform = "none";
	};

	const onMouseEnter = () => {
		if (mediaPlaying.id === name) return;
		wrapperEl.style.transform = `rotate(${Math.random() * 3}deg) scale(1.1)`;
	};

	const onMouseLeave = () => {
		if (mediaPlaying.id === name) return;
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

	$effect(() => slideChange(current.slide));
</script>

<button
	id={`${name}-face`}
	class="face"
	class:playing={mediaPlaying.id === name}
	onclick={onClick}
	onmouseenter={onMouseEnter}
	onmouseleave={onMouseLeave}
	bind:this={wrapperEl}
>
	{@html svg}
</button>

{#if audio}
	<audio bind:this={audioEls[0]} src={`assets/audio/${audio}.mp3`}></audio>
{:else}
	{#each _.range(phrases) as i}
		<audio
			bind:this={audioEls[i]}
			src={`assets/audio/${name}${i > 0 ? i + 1 : ""}.mp3`}
		></audio>
	{/each}
{/if}

<style>
	button.face {
		display: flex;
		background: none;
		padding: 0;
		height: 200px;
		width: 100%;
		transition: transform 0.2s ease-out;
	}

	:global(button.face svg path) {
		transition: fill 0.2s;
	}
</style>
