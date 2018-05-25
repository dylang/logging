export {log} from './log';
import {log} from './log';

export {logConfig} from './config';

// For backwards compatibility
const createLog = Object.assign(() => log, {log});
export default createLog;
