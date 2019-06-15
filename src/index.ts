import { log } from './log';
import { logConfig } from './config';
export { log } from './log';
export { logConfig } from './config';

// For backwards compatibility
const createLog: CreateLog = () => log;
createLog.log = log;
createLog.default = log;
createLog.logConfig = logConfig;
export default log;

module.exports = createLog;
