# Logging  [![Build Status](https://secure.travis-ci.org/dylang/logging.svg)](https://travis-ci.org/dylang/logging)

> Lightweight informative modern console logging.

[![logging](screenshots/screenshot.png)](screenshots/screenshot.png)

## Install

```sh
yarn add logging
```

## Features

* Optimized for ES2018 and TypeScript.
* As easy to use as console.log. No setup, no initializers, and no plugins required.
* All common log levels: `info`, `warn`, `error`, `debug`.
* Nice coloring, formatting, and indentation.
* Error parsing with color-coded source context.
* Automatically includes the filename where log was called, or if the file is `index`, then the directory name.
* Monorepo friendly: show module name where log was called.
* Automatically shows how long slow tasks are taking.

## Common Usage

```js
// commonjs: const { default: log } = require('logging');  
import { logger } from 'logging';

logger.info('Interesting');
logger.warn('Hmmm...', { details });
logger.error('Not good.', 'Not good at all.', err);
```

`chalk` template tag parsing is built in.

```js
logger.info(`Server ready: {blue.underline http://localhost:${port}/}`);
```

`stripIndents` from common-tags is built in.

```js
    logger.info(`
                All this extra spacing to the left:
                    * Will be removed by logging so it's indented the same as other log messages.
                    * These bullets will still be correctly indented.
                    * It works with {magenta chalk colors too.}
                Note: for this to work, make sure no text is on the same line as the back ticks. This line is extra long to show how line wrapping works.
    `);
```

## `log.debug`

```js
// commonjs: const { default: log } = require('logging');  
import { logger } from 'logging';

logger.debug('This will only be seen when debug mode is enabled.');
```

Enable `debug mode` with any of the following environment variable choices:

* `DEBUG=log`
* `LOG=debug`
* `LOG=verbose`
* `LOGGING=*`
* etc (we want it to be easy to guess the right way to see debug messages)

```bash
# example enabling debug mode
$ LOG=* yarn start
```

With `debug mode` enabled, the following changes happen:
 * `logger.debug` are included in the log.
 * Tasks < 1 second will show how many `ms` they take.
 * `logger.progress` will show every message instead of overwriting each message.
 
## `logger.raw(string)`

Takes one `string` as input and sends it directly to the output stream. No formatting is done. No line break is added.
This is useful as easy-to-mock alternative to `console.log` or `process.stdout.write`. 

## Configuration

Config changes will be global for the whole application, so you only need to do them once.

```js
import { logConfig } from 'logging';

// All `console.log`, `console.warn`, and `console.error` calls will automatically call `log.info`, `log.warn`, `log.error`.
// This is an easy way to enable `logging` across your entire application if you have been using `console`. 
// It also enables `logging` in your third-party node_modules.
logConfig.proxyConsole();

if (process.env.NODE_ENV==='production') {
    // It is usually best to only use this in a production environment.
    logConfig.outputJson = true;
    // Additional data included with every json message
    logConfig.jsonMetadata = {
        version: ''
    };
}
```

Note: `outputJson = true` will always includes `log.debug` messages. It's up to your log aggregation tooling to choose what you see and hide.

## Mocking in Jest tests

```js
import { logger } from 'logging';

// Jest will automatically mock all logging methods. 
// This will also clean up your test output because it hides what would otherwise get logged to the console. 
jest.mock('logging');

test('something that logs a warning', () => {
    expect(log.warn).toHaveBeenCalledWith('I was warned about this!');
});
```

## _Experimental_ `logger.progress`, `logger.success`, `logger.fail`  

`log.progress(message, optional percentage)`

* Shows a spinner until `logger.success` or `logger.fail` is called.
* If `percentage` (float `0.00` to `1.00`) is included, it will show a progress bar.
* If `percentage` reaches `1`, then `logger.success` is automatically called.

This feature is still being worked on and the API is subject to change.
* Only one `progress` at a time is supported.
* Calling _any_ `log` function other than `progress` will stop the progress, and the next time `progress` is called, it wil start a new one. 


## _Experimental_ `logger.help`  

* Similar to `logger.info`, except puts it all in a blue box.   

