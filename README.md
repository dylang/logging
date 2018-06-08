# Logging  [![Build Status](https://secure.travis-ci.org/dylang/logging.svg)](https://travis-ci.org/dylang/logging)

> Lightweight informative modern console logging.

[![logging](screenshots/screenshot.png)](screenshots/screenshot.png)

## Install

```sh
yarn add logging
```

## Features
* As easy to use as console.log.
* Log levels.
* Nice coloring.
* Typescript types.
* Error parsing with color-coded source context.
* Progress bars.
* Automatically shows how long tasks > 1 second take.
* Use `DEBUG=log` env variable to see log.debug statements and see how long tasks < 1 second take.

## Usage

```js
// commonjs: const { default: log } = require('logging');  
import { log } from 'logging';

log.info('Interesting');

log.warn('Hmmm...', { details });

log.error('Not good.', 'Not good at all.', { err }, { context }, { etc });

// uses the debug module, use DEBUG=* or DEBUG=FeatureName to see these items.
log.debug('Interesting');

```

```js
import { createLog, defaultLog, mockLog } from 'logging';

const log = createLog('name of log');
log.info('some data');
defaultLog.info('some other data');

// strict json for the life of the process
log.outputJson()
// default color output
log.outputColor()
// Additional data included with every json message
log.jsonMetadata({})

```

