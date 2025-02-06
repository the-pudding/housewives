export const current = $state({
	section: 0,
	slide: 0,
	subslide: 0,
	slideInSection: 0
});

export const mediaPlaying = $state({
	id: undefined
});

export const videoSettings = $state({
	ccOn: false,
	soundOn: true
});
