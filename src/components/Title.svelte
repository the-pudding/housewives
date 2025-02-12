<script>
	import CMS from "$components/helpers/CMS.svelte";
	import TalkingHead from "$components/TalkingHead.svelte";
	import titleSvg from "$svg/housewives-logo.svg";

	const { content } = $props();

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
</script>

<div id="title">
	<a
		class="wordmark"
		href="https://pudding.cool"
		aria-label="The Pudding"
		target="_self"
	>
		{@html titleSvg}
	</a>

	<CMS {content} />

	<div class="faces">
		{#each names as name}
			<TalkingHead {name} title={true} />
		{/each}
	</div>
</div>

<style>
	.wordmark {
		position: fixed;
		top: 1rem;
		left: 1rem;
		transition: transform calc(var(--1s) * 0.25);
	}

	.wordmark:hover {
		transform: translate(0, -4px);
	}

	.faces {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		justify-content: center;
		gap: 1rem;
		margin-top: 3rem;
	}

	:global(#title h1) {
		font-weight: bold;
	}

	:global(#title h2) {
		font-style: italic;
		color: var(--color-dark-purple);
		font-size: var(--22px);
	}
</style>
