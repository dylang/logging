import { logger, Logger } from './logger';
import { logConfig, LogConfig } from './config';
export { logger, Logger } from './logger';
export { logConfig, LogConfig } from './config';

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
