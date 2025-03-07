<script>
	let { items = [] } = $props();
</script>

<ul>
	{#each items as item}
		<li>☑️ {item}</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		padding-left: 2rem;
		font-family: var(--serif);
		font-size: var(--24px);
		font-weight: bold;
	}

	li {
		margin: 0.5rem 0;
	}

	@media (max-width: 600px) {
		ul {
			font-size: var(--18px);
			padding-left: 1rem;
		}
	}
</style>
