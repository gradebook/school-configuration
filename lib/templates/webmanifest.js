const renderWebManifest = (name, color) => `
{
	"name": "Gradebook",
	"short_name": "Gradebook",
	"description": "Gradebook is the only student-built, student-centered Grade Tracking app designed to help you take control of your grades.",
	"categories": ["education", "productivity"],
	"lang": "en",
	"theme_color": "${color}",
	"background_color": "${color}",
	"display": "standalone",
	"orientation": "portrait",
	"start_url": "https://${name}.gradebook.app/my/dashboard?ref=app",
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
			"form_factor": "narrow",
			"label": "See how you're doing across all your courses - all in one place"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-course-page.webp",
			"sizes": "720x1280",
			"type": "image/webp",
			"form_factor": "narrow",
			"label": "Understand what you need to get to earn a letter grade"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-gpa.webp",
			"sizes": "720x1280",
			"type": "image/webp",
			"form_factor": "narrow",
			"label": "Harness tailored insights and analysis to maximize your GPA"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-course-list-wide.webp",
			"sizes": "1280x720",
			"type": "image/webp",
			"form_factor": "wide",
			"label": "See how you're doing across all your courses - all in one place"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-course-page-wide.webp",
			"sizes": "1280x720",
			"type": "image/webp",
			"form_factor": "wide",
			"label": "Understand what you need to get to earn a letter grade"
		},
		{
			"src": "https://static.gradebook.app/sYbR9JXKTI/screenshot-gpa-wide.webp",
			"sizes": "1280x720",
			"type": "image/webp",
			"form_factor": "wide",
			"label": "Harness tailored insights and analysis to maximize your GPA"
		}
	]
}`.replaceAll(/\n|\t+/g, '');

export default renderWebManifest;
