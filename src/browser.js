// Super basic browser support just to avoid breaking universal builds.
// title and log level are not included in the output at this time.
const logger = (...arguments_) => console.log(...arguments_);

function createLogger(/* title */) {
    return {
        info: logger,
        warn: logger,
        error: logger,
        debug: logger
    };
}

export default createLogger;
