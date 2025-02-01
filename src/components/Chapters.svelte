<script>
	import copy from "$data/copy.json";
	import { current } from "$runes/misc.svelte.js";

	const { allSlides } = $props();

	$inspect(allSlides);

	const goTo = (section, slideInSection, subslide) => {
		const slide = allSlides.find(
			(d) => d.section === section && d.slideInSection === slideInSection
		);
		current.section = slide.section;
		current.slideInSection = slide.slideInSection;
		current.slide = slide.slide;
		if (subslide !== undefined) current.subslide = subslide;
	};

	let textColor = $derived(
		allSlides
			.find((d) => d.slide === current.slide)
			.content.some((d) => d.type === "Clip" || d.type === "ClipPreview")
			? "var(--color-white)"
			: "var(--color-fg)"
	);
</script>

<div id="chapters" class:visible={current.section > 0}>
	{#each copy.sections as { section, slides }, sectionI}
		{#if sectionI > 0}
			<div class="section" class:active={current.section === sectionI}>
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
							<button class="bar-wrapper" onclick={() => goTo(sectionI, barI)}>
								<div
									class="bar"
									class:active={current.section === sectionI &&
										current.slideInSection === barI}
								></div>
							</button>
						{/if}
					{/each}
				</div>

				<div class="title" style:color={textColor}>{@html section}</div>
			</div>
		{/if}
	{/each}
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
		opacity: 0.4;
	}

	.section.active {
		flex: 5;
		opacity: 1;
	}

	.title {
		font-weight: bold;
		font-size: var(--14px);
		visibility: hidden;
	}

	.section.active .title {
		visibility: visible;
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

	.bar-wrapper:hover {
		cursor: pointer;
	}

	.bar-wrapper:hover .bar {
		background: var(--color-purple);
	}

	.bar {
		height: 4px;
		background: var(--color-white);
	}

	.bar.active {
		background: var(--color-dark-purple);
	}
</style>
