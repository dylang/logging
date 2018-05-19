# Logging  [![Build Status](https://secure.travis-ci.org/dylang/logging.svg)](https://travis-ci.org/dylang/logging)

> Lightweight informative modern console logging.

[![logging](screenshots/screenshot.png)](screenshots/screenshot.png)

## Install

```sh
yarn add logging
```

## Features
* Simple.
* Log levels.
* Nice coloring.
* Typescript types.
* Node and Browser.

## Usage

```js
// or const createLogger = require('logging').default;  
import createLogger from 'logging';

const log = createLogger('FeatureName');

log.info('Interesting');
// -> [ Feature ] Interesting

log.warn('Hmmm...', { details });
// -> [ WARNING Feature ] Hmmm... { details object }

log.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
// -> [ ERROR Feature ] Not good. Not good at all. { err } { context } ...

// uses the debug module, use DEBUG=* or DEBUG=FeatureName to see these items.
log.debug('Interesting');
// -> [ Feature ] Interesting
```


```js
import { createLog, defaultLog, mockLog } from 'logging';

const log = createLog('name of log');
log.info('some data');
defaultLog.info('some other data');


// strict json for the life of the process
log.configure({ format: 'json' })
log.format(({ format, data }) => format === 'json' ? ({
   name: "any values here will be included with every log entry when using json",
   ...data
}) : data)
```

