<script>
	import Clip from "$components/Clip.svelte";
	import soundOnSvg from "$svg/sound-on.svg";
	import soundOffSvg from "$svg/sound-off.svg";
	import restartSvg from "$svg/restart.svg";
	import ccSvg from "$svg/closed-captioning.svg";
	import { mediaPlaying, videoSettings } from "$runes/misc.svelte.js";

	let { clips, slideI } = $props();

	let clipComponents = [];

	const captionsShowing = $state(
		clips.map((d) => ({ id: d.id, caption: d.caption, show: false }))
	);

	const finish = (id) => {
		captionsShowing.find((d) => d.id === id).show = true;
	};

	const toggleCC = () => {
		videoSettings.ccOn = !videoSettings.ccOn;
	};

	const toggleSound = () => {
		videoSettings.soundOn = !videoSettings.soundOn;
	};

	const restartClip = () => {
		const index = clips.findIndex((d) => d.id === mediaPlaying.id);
		clipComponents[index].restart();
	};
</script>

<div class="clips">
	{#each clips as { id, caption }, i}
		<div class="clip">
			<Clip
				bind:this={clipComponents[i]}
				{id}
				{slideI}
				autoplay={i === 0}
				{finish}
				controls={false}
			/>
			<div
				class="caption"
				class:visible={captionsShowing.find((d) => d.id === id).show}
			>
				{caption}
				<button
					class="restart"
					disabled={id !== mediaPlaying.id}
					onclick={restartClip}>{@html restartSvg}</button
				>
			</div>
		</div>
	{/each}
</div>

<div class="controls">
	<button class="mute" onclick={toggleSound}>
		{@html videoSettings.soundOn ? soundOnSvg : soundOffSvg}
	</button>

	<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
		{@html ccSvg}
	</button>
</div>

<style>
	.clips {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 400px;
		gap: 3rem;
	}

	.caption {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: 1.2rem;
		margin-top: 0.25rem;
		opacity: 0.2;
		transition: opacity calc(var(--1s) * 0.2);
	}

	.caption.visible {
		opacity: 1;
	}

	.controls {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-top: 3rem;
	}

	button {
		background: var(--color-dark-purple);
		border-radius: 50%;
		color: var(--color-white);
		height: 40px;
		width: 40px;
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
	}

	.restart {
		height: 32px;
		width: 32px;
	}

	.cc.on {
		outline: 3px solid var(--color-white);
	}

	button:hover {
		background: var(--color-purple);
	}
</style>
