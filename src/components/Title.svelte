<script>
	import CMS from "$components/helpers/CMS.svelte";
	import titleSvg from "$svg/title.svg";

	const { content } = $props();

	const faces = [
		"meredith",
		"jen",
		"heather",
		"angie",
		"lisa",
		"mary",
		"bronwyn",
		"whitney"
	];
</script>

{@html titleSvg}

<CMS {content} />

<div class="faces">
	{#each faces as name}
		<img src={`assets/img/faces/${name}.png`} />
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

	img {
		width: 100px;
		transition: transform 0.15s ease-out;
	}

	img:hover {
		cursor: pointer;
		transform: rotate(1deg) scale(1.1);
	}
</style>
