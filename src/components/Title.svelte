<script>
	import CMS from "$components/helpers/CMS.svelte";
	import Face from "$components/Title.Face.svelte";
	import titleSvg from "$svg/title.svg";

	const { content } = $props();

	let playing = $state(undefined);

	const faces = [
		{ name: "meredith", phrases: 2 },
		{ name: "jen", phrases: 2 },
		{ name: "heather", phrases: 2 },
		{ name: "angie", phrases: 1 },
		{ name: "lisa", phrases: 2 },
		{ name: "mary", phrases: 2 },
		{ name: "bronwyn", phrases: 1 },
		{ name: "whitney", phrases: 2 }
	];
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
	{#each faces as { name, phrases }}
		<Face {name} {phrases} bind:playing />
	{/each}
</div>

<style>
	.faces {
		display: grid;
		grid-template-columns: repeat(4, 100px);
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
	}
</style>
