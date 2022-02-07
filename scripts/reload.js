#! /usr/bin/env node

// @ts-check
import process from 'node:process';
import {sendPayload} from '@gradebook/actions-hook';

async function doTheWork() {
	try {
		const REQUIRED_KEYS = ['GITHUB_REF', 'GITHUB_REPOSITORY', 'GITHUB_SHA'];

		for (const key of REQUIRED_KEYS) {
			if (!(key in process.env)) {
				console.warn(`Missing key: ${key}. Not running post-deploy hook`);
				process.exit(0);
			}
		}

		console.log('Sending post-deploy notification to webhook');

		await sendPayload({
			payload: '{}',
			onlyIf: {
				isPush: true,
				branch: 'master',
			},
		});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

doTheWork();
