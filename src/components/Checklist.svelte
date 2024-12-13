<script>
	let { items = [] } = $props();
</script>

<ul>
	{#each items as item}
		<li>✅ {item}</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		padding-left: 2rem;
		font-family: var(--mono);
		font-size: var(--20px);
	}

	li {
		margin: 0.5rem 0;
	}
</style>
