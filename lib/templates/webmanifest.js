const renderWebManifest = (name, color) => `
{
	"name": "Gradebook",
	"short_name": "Gradebook",
	"description": "The only free app built by students to simplify grade tracking. Let's all get a little better at keeping track of our grades, together.",
	"categories": ["education", "productivity"],
	"theme_color": "${color}",
	"background_color": "${color}",
	"display": "standalone",
	"orientation": "portrait",
	"start_url": "https://${name}.gradebook.app/my/dashboard?utm_source=homescreen",
	"scope": "https://${name}.gradebook.app/",
	"id": "/",
	"icons": [
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/pwa-icon.svg",
			"sizes": "192x192",
			"type": "image/svg+xml",
			"purpose": "any"
		},
		{
			"src": "https://schools.gradebook.app/api/v1/${name}/icon-maskable.svg",
			"sizes": "192x192",
			"type": "image/svg+xml",
			"purpose": "maskable"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-192.webp",
			"sizes": "192x192",
			"type": "image/webp"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-256.webp",
			"sizes": "256x256",
			"type": "image/webp"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-384.webp",
			"sizes": "384x384",
			"type": "image/webp"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-512.webp",
			"sizes": "512x512",
			"type": "image/webp"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-1024.webp",
			"sizes": "1024x1024",
			"type": "image/webp"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/android-chrome-512.png",
			"sizes": "512x512",
			"type": "image/png"
		}
	],
	"screenshots": [
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-course-list.webp",
			"sizes": "720x1280",
			"type": "image/webp",
			"platform": "narrow",
			"label": "See how you're doing across all your courses - all in one place"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-course-page.webp",
			"sizes": "720x1280",
			"type": "image/webp",
			"platform": "narrow",
			"label": "Understand what you need to get to earn a letter grade"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-gpa.webp",
			"sizes": "720x1280",
			"type": "image/webp",
			"platform": "narrow",
			"label": "Harness tailored insights and analysis to maximize your GPA"
		}
	]
}`.replace(/\n|\t+/g, '');

export default renderWebManifest;
