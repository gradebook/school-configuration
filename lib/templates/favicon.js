const renderFavicon = color => `
<svg width="192" height="192" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<style>
		path { fill: ${color}; }
		polyline { stroke: ${color};
				stroke-width: 4;
				stroke-linecap: round;
		}

		@media (prefers-color-scheme: dark) {
			path { fill: #FFFFFF; }
			polyline { stroke: #FFFFFF; }
		}
	</style>

	<g fill="none" fill-rule="evenodd">
		<!-- cover -->
		<path d="M97 16 L167 44 L96 83 L23 53 z" />
		<polyline points="25 54 25 81 96 111 167 71" />
		<polyline points="25 93 25 113 96 143 167 103" />
		<polyline points="25 125 25 145 96 175 167 135" />
	</g>
</svg>`.replaceAll(/\n|\t+/g, '');

export default renderFavicon;
