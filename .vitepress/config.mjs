import { defineConfig } from 'vitepress';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "water's blog",
	description: 'blog',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
		],

		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/vuejs/vitepress' },
		],
	},
	vite: {
		plugins: [
			VitePWA({
				registerType: 'autoUpdate',
				manifest: {
					name: `water's blog`,
					short_name: 'blog',
					description: '日志',
					theme_color: '#ffffff',
					icons: [
						{
							src: 'icon-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
					],
				},
			}),
		],
	},
});
