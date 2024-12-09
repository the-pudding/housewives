<script>
	// import ChevronLeft from "lucide-svelte/icons/chevron-left";
	// import ChevronRight from "lucide-svelte/icons/chevron-right";

	let {
		debug = false,
		enableKeyboard = false,
		full = false,
		showArrows = false,
		disable = [],
		directions = ["left", "right"],
		size = "64px",
		arrowSize = "48px",
		arrowStroke = "#000",
		arrowStrokeWidth = "2",
		arrowPosition = "center",
		onTap
	} = $props();

	let innerHeight = $state();

	let getW = $derived((dir) =>
		Array.isArray(size) ? size[directions.indexOf(dir)] : full ? "100%" : size
	);
	let getH = $derived((dir) =>
		["up", "down"].includes(dir) ? size : full ? "100%" : size
	);
	let visibleArrows = $derived(
		directions.filter((d) =>
			typeof showArrows === "boolean" ? showArrows : showArrows.includes(d)
		)
	);

	const onKeyDown = (e) => {
		const dir = e.key.replace("Arrow", "").toLowerCase();
		const hasDir = directions.includes(dir);
		if (enableKeyboard && hasDir) {
			e.preventDefault();
			onTap(dir);
		}
	};
</script>

<svelte:window onkeydown={onKeyDown} bind:innerHeight />

<section class:debug style="height: {innerHeight}px;">
	{#each directions as dir}
		<button
			onclick={onTap(dir)}
			style="width: {getW(dir)}; height: {getH(dir)};"
			aria-label={dir}
			class="{dir} {arrowPosition}"
			class:full
			disabled={disable.includes(dir)}
		>
			{#if visibleArrows.includes(dir)}
				<span style="font-size: {arrowSize};">
					{#if dir === "left"}
						<!-- <ChevronLeft
							aria-hidden="true"
							color={arrowStroke}
							strokeWidth={arrowStrokeWidth}
						/> -->
						left arrow
					{:else if dir === "right"}
						<!-- <ChevronRight
							aria-hidden="true"
							color={arrowStroke}
							strokeWidth={arrowStrokeWidth}
						/> -->
						right arrow
					{/if}
				</span>
			{/if}
		</button>
	{/each}
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: var(--z-overlay);
		pointer-events: none;
	}

	button {
		position: absolute;
		cursor: pointer;
		background: none;
		border-radius: 0;
		outline: none;
		border: none;
		box-shadow: none;
		pointer-events: auto;
		display: flex;
	}

	button:disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}

	button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	.left {
		left: 0;
		top: 0;
		/* text-align: left; */
	}

	.right {
		right: 0;
		top: 0;
		/* text-align: right; */
	}

	.left.start,
	.right.start {
		align-items: flex-start;
	}

	.left.center,
	.right.center {
		top: 50%;
		transform: translateY(-50%);
	}

	.left.end,
	.right.end {
		bottom: 0;
		top: auto;
	}

	.up {
		top: 0;
		left: 0;
		/* text-align: center; */
	}

	.down {
		bottom: 0;
		left: 0;
		/* text-align: center; */
	}

	.up.center,
	.down.center {
		left: 50%;
		transform: translateX(-50%);
	}

	.up.end,
	.down.end {
		right: 0;
		left: auto;
	}

	/* full positions */
	.full.left.start,
	.full.right.start {
		align-items: flex-start;
	}

	.full.left.center,
	.full.right.center {
		align-items: center;
	}

	.full.left.end,
	.full.right.end {
		align-items: flex-end;
	}

	.full.up.start,
	.full.down.start {
		justify-content: flex-start;
	}

	.full.up.center,
	.full.down.center {
		justify-content: center;
	}

	.full.up.end,
	.full.down-end {
		justify-content: flex-end;
	}

	span {
		display: inline-block;
		line-height: 1;
		opacity: 0.5;
	}

	.debug .left {
		background: red;
		opacity: 0.5;
	}

	.debug .right {
		background: green;
		opacity: 0.5;
	}

	.debug .up {
		background: orange;
		opacity: 0.5;
	}

	.debug .down {
		background: orange;
		opacity: 0.5;
	}
</style>
