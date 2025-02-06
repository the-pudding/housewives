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
	import copy from "$data/copy.json";

	const { name, audio, showTagline = false } = $props();

	const svgs = {
		angie: angieSvg,
		bronwyn: bronwynSvg,
		heather: heatherSvg,
		jen: jenSvg,
		lisa: lisaSvg,
		mary: marySvg,
		meredith: meredithSvg,
		whitney: whitneySvg
	};

	const housewives = Object.keys(copy.taglines).map((name) => ({
		name: name,
		taglines: copy.taglines[name],
		numTaglines: copy.taglines[name].length,
		svg: svgs[name]
	}));

	let { svg, taglines, numTaglines } = housewives.find(
		(housewife) => housewife.name === name
	);

	let wrapperEl;
	let taglineI;
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
		if (showTagline) taglineI = audioEls.indexOf(choice);
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

<div class="wrapper">
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

	{#if showTagline}
		<div class="quote" class:visible={mediaPlaying.id === name}>
			{taglines[taglineI]}
		</div>
	{/if}

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
	}

	button.face {
		display: flex;
		background: none;
		padding: 0;
		height: 200px;
		width: 100%;
		transition: transform 0.2s ease-out;
	}

	.quote {
		visibility: hidden;
		position: absolute;
		top: -25%;
		left: 100%;
		z-index: 1000;
		width: 100%;
		background: var(--color-white);
		padding: 0.5rem;
		border-radius: 6px;
		font-size: var(--18px);
		/* border: 2px solid var(--color-fg); */
	}

	.quote.visible {
		visibility: visible;
	}

	:global(button.face svg path) {
		transition: fill 0.2s;
	}
</style>
