<template>
	<Giscus
        v-if="showComment&&!isMain"
		repo="water2027/blog"
		repo-id="R_kgDOM-m5SQ"
        category="Announcements"
        category-id="DIC_kwDOM-m5Sc4CjZ5i"
		mapping="pathname"
		strict="0"
		reactions-enabled="1"
		emit-metadata="0"
		input-position="top"
		:theme="theme"
		lang="zh-CN"
		loading="lazy"
		crossorigin="anonymous"
	/>
</template>
<script setup>
import Giscus from '@giscus/vue';

import { ref,computed, watch, nextTick } from 'vue';
import { useData, useRoute } from "vitepress";

const { isDark } = useData();
const theme = computed(() => (isDark.value ? "noborder_dark" : "noborder_light"));
const route = useRoute();

const isMain = computed(()=>route.path==='/')

const showComment = ref(true);
watch(
	() => route.path,
	() => {
		showComment.value = false;
		nextTick(() => {
			showComment.value = true;
		});
	},
	{
		immediate: true,
	}
);

defineExpose({
    name: 'BlogComment'
})
</script>
