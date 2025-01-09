// eslint-disable-next-line @typescript-eslint/no-require-imports
const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
		fontFamily: {
			display: ['Comfortaa'],
			body: ['Comfortaa'],
		},
	},
	darkMode: 'class',
	plugins: [nextui()],
};
