# 使用push API 推送
## 简介
一般情况下我们主动向客户端发送信息可能需要先建立一个长连接或者是轮询，但是这个push API是不需要的，它使用了一个第三方服务(Push Service)，这个一般由浏览器提供。整个流程大概是这样的：      
```
浏览器          Push Service            your server
  |                 |                       |
  |    订阅         |                       |
  |----->------------|                      |
  |                 |                       |
  |     监听        |                       |
  |----<------------|                       |
  |                 |                       |
  |                 |                       |
  |                 |       推送信息         |
  |                 |-----<-----------------|
  |                 |                       |
  |  推送信息        |                      |
  |----<------------|                       |
  |                 |                       |
```

