<script>
	import TalkingHead from "$components/TalkingHead.svelte";
	import { current } from "$runes/misc.svelte.js";

	let { taglines } = $props();

	let swiperEl;
	let entered = $state(false);

	const onClick = (index) => {
		if (swiperEl) {
			swiperEl.swiper.slideTo(index);
		}
	};

	$effect(() => {
		if (swiperEl && current.slide === 1) {
			entered = true;
			swiperEl.swiper.slideTo(3);
		} else if (current.slide !== 1 && entered) {
			entered = false;
		}
	});
</script>

<div id="intro-faces">
	<div class="faces">
		<swiper-container
			class:entered
			bind:this={swiperEl}
			slides-per-view={"auto"}
			centered-slides={true}
			speed={500}
		>
			{#each taglines as { name, quote }, i}
				<swiper-slide onclick={() => onClick(i)}>
					<TalkingHead {name} {quote} title={true} />
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</div>

<style>
	.faces {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		width: 100%;
	}

	swiper-container {
		visibility: hidden;
		transform: translate(100%, 0);
		transition: transform calc(var(--1s) * 0.8);
	}

	swiper-container.entered {
		visibility: visible;
		transform: translate(0, 0);
	}

	swiper-slide {
		pointer-events: all;
		width: auto;
		max-width: 200px;
		display: flex;
		align-items: start;
		flex-shrink: 0;
		padding-top: 8rem;
		padding-bottom: 4rem;
	}

	@media (max-width: 600px) {
		swiper-slide {
			max-width: 150px;
		}
	}
</style>
