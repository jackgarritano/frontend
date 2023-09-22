/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			maxWidth: {
				'card': '800px',
			},
			minWidth: {
				'card': '600px',
			},
			width: {
				'card': '50%',
			},
			maxHeight: {
				'card': '800px',
			},
			minHeight: {
				'card': '600px',
			},
			height: {
				'card': '50%',
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
	important: '#root',
  }