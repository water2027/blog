import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/**/*.md', {
	transform(raw) {
		return raw
			.map(({ url, frontmatter, excerpt }) => ({
				title: frontmatter.title,
				url,
				excerpt,
				date: formatDate(frontmatter.date),
				tags: frontmatter.tags,
			}))
			.sort((a, b) => b.date.time - a.date.time);
	},
});

function formatDate(raw) {
	const date = new Date(raw);
	date.setUTCHours(12);
	return {
		time: +date,
		string: date.toLocaleDateString('zh-Hans', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}),
		year: date.toLocaleDateString('zh-Hans', {
			year: 'numeric',
		}),
		monthDay: date.toLocaleDateString('zh-Hans', {
			month: '2-digit',
			day: '2-digit',
		}),
	};
}
