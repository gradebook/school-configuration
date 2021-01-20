const renderWebManifest = (name, color) => `
{
	"name": "Gradebook",
	"short_name": "Gradebook",
	"theme_color": "${color}",
	"background_color": "${color}",
	"display": "standalone",
	"orientation": "portrait",
	"start_url": "https://${name}.gradebook.app/my/dashboard",
	"scope": "https://${name}.gradebook.app/",
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
	]
}`.replace(/\n|\t+/g, '');

export default renderWebManifest;
