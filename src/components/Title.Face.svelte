<script>
	import _ from "lodash";

	let { name, phrases, svg, playing = $bindable() } = $props();

	let wrapperEl;
	let audioEls = [];
	let paused = true;

	const onClick = () => {
		if (playing === name) {
			playing = undefined;
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

		const choice = _.sample(audioEls);
		choice.play();
		paused = false;
		playing = name;

		choice.onended = () => {
			paused = true;
			playing = undefined;
			resetFace();
		};
	};

	const resetFace = () => {
		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-dark-purple)";
		wrapperEl.style.transform = "none";
	};

	const onMouseEnter = () => {
		if (playing === name) return;
		const outline = wrapperEl.querySelector("svg path");
		outline.style.fill = "var(--color-purple)";
		wrapperEl.style.transform = `rotate(${Math.random() * 3}deg) scale(1.1)`;
	};

	const onMouseLeave = () => {
		if (playing === name) return;
		resetFace();
	};

	$effect(() => {
		if (playing !== name && !paused) {
			audioEls.forEach((el) => {
				el.pause();
				el.currentTime = 0;
				paused = true;
			});
			resetFace();
		}
	});
</script>

<span
	id={`${name}-face`}
	class="face"
	class:playing={playing === name}
	on:click={onClick}
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
	bind:this={wrapperEl}
	tabindex="0"
>
	{@html svg}
</span>

{#each _.range(phrases) as i}
	<audio
		bind:this={audioEls[i]}
		src={`assets/audio/${name}${i > 0 ? i + 1 : ""}.mp3`}
	></audio>
{/each}

<style>
	.face {
		width: 100%;
		transition: transform 0.2s ease-out;
	}

	:global(.face svg path) {
		transition: fill 0.2s;
	}

	.face {
		cursor: pointer;
	}
</style>
