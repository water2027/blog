import { defineConfig } from 'vitepress';
import { withPwa } from '@vite-pwa/vitepress';

import { createRssFileZH } from './theme/utils/rss';
import { createSideBar } from './theme/utils/createSideBar';

// https://vitepress.dev/reference/site-config
export default withPwa(
	defineConfig({
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
				{ text: '笔记', link: '/notes/', activeMatch: '/notes/' },
				{ text: '关于', link: '/about', activeMatch: '/about' },
				{ text: '友链', link: '/friends', activeMatch: '/friends' },
			],
			docFooter: {
				prev: '上一篇',
				next: '下一篇',
			},
			outlineTitle: '当前页面',
			lastUpdatedText: '最近更新时间',
			returnToTopLabel: '回到顶部',
			sidebarMenuLabel: '目录',
			darkModeSwitchLabel: '深色模式',
			sidebar: createSideBar(),
			outline: [2, 4],
			externalLinkIcon: true,

			socialLinks: [
				{
					icon: 'github',
					link: 'https://github.com/water2027',
				},
				{
					icon: {
						svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
					},
					link: '/feed.xml',
				},
			],
		},
		theme:{
			custom:true
		},
		markdown: {
			math: true,
		},
		pwa: {
			outDir: '.vitepress/dist',
			registerType: 'autoUpdate',
			includeManifestIcons: false,
			srcDir: 'public',
			filename: 'sw.js',
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
			injectManifest: {
				injectionPoint: undefined,
			},
		},
	})
);
