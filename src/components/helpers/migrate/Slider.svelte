<!--
Add the css snippet below to your global css file to do a 
full-screen + mobile friendly slider
	
html, body, main {
	height: 100%;
	overflow: hidden;
}

Usage:
<script>
	import Slider from "$components/helpers/Slider.svelte";
	import Slide from "$components/helpers/Slider.Slide.svelte";

	let sliderEl; // component binding

	sliderEl.next(); // navigation call
</script>

<Slider bind:this={sliderEl}>
	<Slide>
		<p>content</p>
	</Slide>
</Slider>
-->
<script>
	import { setContext, onMount } from "svelte";
	import { writable } from "svelte/store";

	let {
		direction = "horizontal",
		duration = "500ms",
		timing = "ease",
		count = 0,
		current, // NEW
		slides // NEW
	} = $props();

	export const next = () => move(1);
	export const prev = () => move(-1);
	export const jump = (val) => move(val, true);

	let width = $state();
	let height = $state();
	let index = $state(0);
	let children = 0;
	let isInView = false;
	let sliderEl;
	let translateEl;
	let observer;

	const move = (val, jump) => {
		const target = jump ? val : index + val;
		index = Math.max(0, Math.min(children - 1, target));
		current = index;
	};

	$inspect({ index, current });

	const onIntersect = (e) => {
		isInView = e[0].isIntersecting;
	};

	let w = $derived(
		direction === "horizontal" ? `${children * width}px` : "100%"
	);
	let h = $derived(
		direction === "vertical" ? `${children * height}px` : "100%"
	);
	let x = $derived(direction === "horizontal" ? `${index * width * -1}px` : 0);
	let y = $derived(direction === "vertical" ? `${index * height * -1}px` : 0);
	let sW = $derived(`width: ${w};`);
	let sH = $derived(`height: ${h};`);
	let sT = $derived(`transform: translate3d(${x}, ${y}, 0);`);
	let sTD = $derived(`transition-duration: ${duration};`);
	let sTTF = $derived(`transition-timing-function: ${timing};`);
	let customStyle = $derived(`${sW} ${sH} ${sT} ${sTD} ${sTTF}`);

	const context = {
		get direction() {
			return direction;
		},
		get width() {
			return width;
		},
		get height() {
			return height;
		},
		get count() {
			return count;
		},
		get current() {
			return current;
		}
	};

	setContext("Slider", context);

	onMount(() => {
		children = translateEl.children.length;
		count = children;
		observer = new IntersectionObserver(onIntersect, {
			root: null,
			rootMargin: "-1px"
		});
		observer.observe(sliderEl);
		height = height;
		width = width;
	});
</script>

<section
	aria-label="carousel"
	class="slider {direction}"
	bind:this={sliderEl}
	bind:clientWidth={width}
	bind:clientHeight={height}
	style={`height: ${!height ? "calc(100vh - 5rem)" : null}`}
>
	<div class="slides" bind:this={translateEl} style={customStyle}>
		{@render slides()}
	</div>
</section>

<style>
	section {
		position: relative;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		z-index: 1;
		overflow: hidden;
	}

	.slides {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		width: 100%;
		height: 100%;
		transition-property: transform;
		z-index: 1;
	}

	.horizontal > .slides {
		flex-direction: row;
	}

	.vertical > .slides {
		flex-direction: column;
	}
</style>
