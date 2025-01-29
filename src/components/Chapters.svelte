<script>
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

<div class="chapters" class:visible={current.section > 0}>
	{#each copy.sections as { section, slides }, sectionI}
		{#if sectionI > 0}
			<div class="section" class:active={current.section === sectionI}>
				<div class="title">{@html section}</div>
				<div class="bars">
					{#each slides as slide, barI}
						{#if slide.multi}
							{#each slide.content as subslide, subI}
								<div
									class="bar-wrapper"
									onclick={() => goTo(sectionI, barI, subI)}
								>
									<div
										class="bar"
										class:active={current.section === sectionI &&
											current.slideInSection === barI &&
											current.subslide === subI}
									></div>
								</div>
							{/each}
						{:else}
							<div class="bar-wrapper" onclick={() => goTo(sectionI, barI)}>
								<div
									class="bar"
									class:active={current.section === sectionI &&
										current.slideInSection === barI}
								></div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</div>

<style>
	.chapters {
		display: flex;
		gap: 4px;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.chapters.visible {
		opacity: 1;
	}

	.section {
		flex: 1;
		display: flex;
		flex-direction: column;
		opacity: 0.3;
	}

	.section.active {
		flex: 5;
		opacity: 1;
	}

	.title {
		position: absolute;
		top: 0;
		transform: translate(0, -110%);
		font-size: var(--14px);
		visibility: hidden;
	}

	.section.active .title {
		visibility: visible;
	}

	.bars {
		display: flex;
		gap: 1px;
	}

	.bar-wrapper {
		flex: 1;
		height: 20px;
	}

	.bar-wrapper:hover {
		cursor: pointer;
	}

	.bar-wrapper:hover .bar {
		background: var(--color-purple);
	}

	.bar {
		height: 2px;
		background: var(--color-gray-500);
	}

	.bar.active {
		background: var(--color-dark-purple);
	}
</style>
