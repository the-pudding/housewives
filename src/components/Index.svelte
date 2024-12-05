<script>
	import copy from "$data/copy.json";
</script>

<article>
	{#each copy.sections as { title, slides }}
		<h2>{title}</h2>

		{#each slides as { text, visual }}
			<p>{@html text}</p>
			{#if visual}<small>{visual}</small>{/if}
		{/each}
	{/each}
</article>

<style>
	article {
		max-width: 700px;
		margin: 0 auto;
	}

	small {
		padding-left: 2rem;
	}
</style>
