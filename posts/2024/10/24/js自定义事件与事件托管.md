---
title: js自定义事件与事件托管
desc: 在写vue3的时候遇到了大量组件需要传递类似/相同的函数，最后选择了自定义事件+事件托管解决
tags: 
    - 前端
date: 2024-10-24
---    
## js自定义事件与事件托管
### 概要
在写vue3页面的时候遇到了大量组件需要传递类似/相同的函数，最后选择了自定义事件+事件托管解决
### 前言   
在封装组件的时候遇到了一个问题，大致如下：
```vue
<template>
  <div
    class="root"
    @click="clickHandler"
  >
    <detail-card
      v-if="isPostLoaded"
      :post="post"
      :comment-handler="commentHandler"
    />
    <div v-else>
      loading...
    </div>
    <div class="comment">
      <h2>评论</h2>
      <div class="commentList">
        <div
          v-for="comment in comments"
          :key="comment.PcommentID"
          class="comment"
        >	
          <comment-card
            :comment="comment"
            :comment-handler="postCommentHandler"
            :delete-handler="deleteHandler"
            :show-comment="postCommentID===comment.PcommentID"
          >
          </comment-card>
          <div
            v-if="postCommentID===comment.PcommentID"
            class="subCommentList"
          >
            <c-comment-card
              v-for="subComment in comment.SubComments"
              :key="subComment.ccommentID"
              :p-comment-id="comment.PcommentID"
              :comment="subComment"
              :comment-handler="postCommentHandler"
              :delete-handler="deleteHandler"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```
其中这些handler基本上是这样的：
```js
const commentHandler = async (callback)=>{
	try{
		const res = await callback();
		if(res){
			showMsg('成功')
			await getCommentList();
		}else{
			showMsg('失败')
		}
	}catch(e){
		console.error(e)
		showMsg('失败')
	}
}
```
重复代码可以说相当的多，而且props传递太多了，每个组件都传递这么个相同或者相似的函数。当时被说移动端这个页面性能差，就想着优化一下，最后决定使用事件托管。     
### 自定义事件   
事件托管需要在父元素绑定某个事件，但是好像没有默认事件可以在这里使用。这个时候就需要自定义事件了。    
vue和原生js相差不多，vue可以直接v-on绑定事件，原生多个addEventListener.
```js
// 或者直接在标签 @comment-handle="函数"
element.addEventListener('commentHandle',(event)=>{
    // 做点什么
})
function example(){
    // 在某个地方触发事件
    const event = new Event('commentHandle')
    element.dispatchEvent(event)
}
```
如果要向事件对象添加更多数据，可以用`CustomEvent`，detail属性可以传递自定义数据。
```js
const event = new CustomEvent(
    'commentHandle',
    {
        bubbles: true,//允许冒泡，用于事件托管
        detail:"www" //一些数据
    }
)
element.dispatchEvent(event) // 触发事件
```
这样的话绑定的事件可以写成
```js
element.addEventListener('commentHandle',(event)=>{
    console.log(event.detail) // "www"
})
```
### 简化代码
有了这些东西，那我的代码就可以简化很多了。
```vue
<!-- PostDetailView.vue -->
<template>
  <div
    class="root"
    @click="clickHandler"
    @comment-handle="commentHandler"
  >
    <detail-card
      v-if="isPostLoaded"
      :post="post"
    />
    <div v-else>
      loading...
    </div>
    <div class="comment">
      <h2>评论</h2>
      <div class="commentList">
        <!-- 使用id-评论数作为key使每次评论重新渲染当前评论 -->
        <div
          v-for="comment in comments"
          :key="`${comment.PcommentID}-${comment.SubComments.length}`"
          class="comment"
        >
          <comment-card
            :comment="comment"
            :show-comment="postCommentID === comment.PcommentID"
          >
          </comment-card>
          <div
            v-show="postCommentID === comment.PcommentID"
            class="subCommentList"
          >
            <c-comment-card
              v-for="subComment in comment.SubComments"
              :key="subComment.ccommentID"
              :p-comment-id="comment.PcommentID"
              :comment="subComment"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const commentHandler = async (event)=>{
    const func = event.detail;
    try{
        const res = await func(); //里面有一些参数
    }catch(e){
        console.error(e);
    }
}
</script>
```
```vue
<!-- 子组件 -->
<script setup> 
const handler = (type)=>{
	let event;
	switch(type){
		case 'delete':
			event = new CustomEvent('comment-handle',{
				detail:deleteFunc,
				bubbles:true
			})
			break;
		case 'comment':
			event = new CustomEvent('comment-handle',{
				detail:sendCommentFunc,
				bubbles:true
			})
			break;
		default:
			break;
	}
	root.value.dispatchEvent(event)
}
</script>
```
这样就避免了大量props的传递，节省了一些性能吧。       