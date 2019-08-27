## Environment
- Development
- Production

## 1. Traditional Way
- Set ENV for Project
```shell
# 通过export NODE_ENV可以根据`文件名`自动载入相应配置
export NODE_ENV=production
export NODE_ENV=development
# set node_env to default
export NODE_ENV=
```

- Get ENV for Project
  - First Method: **Javascript**
    ```javascript
    process.env.NODE_ENV; // might be undefined.
    ```
  - Second Method: **Express**
    ```javascript
    const env = app.get("env"); // if undefined will return default value: development.
    if (env === "development") {
        app.use(morgan('tiny'));
        console.log("Morgan Loaded in Development Stage")
    }
    ```

## 2. Package Way
### Config varibles in different ENV
- Install `yarn add config`
- Config `config/default.json`, `config/development.json`, `config/production.json`， `config/custom-environment-variables.json`
- Override Priority: **custom > (produdction = development) > default**
