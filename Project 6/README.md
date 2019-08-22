## Express
- Install `yarn add express`


### [Routes](https://expressjs.com/zh-cn/guide/routing.html)
`app.METHOD(URL,CALLBACK_FUNC)`
- `someone` call the **URL** and then `we` will do the **CALLBACK_FUNC**

### API

#### Request
[`Req Method`](http://www.expressjs.com.cn/4x/api.html#req)
Method | Description | Example
:------- | :------- | :----
req.get() | 获取header中某属性的值 | `req.get('Content-type')`
`req.is()` | 判别来的body的Content-Type | `req.is('html')`

[`Req Properties`](http://www.expressjs.com.cn/4x/api.html#req)
Property | Description
:------- | :-------
**req.body** | `post中的数据`
req.cookies | 获取cookies
req.hostname | 获取域名
req.ip | 获取ip
req.method | 获取方法
req.originalUrl | 完整url
req.baseUrl | 路由插入的路径
req.path | 细节路径
**req.params** | `req.params.id` for `/:id`
req.protocol | http/https
**req.query** | `req.query.q `for `/seach?q=name`

#### Response
[`Res Method`](http://www.expressjs.com.cn/4x/api.html#res)

Method | Description 
:------- | :------- |
res.download() | 提示将要下载文件。
res.end() | 结束响应进程。
res.json() | 发送 JSON 响应。
res.jsonp() | 在 JSONP 的支持下发送 JSON 响应。
res.redirect() | 重定向请求。
res.render() | 呈现视图模板。
res.send() | 发送各种类型的响应。
res.sendFile | 以八位元流形式发送文件。
res.sendStatus() | 设置响应状态码并以响应主体形式发送其字符串表示。


### Pluggable - [Middleware](https://expressjs.com/en/guide/routing.html)

- 统一请求中间件：适合做**User Authentication**
```javascript
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// core code: next
app.all('/', (req,res,next) => {
  console.log('authentication');
  next();
});

app.get('/',(req, res) => {
  res.send("How are you?")
});

app.listen(port);
```

- 单一路径多个回调
```javascript
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// core code: .get().post
app.route("/").get((req,res)=> {
    res.send("get test");
}).post((req,res)=> {
    res.send("post test");
})

app.listen(port);
```

### Special Middleware - Router
- [`Router Method`](http://www.expressjs.com.cn/4x/api.html#router.all)

Method | Description
:------- | :-------
**router.all()**| 匹配所有http请求，无中间件
**router.get()** | 匹配GET请求
**router.param()** | 匹配特定参数
**router.route()** | 单一路径匹配多个回调
**router.use()** | 匹配所有http请求, 添加中间件

- Pluggable Router
```javascript
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// core 1
var router = express.Router();  
router.use((req,res,next) => {
  console.log("authentication");
  next();
})
router.get("/",(req,res) => {
  res.send("main page.")
})
router.post("/",(req,res) => {
  res.send("main post.")
})
router.get("/about", (req,res)=>{
  res.send("about page.")
})

// core 2: mount the router to '/';
app.use('/',router);


app.listen(port);

// core 3: reuse export
module.exports.router = router;
```

- Parameter Route
```javascript
//实际上 ： 充当了一个通配作用，通配规则如何，请看验证参数
router.get('/:id', (req, res) => {
	res.send('id namespace.');
});
```

- Parameter Check
```javascript
// 位于路由之前，充当另外一个middleware
router.param('id', (req, res, next, id) => {
	// validation logi here
	console.log('valid id');
	// send back request
	req.id = id;
	next();
});
```

- Query String Parameter
```javascript
router.get("/:id", (req,res) => {
    // localhost:3000/courses/1?sortBy=name
    res.send(req.query.sortBy);
});
```

### HTTP GET