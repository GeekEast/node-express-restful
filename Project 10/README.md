### Debugging
- 不必每次都删除`console.log()`
- 设置环境变量，控制debug启动或者关闭
- 设置显示信息的内容，程度
----
- Install `yarn add debug`
- Set ENV
```shell
# set the debugger to app: startup
export DEBUG=app:startup  # enable startup debugging
export DEBUG=app:db       # enable database debugging
export DEBUG=             # disable debugging.
export DEBUG=app:startup,app:db  # enable two debugging
export DEBUG=app:*        # enable all debugging
```
- Load
```javascript
const startupDebugger = require('debug')("app:startup");
const dbDebugger = require('debug')("app:db");

// equivalent: console.log("Morgan Loaded in Development Stage")
startupDebugger("Morgan Loaded in Development Stage");
dbDebugger("Database debugger started.")
```
- run `nodemon app.js`

