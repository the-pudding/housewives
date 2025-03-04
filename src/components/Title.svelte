<script>
	import Faces from "$components/Title.Faces.svelte";
	import Mute from "$components/Mute.svelte";
	import { current } from "$runes/misc.svelte.js";
</script>

<div class="title">
	<div class="byline">
		By <a
			href="https://pudding.cool/author/michelle-pera-mcghee"
			target="_blank">Michelle Pera-McGhee</a
		>
	</div>

	<Faces />

	<div class="text visible" class:fade={current.slide === 1}>
		<strong
			>This is a story about apologies{current.slide === 1
				? "..."
				: "."}</strong
		>
	</div>

	<div class="tap" class:visible={current.slide === 0}>Tap anywhere</div>

	<div class="text" class:visible={current.slide === 1}>
		<strong
			>…and the unexpected wisdom of<br />
			<i>The Real Housewives of Salt Lake City</i>.</strong
		>
	</div>
	<div class="text sound" class:visible={current.slide === 1}>
		Also it contains sound. <Mute positionStatic={true} />
	</div>
	<div class="tap" class:visible={current.slide === 1}>
		Tap the left side to go back, right to go forward
	</div>
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

	div {
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
		text-transform: uppercase;
		font-size: var(--16px);
		opacity: 0;
	}

	.byline {
		position: absolute;
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
</style>
