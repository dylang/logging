import {createLog, outputJson} from './logging';

describe('logging', () => {
    test('createLog', async () => {
        outputJson({metadata: 'value'});
        const log = createLog('test');
        log.info('test', new Error('error test'), {foo: 'bar'}, {key: 'value'});
    });
});
