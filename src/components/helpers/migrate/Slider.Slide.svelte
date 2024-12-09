<script>
	import { getContext } from "svelte";
	import canTab from "$actions/canTab.js";

	let { index, contents, text, visual } = $props();

	const context = getContext("Slider");

	let width = $derived(
		context.direction === "horizontal"
			? `${context.count * context.width}px`
			: "100%"
	);
	let height = $derived(
		context.direction === "vertical"
			? `${context.count * context.height}px`
			: "100%"
	);
	let visible = $derived(index === context.current.activeSlide);
	let disable = $derived(!visible);
</script>

<div
	id={`slide-${index}`}
	class="slide"
	class:visible
	style:width
	style:height
	role="group"
	aria-label="slide {index + 1} of {context.count}"
	aria-current={visible}
	use:canTab={{ disable }}
>
	{@render contents(text, visual)}
</div>

<style>
	.slide {
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>
