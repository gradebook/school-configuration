#! /bin/sh

set -e

zip -r site.zip dist

curl -H "Content-Type: application/zip" \
	-H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
	--data-binary "@site.zip" \
	https://api.netlify.com/api/v1/sites/$NETLIFY_SITE_ID/deploys
