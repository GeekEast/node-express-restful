## Module
- What is `global` and `window` in javascript?
  - `global` exists in **node.js**, and in node.js, `gloabl.anything` != `anything`
  - `window` exists in **browser**, and in browser, `window.anything` = `anything`
- Why we need to use `Module` in Node.js?
  - Two js run in browser, with two variables or methods of the same name, the later one will **override** the previous one.
  - Therefore, we use module to `localize` variables to avoid `collapse`

## Export
```javascript
// export the log function as log.
module.exports.log = log;

// export single function
module.exports = log;

// Or
moduel.exports = {
	log: log,
	url: url
};
```

## Import
```javascript
// Way One
const logger = require('./logger') // const is better
// execute the log method
logger.log();

// Way Two - better, more lightweight
const {log, url} = require('./logger')

// If it is a single function
// module.exports = log;
const log = require('./logger');
log("hello")
```

## Path
- `'./logger'` vs `'logger'`
    - `'./logger'`: Current Ddirectory
    - `'logger'`: 
        - `Built-in` 
        - `Current` Directory
        - Within `node_modules`