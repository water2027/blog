export function createSideBar() {
	return {
		'/notes/': [
            {
                text: 'PWA学习笔记',
                collapsed: false,
                items: [
                    { text: '01 PWA简介', link: '/notes/PWA学习笔记/01PWA简介' },
                ]
            }
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
	};
}
