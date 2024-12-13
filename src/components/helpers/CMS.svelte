<script>
	// components: an object of components that map to section names (e.g., { "Hero": Hero }) where Hero is a Svelte component
	// body: an array of objects that contain a {section, content} obj
	let { components = {}, content = [] } = $props();
</script>

{#each content as { type, value }}
	{@const C = components[type]}
	{@const isString = typeof value === "string"}
	{#if C}
		<C {...value} />
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
