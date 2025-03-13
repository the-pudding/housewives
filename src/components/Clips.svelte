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
		<div class="clip-wrapper">
			<button
				class="clip"
				class:active={i === activeClipI}
				onclick={() => playClip(i)}
				aria-label={`Video clip: ${caption}`}
			>
				<Clip
					bind:this={clipComponents[i]}
					{id}
					{slideI}
					autoplay={false}
					{finish}
					controls={false}
				/>
			</button>
			<div class="caption">
				{@html caption}
			</div>
		</div>
	{/each}
</div>

<!-- <div class="controls">
	<button class="cc" class:on={videoSettings.ccOn} onclick={toggleCC}>
		{@html ccSvg}
	</button>
</div> -->

<style>
	.clips {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		height: 480px;
		margin-top: 2rem;
		gap: 2rem;
	}

	.clip-wrapper {
		display: flex;
		flex-direction: column;
	}

	.clip {
		height: 100%;
		width: 100%;
		background: none;
		padding: 0;
		opacity: 0.2;
		transition:
			transform calc(var(--1s) * 0.3),
			opacity calc(var(--1s) * 0.3);
		border: 4px solid black;
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
		margin-top: 0.5rem;
		text-align: start;
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

	:global(.caption strong) {
		margin-right: 4px;
	}

	@media (max-width: 600px) {
		.clips {
			margin: 0;
			gap: 0.5rem;
		}

		.caption {
			font-size: var(--12px);
		}

		:global(.caption strong) {
			margin-right: 0;
		}
	}
</style>
