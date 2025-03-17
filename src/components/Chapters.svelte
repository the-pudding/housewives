<script>
	import Mute from "$components/Mute.svelte";
	import copy from "$data/copy.json";
	import { current } from "$runes/misc.svelte.js";

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
										aria-label={`Section ${sectionI}, Slide ${barI + 1}, Part ${subI + 1}`}
										tabindex={current.section > 0 ? 0 : -1}
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
									aria-label={`Section ${sectionI}, Slide ${barI + 1}`}
									tabindex={current.section > 0 ? 0 : -1}
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
						{#if sectionI !== copy.sections.length - 1}{sectionI} —
						{/if}{@html section}
					</div>
				{:else}
					<button
						class="long-bar-wrapper"
						onclick={() => goTo(sectionI, 0)}
						aria-label={`Section ${sectionI} - ${section}`}
						tabindex={current.section > 0 ? 0 : -1}
					>
						<div class="long-bar"></div>
					</button>
				{/if}
			</div>
		{/if}
	{/each}

	<Mute visible={current.section > 0} />
</div>

<style>
	#chapters {
		position: absolute;
		top: 1.5rem;
		width: 100%;
		padding: 0 4.5rem;
		display: flex;
		gap: 4px;
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.3);
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

	.section.active:last-of-type {
		flex: 1;
	}

	.title {
		font-weight: bold;
		font-size: var(--14px);
		color: var(--color-purple-400);
		position: absolute;
		top: 100%;
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

	@media (max-width: 600px) {
		#chapters {
			padding: 0 4rem;
		}

		.title {
			max-width: 150px;
		}
	}
</style>
