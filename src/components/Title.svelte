<script>
	import CMS from "$components/helpers/CMS.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import titleSvg from "$svg/title.svg";
	import { current } from "$runes/misc.svelte.js";

	const { content } = $props();

	let showingTitle = $state(true);

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

	const slideChange = () => {
		if (current.slide === 0) {
			showingTitle = true;
			// document.body.style.background = "rgb(216 227 231)";
			// document.body.style.transition = "background 1s";
		} else if (showingTitle) {
			showingTitle = false;
			// document.body.style.background = "white";
		}
	};

	$effect(() => slideChange(current.slide));
</script>

<div class="title">
	{@html titleSvg}
	<CMS {content} />

	<div class="faces">
		{#each names as name}
			<TalkingHead {name} showTagline={true} />
		{/each}
	</div>
</div>

<!-- <img src="assets/img/cloud.png" /> -->
<!-- <img src="assets/img/cloud2.png" /> -->

<style>
	.faces {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
	}
</style>
