export function createSideBar() {
	return {
		'/notes/': [
            {
                text: 'PWA',
                collapsed: false,
                items: [
                    { text: '00 PWA简介', link: '/notes/PWA/00PWA简介' },
                    { text: '01 配置manifest', link: '/notes/PWA/01配置manifest' },
                    { text: '02 实现离线访问', link: '/notes/PWA/02离线访问' },
                ]
            }
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
	};
}
