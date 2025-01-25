<script>
	import _ from "lodash";

	let { name, phrases, svg, playing = $bindable() } = $props();

	let audioEls = [];

	const onClick = () => {
		const wrapper = document.getElementById(`${name}-face`);
		const outline = wrapper.querySelector("svg path");
		outline.style.fill = "var(--color-blue)";

		const allAudioEls = document.querySelectorAll("audio");
		allAudioEls.forEach((el) => {
			el.pause();
			el.currentTime = 0;
		});

		const choice = _.sample(audioEls);
		choice.play();
		playing = name;
		choice.onended = () => {
			playing = undefined;
			const wrapper = document.getElementById(`${name}-face`);
			const outline = wrapper.querySelector("svg path");
			outline.style.fill = "var(--color-dark-purple)";
		};
	};

	$effect(() => {
		if (playing !== name) {
			audioEls.forEach((el) => {
				el.pause();
				el.currentTime = 0;
			});
			const wrapper = document.getElementById(`${name}-face`);
			const outline = wrapper.querySelector("svg path");
			outline.style.fill = "var(--color-dark-purple)";
		}
	});
</script>

<span
	id={`${name}-face`}
	class="face"
	class:playing={playing === name}
	on:click={onClick}
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
		width: 100px;
		transition: transform 0.2s ease-out;
	}

	.face:hover {
		cursor: pointer;
		transform: rotate(1deg) scale(1.1);
	}

	.face.playing {
		transform: rotate(5deg) scale(1.5);
	}
</style>
