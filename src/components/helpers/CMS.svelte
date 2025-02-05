<script>
	let { components = {}, content = [], slideI } = $props();

	$inspect(components);
</script>

{#each content as { type, value }}
	{@const C = components[type]}
	{@const isString = typeof value === "string"}
	{#if C}
		<C {...value} {slideI} />
	{:else if type === "text"}
		<p>{@html value}</p>
	{:else if isString}
		<svelte:element this={type}>
			{@html value}
		</svelte:element>
	{:else}
		<svelte:element this={type} {...value}></svelte:element>
	{/if}
{/each}
