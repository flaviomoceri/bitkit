import Color from 'color';

const white = '#FFFFFF';

export const lighten = (color?: string): string => {
	const parsed = Color(color);

	let lightened = parsed.hsl().whiten(0.5).rgb().string();

	// If the color is white, adjust opacity instead
	if (parsed.hex() === white) {
		lightened = parsed.hsl().opaquer(1).rgb().string();
	}

	return lightened;
};
