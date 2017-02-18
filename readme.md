# Logging  [![Build Status](https://secure.travis-ci.org/dylang/logging.png)](https://travis-ci.org/dylang/logging)

  Lightweight informative modern console logging.

## Install

```sh
yarn add logging
```

## Features
* Simple.
* Log levels.
* Nice coloring.
* Works in the browser.

## Usage

```js
// or const createLogger = require('logging');  
import createLogger from 'logging';

const logger = createLogger('FeatureName');

logger.info('Interesting');
// -> [ Feature ] Interesting

logger.warn('Hmmm...', { details });
// -> [ WARNING Feature ] Hmmm... { details object }

logger.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
// -> [ ERROR Feature ] Not good. Not good at all. { err } { context } ...

// uses the debug module, use DEBUG=* or DEBUG=FeatureName to see these items.
logger.debug('Interesting');
// -> [ Feature ] Interesting
```
