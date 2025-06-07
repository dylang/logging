// Super basic browser support just to avoid breaking universal builds.
// title and log level are not included in the output at this time.
import type { Logger } from './logging.js';

const logger = (...arguments_: unknown[]): void => console.log(...arguments_);

function createLogger(/* title */): Logger {
    return {
        info: logger,
        warn: logger,
        error: logger,
        debug: logger,
        fatal: logger,
        trace: logger,
    };
}

export default createLogger;
