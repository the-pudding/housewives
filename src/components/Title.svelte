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
	let showingTitle = $state(true);

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
		if (current.slide === 0) {
			showingTitle = true;
			document.body.style.background = "rgb(216 227 231)";
			document.body.style.transition = "background 1s";
		} else if (showingTitle) {
			showingTitle = false;
			document.body.style.background = "white";
		}

		if (current.slide !== 0 && playing) {
			playing = undefined;
		}
	};

	$effect(() => slideChange(current.slide));
</script>

{@html titleSvg}
<CMS {content} />

<div class="faces">
	{#each faces as { name, phrases, svg }}
		<Face {name} {phrases} {svg} bind:playing />
	{/each}
</div>
<small>Click a face. [replace this with transcript when playing]</small>

<!-- <img src="assets/img/cloud.png" /> -->
<!-- <img src="assets/img/cloud2.png" /> -->

<style>
	.faces {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
		padding: 20px 0;
	}

	img {
		position: absolute;
		top: 0;
		z-index: -1;
	}
</style>
