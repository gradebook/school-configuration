// @ts-check

/**
 * @param {import('../parsers/0.1.js').School} config
 */
function renderSchool(config) {
	// NOTE: The name is not escaped, since we own the data we're not concerned about it at this time.
	const primary = config.theme.primary.replace('#', '');
	return `
<a href="editor.html?primary=${primary}">
	<div class="school transition hover:scale" style="background-color:#${primary}">${config.name}</div>
</a>
`.replaceAll(/[\t\n]/g, '');
}

/**
 * @param {string} template
 * @param {Awaited<ReturnType<import('../compile-schools.js')['default']>>} schools
 */
export function renderIndex(template, schools) {
	const schoolReplacementText = '<!--schools-->';
	const schoolReplacement = Array.from(schools.values())
		.map(school => renderSchool(school))
		.join('\n');

	if (!template.includes(schoolReplacementText)) {
		throw new Error(`Missing: ${schoolReplacementText}`);
	}

	return template
		.replace(schoolReplacementText, schoolReplacement);
}
