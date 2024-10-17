import{_ as a,c as n,a3 as p,o as e}from"./chunks/framework.CigXQ8BC.js";const u=JSON.parse('{"title":"使用push API 推送","description":"","frontmatter":{},"headers":[],"relativePath":"notes/PWA/03推送API.md","filePath":"notes/PWA/03推送API.md","lastUpdated":null}'),l={name:"notes/PWA/03推送API.md"};function t(i,s,c,o,r,d){return e(),n("div",null,s[0]||(s[0]=[p(`<h1 id="使用push-api-推送" tabindex="-1">使用push API 推送 <a class="header-anchor" href="#使用push-api-推送" aria-label="Permalink to &quot;使用push API 推送&quot;">​</a></h1><h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>一般情况下我们主动向客户端发送信息可能需要先建立一个长连接或者是轮询，但是这个push API是不需要的，它使用了一个第三方服务(Push Service)，这个一般由浏览器提供。整个流程大概是这样的：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>浏览器          Push Service            your server</span></span>
<span class="line"><span>  |                 |                       |</span></span>
<span class="line"><span>  |    订阅         |                       |</span></span>
<span class="line"><span>  |-----&gt;------------|                      |</span></span>
<span class="line"><span>  |                 |                       |</span></span>
<span class="line"><span>  |     监听        |                       |</span></span>
<span class="line"><span>  |----&lt;------------|                       |</span></span>
<span class="line"><span>  |                 |                       |</span></span>
<span class="line"><span>  |                 |                       |</span></span>
<span class="line"><span>  |                 |       推送信息         |</span></span>
<span class="line"><span>  |                 |-----&lt;-----------------|</span></span>
<span class="line"><span>  |                 |                       |</span></span>
<span class="line"><span>  |  推送信息        |                      |</span></span>
<span class="line"><span>  |----&lt;------------|                       |</span></span>
<span class="line"><span>  |                 |                       |</span></span></code></pre></div>`,4)]))}const P=a(l,[["render",t]]);export{u as __pageData,P as default};
