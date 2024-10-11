---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
editLink: false
lastUpdated: false
isNoComment: true
isNoBackBtn: true
---

<template v-for="[year, postGroup] in postGroups" :key="year">
  <h2 :id="year" class="post-title">
    <a
      class="header-anchor"
      :href="`#${year}`"
      :aria-label="`Permalink to &quot;${year}&quot;`"
      >​</a
    >
    <div class="post-year hollow-text">{{ year }}</div>
  </h2>
  <div class="post-container" v-for="post in postGroup" :key="post.url">
    <a :href="post.url" class="title">{{ post.title }}</a>
    <span class="post-date">
      {{ post.date.monthDay }}
    </span>
  </div> 
</template>


<script setup>
import { ref, computed } from "vue";

import { data as posts } from "./.vitepress/theme/posts.data.mjs";

const postGroups = computed(() => {
  const groups = new Map();
  posts.forEach((post) => {
    const year = post.date.year;
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)?.push(post);
  });
  return groups;
});

console.log('postGroups', postGroups.value);
</script>
<style scoped>

.mr-2 {
	margin-right: 2px;
}

.post-title {
	margin-bottom: 6px;
	border-top: 0px;
	position: relative;
	top: 0;
	left: 0;

	.post-year {
		position: absolute;
		top: -6px;
		left: -10px;

		z-index: -1;
		opacity: .12;
		font-size: 86px;
		font-weight: 900;
	}
}

.post-container {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;

    .title{
    color:var(--color-title);
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
    opacity: .6;
  }
}

.hollow-text {
  
  /* 设置文本颜色为透明 */
  color: var(--vp-c-bg);
  
	-webkit-text-stroke: 1px var(--vp-c-text-1);
}
</style>