<script>
	import CMS from "$components/helpers/CMS.svelte";
	import Face from "$components/Title.Face.svelte";
	import titleSvg from "$svg/title.svg";
	import { current } from "$runes/misc.svelte.js";
	import angieSvg from "$svg/faces/angie.svg";
	import bronwynSvg from "$svg/faces/bronwyn.svg";
	import heatherSvg from "$svg/faces/heather.svg";
	import jenSvg from "$svg/faces/jen.svg";
	import lisaSvg from "$svg/faces/lisa.svg";
	import marySvg from "$svg/faces/mary.svg";
	import meredithSvg from "$svg/faces/meredith.svg";
	import whitneySvg from "$svg/faces/whitney.svg";

	const { content } = $props();

	let playing = $state(undefined);

	const faces = [
		{ name: "meredith", phrases: 2, svg: meredithSvg },
		{ name: "mary", phrases: 2, svg: marySvg },
		{ name: "heather", phrases: 2, svg: heatherSvg },
		{ name: "angie", phrases: 1, svg: angieSvg },
		{ name: "lisa", phrases: 2, svg: lisaSvg },
		{ name: "jen", phrases: 2, svg: jenSvg },
		{ name: "bronwyn", phrases: 1, svg: bronwynSvg },
		{ name: "whitney", phrases: 2, svg: whitneySvg }
	];

	const slideChange = () => {
		if (current.slide !== 0 && playing) {
			playing = undefined;
		}
	};

	$effect(() => slideChange(current.slide));
</script>

<svelte:head>
	<!-- <style>
		body {
			position: relative;
			margin: 0;
			height: 100vh;
			overflow: hidden;
		}

		body::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-image: url("assets/img/clouds.jpg");
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			opacity: 0.4;
			z-index: -1;
		}
	</style> -->
</svelte:head>

{@html titleSvg}
<CMS {content} />

<div class="faces">
	{#each faces as { name, phrases, svg }}
		<Face {name} {phrases} {svg} bind:playing />
	{/each}
</div>

<style>
	.faces {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
		padding: 20px 0;
	}
</style>
