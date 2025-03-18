<script>
	import Faces from "$components/Title.Faces.svelte";
	import Mute from "$components/Mute.svelte";
	import Loading from "$components/Loading.svelte";
	import { current, loadState } from "$runes/misc.svelte.js";
	import pointerSvg from "$svg/pointer.svg";
	import { fade } from "svelte/transition";

	let { slide } = $props();
</script>

<div class="title">
	<div class="byline">
		By <a
			href="https://pudding.cool/author/michelle-pera-mcghee"
			target="_blank">Michelle Pera-McGhee</a
		>
	</div>

	<Faces slide={+slide} />

	<div class="text visible" class:fade={current.slide === 1}>
		<strong
			>This is a story about apologies{current.slide === 1
				? "..."
				: "."}</strong
		>
	</div>

	{#if loadState.ready}
		<div class="tap" class:visible={current.slide === 0} transition:fade>
			Tap anywhere

			<span class="pointer">{@html pointerSvg}</span>
		</div>
	{:else}
		<div class="loading">
			<Loading />
		</div>
	{/if}

	<div class="text" class:visible={current.slide === 1}>
		<strong
			>…and the unexpected wisdom of<br />
			<i>The Real Housewives of Salt Lake City</i>.</strong
		>
	</div>
	<div class="text sound" class:visible={current.slide === 1}>
		Also it contains sound. <Mute
			positionStatic={true}
			visible={current.slide === 1}
		/>
	</div>
	<div class="tap" class:visible={current.slide === 1}>
		Tap the left side to go back, right to go forward
		<br />
		<span class="use-keyboard"
			>(or use the keyboard
			<span class="key">{"<"}</span>
			<span class="key">{">"}</span>
			)</span
		>
	</div>

	<div class="spacer" />
</div>

<style>
	.title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		height: 100%;
		width: 100%;
		padding: 0;
	}

	.key {
		display: inline-block;
		padding: 2px 6px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 2px 1px rgba(137, 77, 153, 0.4);
		background-color: #f9f9f9;
		text-align: center;
		font-weight: bold;
	}

	.key:last-of-type {
		background: var(--color-purple-200);
	}

	div:not(.loading):not(.tap) {
		transition: opacity calc(var(--1s) * 0.5);
		padding: 0 1rem;
	}

	.text {
		font-size: var(--28px);
		text-align: center;
		opacity: 0;
		max-width: 48rem;
	}

	.text:nth-child(5) {
		margin-top: -4rem;
	}

	.logo {
		display: flex;
		width: 14rem;
		transform: rotate(-4deg);
		transition: transform calc(var(--1s) * 0.25);
	}

	.logo:hover {
		transform: rotate(-2deg) scale(1.05);
	}

	.presents {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: -12px;
		font-size: var(--14px);
		text-transform: uppercase;
		font-weight: bold;
	}

	.tap {
		background: var(--color-purple-100);
		padding: 1rem;
		margin: 0 1rem;
		text-transform: uppercase;
		font-size: var(--16px);
		opacity: 0;
		text-align: center;
		position: relative;
	}

	.tap span {
		text-transform: none;
		font-size: var(--14px);
	}

	.loading {
		color: var(--color-purple-400);
	}

	.byline {
		position: fixed;
		bottom: 1.5rem;
		left: 1.5rem;
		font-size: var(--14px);
		font-weight: bold;
		padding: 0;
	}

	.sound {
		font-size: var(--16px);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.visible {
		opacity: 1;
	}

	.fade {
		opacity: 0.3;
	}

	.pointer {
		position: absolute;
		height: 40px;
		width: 40px;
		top: 100%;
		left: 100%;
		transform: translate(-50%, -50%);
	}

	.spacer {
		width: 100%;
		height: 200px;
	}

	.use-keyboard {
		display: none;
	}

	@media ((hover: hover) and (pointer: fine)) {
		.use-keyboard {
			display: block;
		}
	}

	@media (max-width: 600px) {
		.text {
			font-size: var(--18px);
		}

		.sound {
			font-size: var(--14px);
		}

		.tap {
			padding: 0.75rem;
		}
	}
</style>
