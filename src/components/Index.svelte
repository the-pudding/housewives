<script>
	import copy from "$data/copy.json";

	let w = $state();
	let activeSlide = $state(0);

	const onKeyDown = (e) => {
		if (e.keyCode === 39) {
			if (activeSlide < 42 - 1) activeSlide += 1;
		} else if (e.keyCode === 37) {
			if (activeSlide > 0) activeSlide -= 1;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<article bind:clientWidth={w}>
	<div
		class="slides"
		style:transform={`translate(${activeSlide * w * -1}px, 0)`}
	>
		{#each copy.sections as { title, slides }, sectionI}
			{#each slides as { text, clip, visual }, slideI}
				{@const index =
					slideI +
					copy.sections
						.slice(0, sectionI)
						.reduce((acc, { slides }) => acc + slides.length, 0)}

				<div class="slide" id={`slide-${index}`}>
					<div class="content">
						<p>{text}</p>

						{#if clip}
							<video src={`assets/video/${clip}.mp4`} controls={true} />
						{/if}

						{#if visual}
							<small>{visual}</small>
						{/if}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</article>

<style>
	article {
		width: 100%;
		overflow: hidden;
	}

	.slides {
		display: flex;
		width: 100%;
	}

	.slide {
		width: 100%;
		flex-shrink: 0;
		height: 100vh;
		padding: 2rem 5rem;
	}

	.content {
		max-width: 600px;
		margin: 0 auto;
	}

	small {
		padding-left: 2rem;
	}
</style>
