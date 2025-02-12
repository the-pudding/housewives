<script>
	import copy from "$data/copy.json";
	import { current, videoSettings } from "$runes/misc.svelte.js";
	import soundOnSvg from "$svg/sound-on.svg";
	import soundOffSvg from "$svg/sound-off.svg";

	const { allSlides } = $props();

	const goTo = (section, slideInSection, subslide) => {
		const slide = allSlides.find(
			(d) => d.section === section && d.slideInSection === slideInSection
		);
		current.section = slide.section;
		current.slideInSection = slide.slideInSection;
		current.slide = slide.slide;
		if (subslide !== undefined) current.subslide = subslide;
	};
</script>

<div id="chapters" class:visible={current.section > 0}>
	{#each copy.sections as { section, slides }, sectionI}
		{@const active = sectionI === current.section}
		{#if sectionI > 0}
			<div class="section" class:active>
				{#if active}
					<div class="bars">
						{#each slides as slide, barI}
							{#if slide.multi}
								{#each slide.content as subslide, subI}
									<button
										class="bar-wrapper"
										onclick={() => goTo(sectionI, barI, subI)}
									>
										<div
											class="bar"
											class:active={current.section === sectionI &&
												current.slideInSection === barI &&
												current.subslide === subI}
										></div>
									</button>
								{/each}
							{:else}
								<button
									class="bar-wrapper"
									onclick={() => goTo(sectionI, barI)}
								>
									<div
										class="bar"
										class:active={current.section === sectionI &&
											current.slideInSection === barI}
									></div>
								</button>
							{/if}
						{/each}
					</div>

					<div class="title text-outline">
						{sectionI} — {@html section}
					</div>
				{:else}
					<button class="long-bar-wrapper" onclick={() => goTo(sectionI, 0)}>
						<div class="long-bar" />
					</button>
				{/if}
			</div>
		{/if}
	{/each}
</div>

<button
	class="mute"
	onclick={() => (videoSettings.soundOn = !videoSettings.soundOn)}
>
	{@html videoSettings.soundOn ? soundOnSvg : soundOffSvg}
</button>

<style>
	#chapters {
		position: absolute;
		top: 1.5rem;
		width: 100%;
		padding: 0 4.5rem;
		display: flex;
		gap: 4px;
		opacity: 0;
		transition: opacity 0.3s;
		z-index: 1;
	}

	#chapters.visible {
		opacity: 1;
	}

	.section {
		flex: 1;
		display: flex;
		flex-direction: column;
		opacity: 0.5;
	}

	.section.active {
		flex: 5;
		opacity: 1;
	}

	.title {
		font-weight: bold;
		font-size: var(--14px);
		color: var(--color-purple-400);
	}

	.bars {
		display: flex;
		gap: 2px;
	}

	.bar-wrapper {
		flex: 1;
		height: 20px;
		background: none;
		padding: 0;
	}

	.bar-wrapper:hover,
	.long-bar-wrapper:hover {
		cursor: pointer;
	}

	.bar-wrapper:hover .bar,
	.long-bar-wrapper:hover .long-bar {
		background: var(--color-purple-200);
	}

	.bar {
		height: 4px;
		background: var(--color-white);
	}

	.bar.active {
		background: var(--color-purple-400);
	}

	.long-bar-wrapper {
		height: 20px;
		background: none;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.long-bar {
		width: 100%;
		height: 4px;
		background: var(--color-white);
	}

	button.mute {
		position: absolute;
		max-width: 2.5rem;
		top: 1rem;
		right: 1rem;
		background: var(--color-purple-400);
		border-radius: 50%;
		color: var(--color-white);
		font-weight: bold;
		font-size: var(--14px);
		white-space: nowrap;
		opacity: 0.9;
		z-index: 100;
	}

	button.mute:hover {
		background: var(--color-purple-200);
	}
</style>
