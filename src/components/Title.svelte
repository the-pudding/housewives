<script>
	import CMS from "$components/helpers/CMS.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import titleSvg from "$svg/housewives-logo.svg";
	import { current } from "$runes/misc.svelte.js";

	const { content } = $props();

	let swiperEl;
	let entered = $state(false);

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
		if (swiperEl && current.slide === 0) {
			entered = true;
			swiperEl.swiper.slideTo(3);
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

	<div class="faces">
		<strong>Click a face to hear their tagline!</strong>
		<swiper-container
			class:entered
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
	</div>
</section>

<style>
	#title {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		width: 100%;
		height: 100%;
		padding: 2rem 0 0 0;
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

	.faces {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	swiper-container {
		height: 100%;
		transform: translate(100%, 0);
		transition: transform calc(var(--1s) * 0.8);
	}

	swiper-container.entered {
		transform: translate(0, 0);
	}

	swiper-slide {
		pointer-events: all;
		width: auto;
		max-width: 200px;
		display: flex;
		align-items: end;
		flex-shrink: 0;
		padding-bottom: 2rem;
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
