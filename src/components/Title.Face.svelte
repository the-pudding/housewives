<script>
	import _ from "lodash";

	let { name, phrases, playing = $bindable() } = $props();

	let audioEls = [];

	const onClick = () => {
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
		};
	};
</script>

<img
	class:playing={playing === name}
	src={`assets/img/faces/${name}.png`}
	on:click={onClick}
/>
{#each _.range(phrases) as i}
	<audio
		bind:this={audioEls[i]}
		src={`assets/audio/${name}${i > 0 ? i + 1 : ""}.mp3`}
	></audio>
{/each}

<style>
	img {
		width: 100px;
		transition: transform 0.2s ease-out;
	}

	img:hover {
		cursor: pointer;
		transform: rotate(1deg) scale(1.1);
	}

	img.playing {
		transform: rotate(1deg) scale(1.5);
	}
</style>
