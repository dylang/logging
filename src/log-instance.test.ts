import { defaultLog } from "./log-instance";

describe('log-instance', () => {
    test('defaultLog', async () => {
        defaultLog.info('test');
    });
});
