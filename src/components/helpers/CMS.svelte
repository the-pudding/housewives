<script>
	let { components = {}, svgs = {}, content = [], slideI } = $props();
</script>

{#each content as { type, value }}
	{@const C = components[type]}
	{@const isString = typeof value === "string"}
	{#if C}
		<C {...value} {slideI} />
	{:else if type === "text"}
		<p>{@html value}</p>
	{:else if type === "svg"}
		{@html svgs[value.src]}
	{:else if type === "img"}
		<div class="img-wrapper">
			<img src={value.src} alt={value.alt || ""} />
		</div>
	{:else if isString}
		<svelte:element this={type}>
			{@html value}
		</svelte:element>
	{:else}
		<svelte:element this={type} {...value}></svelte:element>
	{/if}
{/each}

<style>
	.img-wrapper {
		overflow: hidden;
		max-height: 400px;
		min-height: 200px;
	}

	img {
		height: 100%;
		object-fit: cover;
	}
</style>
