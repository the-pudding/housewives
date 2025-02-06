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
		font-family: var(--serif);
		font-size: var(--24px);
		margin-top: 2rem;
		font-weight: bold;
	}

	li {
		margin: 0.5rem 0;
	}
</style>
