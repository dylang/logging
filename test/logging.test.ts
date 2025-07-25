import mockDate from 'mockdate';
import sinon from 'sinon';
import { beforeAll, describe, expect, it } from 'vitest';
import createLogger, { type LoggerFunction } from '../src/index.js';

const { spy } = sinon;

const COMPLEX_OBJECT_FOR_TESTING = [
    'abc123',
    {
        a: 'apple',
        b: 'bear',
        c: ['cookies', 'cake', 'calculators', { abc: 123, def: 'jhi', klm: true, pqr: false }],
    },
];

beforeAll(() => {
    mockDate.set('1/1/2017');
});

describe('logging', () => {
    it('log debug', () => {
        const debugFunction = spy();
        const { debug } = createLogger('logging.test', { debugFunction });
        debug(...COMPLEX_OBJECT_FOR_TESTING);

        const logOutput = debugFunction.getCall(0).args;
        expect(logOutput).toBeTruthy();
    });

    it('log info', () => {
        const logFunction: sinon.SinonSpy<unknown[], void> = spy();
        const { info } = createLogger('logging.test', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        info(...COMPLEX_OBJECT_FOR_TESTING);

        const logOutput = logFunction.getCall(0).args;
        expect(logOutput).toBeTruthy();
    });

    it('log warning', () => {
        const logFunction: sinon.SinonSpy<unknown[], void> = spy();
        const { warn } = createLogger('logging.test', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        warn(...COMPLEX_OBJECT_FOR_TESTING);

        const logOutput = logFunction.getCall(0).args;
        expect(logOutput).toBeTruthy();
    });

    it('log error', () => {
        const logFunction: sinon.SinonSpy<unknown[], void> = spy();
        const { error } = createLogger('logging.test', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        error(...COMPLEX_OBJECT_FOR_TESTING);

        const logOutput = logFunction.getCall(0).args;
        expect(logOutput).toBeTruthy();
    });
});
