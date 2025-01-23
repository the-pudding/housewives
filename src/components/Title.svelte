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
