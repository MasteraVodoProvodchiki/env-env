# env-env
Convert environment variables to object  
[![CircleCI](https://circleci.com/gh/MasteraVodoProvodchiki/env-env.svg?style=svg)](https://circleci.com/gh/MasteraVodoProvodchiki/env-env)

# Examples
```javascript
/*
    evironment:
    CONFIG__DB__HOST=localhost
    CONFIG__DB__PORT=6666
    CONFIG__PORT=5555
    CONFIG__ARR=foo,true,44
    CONFIG__IS_FLAG=false
*/
const envEnv = require('@masteravodoprovodchiki/env-env')

const res = envEnv(process.env)
/*
    res:
    {
        config: {
            host: 'localhost',
            port: 6666,
        },
        arr: ['foo', true, 44],
        isFlag: false,
    }
*/
```
