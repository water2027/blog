import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import path from 'path';
import { createContentLoader } from 'vitepress';

const createRssFileZH = async (config) => {
	const feed = new Feed({
		title: 'water',
		description:
			'',
		id: hostname,
		link: hostname,
		language: 'zh-Hans',
		image: '',
		favicon: ``,
		copyright: '',
	});

	const posts = await createContentLoader('posts/**/*.md', {
		render: true,
	}).load();

	posts.sort((a, b) =>
		Number(+new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
	);

	for (const { url, excerpt, html, frontmatter } of posts) {
		// 仅保留最近 5 篇文章
		if (feed.items.length >= 5) {
			break;
		}

		feed.addItem({
			title: frontmatter.title,
			id: `${hostname}${url}`,
			link: `${hostname}${url}`,
			description: excerpt,
			content: html,
			author: [
				{
					name: 'water',
					email: 'qstxdy@gmail.com',
					link: 'https://blog.watering.top',
				},
			],
			date: frontmatter.date,
		});
	}

	writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2(), 'utf-8');
};

export { createRssFileZH };