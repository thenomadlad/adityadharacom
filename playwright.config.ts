import { PlaywrightTestConfig, defineConfig } from '@playwright/test';

const config: PlaywrightTestConfig = defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173
	},
	testDir: 'tests'
});

export default config;
