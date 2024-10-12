---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

<template v-for="post in curPosts" :key="post.url">
  <h2 :id="post.title" class="post-title">
    <a :href="post.url" class="title">{{ post.title }}</a>
    <a
      class="header-anchor title"
      :href="`#${post.title}`"
      :aria-label="`Permalink to &quot;${post.title}&quot;`"
      >​</a
    >
    <div class="post-date hollow-text">{{ post.date.string }}</div>
  </h2>
  <span
    v-for="tag in post.tags"
    class="tag"
    >{{ tag }}</span
  >
  <p v-if="post.desc">{{ post.desc }}</p>
</template>

<div class="pagination-container">
  <WPagination
    v-model="current"
    v-model:pageSize="pageSize"
    :total="total"
    size="small"
    :showPageSize="false"
    @current-change="onCurrentChange"
  />
</div>

<script setup>
import { ref, computed } from "vue";

import { data as posts } from "./.vitepress/theme/posts.data.mjs";
import WPagination from "./.vitepress/theme/components/WPagination.vue"

const search = window.location.search.slice(1);
const searchParams = new URLSearchParams(search);
const page = searchParams.get("page") || 1;

const current = ref(+page);
const pageSize = ref(5);
const total = ref(posts.length);

const curPosts = computed(() => {
	return posts.slice(
		(current.value - 1) * pageSize.value,
		current.value * pageSize.value
	);
});

const onCurrentChange = (index) => {

	const url = new URL(window.location);
	url.searchParams.set("page", index.toString());
	window.history.replaceState({}, "", url);

	window.scrollTo({
		top: 0,
	});
};
</script>

<style scoped>
.pagination-container {
	margin-top: 60px;

	:deep(li) {
		margin-top: 0px;
	}
}

.tag {
  margin-left:2px;
	margin-right: 2px;
  margin-top:2px;
  padding:5px;  
  border:var(--color-border-tag) 2px solid;
  border-radius:10px;
  background-color:var(--color-background-tag);
}

.post-title {
	margin-bottom:6px;
	border-top: 0px;
	position: relative;
	top: 0;
	left: 0;

  .title{
    color:var(--color-title);
    font-size:26px;
    background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
    background-repeat: no-repeat;
    background-size: 0 2px;
    background-position: right bottom;
    transition: background-size 0.5s ease-in, color 0.5s ease-in;
  }
  .title:hover{
    background-size: 100% 2px;
    background-position: left bottom;
    color:var(--color-hover-title);
  }

	.post-date {
		position: absolute;
		top: -6px;
		left: -10px;

		z-index: -1;
		opacity: .12;
		font-size: 66px;
		font-weight: 900;
	}
}

.hollow-text {
  
  /* 设置文本颜色为透明 */
  color: var(--vp-c-bg);
  
	-webkit-text-stroke: 1px var(--vp-c-text-1);
}

.pagination-container{
  height:100px;
  width:100%;
}
WPagination{
  width:100%;
  height:100%;
}
</style>
