# 配置manifest 
添加到主屏幕/桌面应该是最好配置的，只需简单配置一下manifest.json就可以完成，manifest.json大致如下：
```json
{
    "name": "全名",
    "short_name": "简称",
    "description": "描述",
    "scope": "/",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait-primary",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [
      {
        "src": "icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
```
## scope
`scope`是作用域，如果是在网站根目录部署的话是`/`，如果不在根目录的话，比如要在`/new/`里放我的网站，那应该是`/new/`   
## display 
display控制应用的显示模式，有四个值:fullscreen,standalone,minimal-ui和browser.   
- fullscreen 全屏显示，会将可能占满屏幕。手机最上面的状态栏会没掉，只有下滑才会出现，如果下面是虚拟按键的话，也会没。   
- standalone 独立应用模式，比全屏显示多一个状态栏和虚拟按键（如果有）。   
- minimal-ui 比standalone多一个地址栏。   
- browser 跟浏览器差不多。    
大概呈现逐渐从app到浏览器的样子吧。   
## orientation
orientation控制浏览器的方向（横向/竖向），还有一些值可以锁定（禁止旋转）之类的效果。   
- any: 允许任何方向,设备可以自由旋转。
- natural: 使用设备的自然方向,通常是竖屏。
- landscape: 横屏模式,允许主要和次要横屏。
- landscape-primary: 主要横屏模式,通常是设备向左旋转90度。
- landscape-secondary: 次要横屏模式,通常是设备向右旋转90度。
- portrait: 竖屏模式,允许主要和次要竖屏。
- portrait-primary: 主要竖屏模式,通常是设备正常竖直方向。
- portrait-secondary: 次要竖屏模式,通常是设备倒置180度。   
any之外的值会有锁定的效果。   
## icons 
图标数组，放着各种大小的图标。系统会自己选最合适的图标展示在需要的位置。
- sizes 大小
- src 路径，相对于manifest.json
- type 图片类型

最后在index.html里导入manifest.json就可以了   
```html
<!-- 在head标签里加上 -->
<link rel="manifest" href="/manifest.json">
```    
配置好之后访问页面应该会出现是否安装到主屏幕之类的选项，如果没有可能是浏览器不支持。在[这里](https://developer.mozilla.org/zh-CN/docs/Web/Manifest) 查看浏览器支持情况。   
