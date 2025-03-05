<script>
	import Clip from "$components/Clip.svelte";
	import ccSvg from "$svg/closed-captioning.svg";
	import { current, videoSettings } from "$runes/misc.svelte.js";

	let { clips, slideI } = $props();

	let clipComponents = [];
	let activeClipI = $state(0);

	const finish = (id) => {
		if (activeClipI < clips.length - 1) activeClipI += 1;
	};

	const toggleCC = () => {
		videoSettings.ccOn = !videoSettings.ccOn;
	};

	const playClip = (i) => {
		activeClipI = i;
	};

	$effect(() => {
		if (slideI === current.slide) {
			clipComponents[activeClipI].restartPlay();
		} else if (slideI !== current.slide && activeClipI !== 0) {
			activeClipI = 0;
		}
	});
</script>

<div class="clips">
	{#each clips as { id, caption }, i}
		<button
			class="clip"
			class:active={i === activeClipI}
			onclick={() => playClip(i)}
		>
			<Clip
				bind:this={clipComponents[i]}
				{id}
				{slideI}
				autoplay={false}
				{finish}
				controls={false}
			/>
			<div class="caption">
				{@html caption}
			</div>
		</button>
	{/each}
</div>

<div class="controls">
	<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
		{@html ccSvg}
	</button>
</div>

<style>
	.clips {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 46vh;
		max-height: 450px;
		margin-top: 3rem;
		gap: 3rem;
	}

	.clip {
		background: none;
		padding: 0;
		opacity: 0.2;
		transition:
			transform calc(var(--1s) * 0.3),
			opacity calc(var(--1s) * 0.3);
	}

	.clip.active {
		opacity: 1;
	}

	.clip:hover {
		transform: translate(0, -4px);
		opacity: 0.8;
	}

	.caption {
		font-size: 1rem;
		margin-top: 0.25rem;
		text-align: start;
	}

	:global(.caption strong) {
		font-size: 1.2rem;
		margin-right: 4px;
	}

	.controls {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		margin-top: 3rem;
	}

	.cc {
		background: var(--color-purple-400);
		border-radius: 50%;
		color: var(--color-white);
		height: 40px;
		width: 40px;
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
	}

	.cc.on {
		outline: 3px solid var(--color-white);
	}

	.cc:hover {
		background: var(--color-purple-200);
	}
</style>
