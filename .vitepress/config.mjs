import { defineConfig } from 'vitepress';
import { VitePWA } from 'vite-plugin-pwa';

import { createRssFileZH } from './theme/utils/rss';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "water's blog",
	description: 'blog',
	lastUpdated: true,
	cleanUrls: true,
	ignoreDeadLinks: true,
	buildEnd: (config) => {
		createRssFileZH(config);
	},
	themeConfig: {
		search: {
			provider: 'local',
		},
		// https://vitepress.dev/reference/default-theme-config
		appearance: true,
		nav: [
			{ text: '博客', link: '/' },
			{ text: '归档', link: '/archive', activeMatch: '/archive' },
			//{ text: '笔记', link: '/notes/', activeMatch: '/notes/' },
			{ text: '关于', link: '/about', activeMatch: '/about' },
		],
		outlineTitle: '当前页面',
		lastUpdatedText: '最近更新时间',
		returnToTopLabel: '回到顶部',
		sidebarMenuLabel: '目录',
		darkModeSwitchLabel: '深色模式',
		// sidebar: createSideBarZH(),
		outline: [2, 4],
		externalLinkIcon: true,

		socialLinks: [{ icon: 'github', link: 'https://github.com/water2027' }],
	},
	markdown: {
		math: true,
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
					background_color: '#ffffff',
					display: 'standalone',
					start_url: '/',
					icons: [
						{
							src: 'icon-192x192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: 'icon-512x512.png',
							sizes: '512x512',
							type: 'image/png',
						},
					],
				},
				workbox: {
					globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
				},
			}),
		],
	},
});
