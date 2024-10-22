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
浏览器先会询问用户是否订阅，如果是就向中间这个订阅，之后服务器发通知也不是直接发给用户而是发给这个中间层，再由它转发给用户。       
这里有个小问题，就是谷歌浏览器在大陆是用不了这个的，需要特殊的网络环境。所以我这里也没有学的太好，没有实现过。      
### push的流程
为了保证安全性，web push需要一对公钥和私钥，浏览器订阅的时候会将公钥发送给push service，它会将这个公钥与相应的url维护起来。服务器推送信息时会用私钥对发送的信息加密，再生成一个Authorization请求头。push service收到请求后，会根据url查找公钥，再解密验证。       
### push的使用   
#### 生成订阅信息
```js
function subscribePush(registration,publicKey){
  const subscribeOptions = {
    userVisibility:true,
    applicationServerKey:window.urlBase64ToUnit8Array(publicKey)
  }
  return registration.pushManager.subscribe(subscribeOptions).then((pushSubscription)=>{
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription))
    return pushSubscription
  })
}
```
userVisibility是通知是否需要有提醒，没有提醒相当于静默通知，applicationServerKey是客户端公钥。最后会得到一个subscription对象，之后再将这个对象发送给后端就可以了。
***
未完待续