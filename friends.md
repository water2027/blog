---
# https://vitepress.dev/reference/default-theme-home-page
layout: doc
---

<script setup>
import { ref } from "vue";

const friends = ref([
    {
        id:1,
        name:'Jerry',
        link: 'https://jerrylingj.top',
        description: 'qwq',
        avatar: 'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/uploads/1729130790695993497_头像1.jpg',
    },
    {
        id:2,
        name:'math-zhuxy',
        link:'https://math-zhuxy.github.io',
        description: 'hello~',
        avatar: 'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/uploads/1728918801765528128_%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20241014222719.jpg'
    },
    {
        id:3,
        name:'thinkerhui',
        link:'https://thinkerhui.site',
        description:'MBTI是ENFP。热爱AI等前沿技术，喜欢倾听用户反馈，不断迭代升级项目。掌握初级Web全栈开发，擅长前端开发。有人工智能相关科研经历。',
        avatar:'https://sse-market-source-1320172928.cos.ap-guangzhou.myqcloud.com/src/images/resized/1700193342453573764_mmexport1699801185607_[B@32573fa.jpg'
    }
])

</script>

<div id="root">
    <div v-for="friend in friends" :key="friend.id" class="friend">
        <img :src="friend.avatar" />
        <div>
            <span>{{ friend.name }}</span>
            <p>{{ friend.description }}</p>
            <a :href="friend.link" target="_blank">让我看看</a>
        </div>
    </div>
</div>

<style scope>
#root{
    display:grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap:30px;
}
.friend{
    height:300px;
    padding:10px;
    display:flex;
    flex-direction:row;
    background-color:var(--color-card-background);;
    box-shadow: var(--color-box-shadow) 0px 3px 8px;
}
.friend:hover{
    transform:scale(1.1);
    box-shadow: var(--color-box-shadow-hover) 0px 5px 10px;
}
.friend img{
    width:128px;
    height:128px;
    border-radius:50%;
    margin-right:20px;
}
.friend a:hover{
    background-color:var(--color-background-tag);
}
@media (max-width: 768px) {
    #root {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
    }
    .friend {
        margin-top:20px;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
    .friend img {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>
