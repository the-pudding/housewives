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
			<div class="face">
				<TalkingHead {name} title={true} />
			</div>
		{/each}
	</div>
</div>

<style>
	#title {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.wordmark {
		height: 10rem;
		display: flex;
		width: fit-content;
	}

	.faces {
		display: flex;
		gap: 1rem;
		overflow: scroll;
		margin-top: 3rem;
	}

	.face {
		width: 200px;
		flex-shrink: 0;
	}

	:global(#title h1) {
		font-weight: bold;
	}

	:global(#title h2) {
		font-family: var(--sans);
		font-weight: normal;
		margin: 0;
		font-style: italic;
		color: var(--color-purple-400);
		font-size: var(--22px);
	}
</style>
