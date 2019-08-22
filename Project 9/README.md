## Environment
- Development
- Production
- Testing

### Use ENV
- Use Morgan only in Development ENV
```javascript
// environment
const env = app.get("env");
if (env === "development") {
    app.use(morgan('tiny'));
    console.log("Morgan Loaded in Development Stage")
}
```

### Get ENV
- First Method: **Javascript**
```javascript
process.env.NODE_ENV; // might be undefined.
```

- Second Method: **Express**
```javascript
app.get("env") // if undefined will return default value: development.
```

### Set ENV
#### Shell
```shell
# 通过export NODE_ENV可以根据`文件名`自动载入相应配置
export NODE_ENV=production
```
#### Package
- Install `yarn add config`
- Config `config/default.json`, `config/development.json`, `config/production.json`
- [Credentials](https://github.com/lorenwest/node-config/wiki/Environment-Variables#custom-environment-variables)
  - set in env `export app_privateKey = yourpassword`
  - config in `config/custom-environment-variables.json`
```javascript
{
    "mail": {
        // the env var name, not the password
        "password": "app-privateKey" 
    }
}
````