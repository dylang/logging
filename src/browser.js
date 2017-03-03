// super basic browser support just to avoid breaking universal builds.
// title and log level are not included in the output at this time.
function createLogger(/* title */) {
    function logger() {
        console.log.apply(console, arguments);
    }
    return {
        info: logger,
        warn: logger,
        error: logger,
        debug: logger
    };
}

export default createLogger;
