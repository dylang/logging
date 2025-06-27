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

    it('creates a child logger', () => {
        const logFunction = spy();
        const parentLogger = createLogger('parent', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        const childLogger = parentLogger.child('child');

        expect(childLogger).toBeTypeOf('object');
        expect(childLogger.info).toBeTypeOf('function');
        expect(childLogger.warn).toBeTypeOf('function');
        expect(childLogger.error).toBeTypeOf('function');
        expect(childLogger.debug).toBeTypeOf('function');
        expect(childLogger.child).toBeTypeOf('function');
    });

    it('formats child logger output correctly', () => {
        const logFunction: sinon.SinonSpy<unknown[], void> = spy();
        const parentLogger = createLogger('parent', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        const childLogger = parentLogger.child('child');
        childLogger.info('test message from child');

        expect(logFunction.calledOnce).toBe(true);
        // args[0] is the timestamp '00:00:00.000'
        // args[1] is the title, e.g., chalk.blue('parent:child')
        // args[2] is the formatted message
        expect(logFunction.getCall(0).args[1]).toContain('parent:child');
        expect(logFunction.getCall(0).args[2]).toContain('test message from child');
    });

    it('formats grandchild logger output correctly', () => {
        const logFunction: sinon.SinonSpy<unknown[], void> = spy();
        const parentLogger = createLogger('parent', {
            logFunction: logFunction as unknown as LoggerFunction,
        });
        const childLogger = parentLogger.child('child');
        const grandchildLogger = childLogger.child('grandchild');
        grandchildLogger.info('test message from grandchild');

        expect(logFunction.calledOnce).toBe(true);
        // args[0] is the timestamp '00:00:00.000'
        // args[1] is the title, e.g., chalk.blue('parent:child:grandchild')
        // args[2] is the formatted message
        expect(logFunction.getCall(0).args[1]).toContain('parent:child:grandchild');
        expect(logFunction.getCall(0).args[2]).toContain('test message from grandchild');
    });
});
