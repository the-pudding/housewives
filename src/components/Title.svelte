<script>
	import CMS from "$components/helpers/CMS.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import titleSvg from "$svg/housewives-logo.svg";

	const { content } = $props();

	let swiperEl;

	const names = [
		"meredith",
		"mary",
		"heather",
		"angie",
		"lisa",
		"jen",
		"bronwyn",
		"whitney"
	];

	const onClick = (index) => {
		if (swiperEl) {
			swiperEl.swiper.slideTo(index);
		}
	};

	$effect(() => {
		if (swiperEl) {
			swiperEl.swiper.slideTo(4);
		}
	});
</script>

<section id="title">
	<div class="text">
		<a
			class="wordmark"
			href="https://pudding.cool"
			aria-label="The Pudding"
			target="_self"
		>
			{@html titleSvg}
		</a>

		<CMS {content} />
	</div>

	<swiper-container
		bind:this={swiperEl}
		slides-per-view={"auto"}
		centered-slides={true}
		speed={500}
	>
		{#each names as name, i}
			<swiper-slide onclick={() => onClick(i)}>
				<TalkingHead {name} title={true} />
			</swiper-slide>
		{/each}
	</swiper-container>
</section>

<style>
	#title {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		height: 100%;
		padding: 2rem 0;
	}

	.text {
		max-width: 45rem;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.wordmark {
		height: 10rem;
		display: flex;
		width: fit-content;
		transition: transform 0.2s;
	}

	.wordmark:hover {
		transform: scale(1.05);
	}

	swiper-container {
		display: flex;
		height: 100%;
	}

	swiper-slide {
		pointer-events: all;
		width: auto;
		height: fit-content;
		max-width: 200px;
		flex-shrink: 0;
		margin: auto 0;
	}

	:global(#title h1) {
		font-weight: bold;
		margin-top: 0;
	}

	:global(#title h2) {
		font-family: var(--sans);
		font-weight: normal;
		margin: 0;
		font-style: italic;
		color: var(--color-purple-400);
		font-size: var(--22px);
	}
</style>
