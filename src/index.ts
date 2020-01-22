// import { logger, Logger } from './logger';
// import { logConfig, LogConfig } from './config';
// export { logger, Logger } from './logger';
// export { logConfig, LogConfig } from './config';

export { logger } from './logger';
export { getMixins } from './mixins';
export { prettifier } from './prettifier';
export { pinoProxy as createLogger } from './pino-proxy';
export { progressFriendlyStream } from './streams';

/*
interface CreateLog {
    (): Logger;
    logger: Logger;
    default: Logger;
    logConfig: LogConfig;
}
// For backwards compatibility
const createLog: CreateLog = () => logger;
createLog.logger = logger;
createLog.default = logger;
createLog.logConfig = logConfig;
export default logger;

module.exports = createLog;
*/
