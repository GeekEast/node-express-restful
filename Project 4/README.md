## Flow
- Switch npm Version `sudo npm i -g npm@5.5.1`
- Config `npm init` or `npm init --yes`
- Install `npm install [name]` or `yarn add [name]`
- Install for Dev `npm install --save-dev [name]` or `yarn add --dev [name]`
- Install in batch `npm install` or `yarn`
- Uninstall `npm uninstall [name]` or `yarn remove [name]`
- Inspect version `npm list` or `yarn list`, `-g` and `--depth=0` are optional
- Inspect package `npm view [name]` or `npm view [name] dependencies`

## Npm Package Version
- 4.13.6
    - (Patch) 6: bugs fixing version
    - (Minor) 13: new features version without breaking exsiting API
    - (Main) 4: new features version with breaking existing application

- exact version : `4.13.6`
- stable Major and Minor: `~4.13.6`
- stable Major: `^4.13.6`


## Update Package
```shell
npm outdated

# this will only update minor and patch update
npm update

# update for major update
sudo npm i -g npm-check-updates
ncu -u # to upgrade the json file
yarn # execute the update
```

## Global
- Global: can be used under any folders
- Local: can only be used withon on folder

## Registry
- register `npm adduser`
- login `npm login`
- public `npm publish`