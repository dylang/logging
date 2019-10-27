// yarn run example
// import {defaultLog} from "../src/log-instance";

/* eslint-disable @typescript-eslint/no-var-requires */
const { default: defaultLog } = require('../lib');
const { logger } = require('../lib');
const createLog = require('../lib');

const deepStackTest = () => {
    const forErrorStack = () => {
        const iWillThrowAnError = () => {
            logger.error(new Error('i threw an error'));
        };

        iWillThrowAnError();
    };

    forErrorStack();
};

const example = async () => {
    console.log('createLog', createLog);
    const fooLog = createLog('foo');
    fooLog.info('this is foo log');

    const details = { blah: true };
    const err = new Error('This error is part of the example');
    const context = { userid: 1 };
    const etc = false;

    console.log('i am console.log');
    console.warn('i am console.warn');

    deepStackTest();

    defaultLog.info('this is interesting');

    logger.info('/', 'back');
    logger.info('/', 'escaped back');
    logger.info('\\', 'forward');
    logger.info(' \\ \\ wtf? / /', 'mulitiple forward');

    logger.info(" \\ \\/ / _` | '_ \\ ____\\ \\ /\\ / / _ \\| '__| |/ / __| '_ \\ / _` |/ __/ _ \\/ __|");
    logger.info('1234567890'.repeat(100));
    logger.debug('set DEBUG=logging or DEBUG=* to see this one');
    logger.info('Interesting');
    logger.warn('Hmmm...', 123, false, { details });
    logger.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
    logger.error('Error object', new Error('Exception happened'));
    logger.info(`
        This
        will
        span
        {blue multiple}
        lines
            and i'm indented.`);

    const mapExample = new Map();
    mapExample.set('mapKey1', 'mapValue1');
    mapExample.set('mapKey2', 'mapValue2');

    const obj = {
        object: { obj1: { true: true }, obj2: { false: false } },
        [Symbol('foo')]: 'foo',
        map: mapExample,
        array: [1, NaN, Infinity],
        asyncFunction: async (param) => ({ param }),
        promise: new Promise(() => {}),
        native: console.log
    };
    obj.circularReference = obj;

    logger.info('using log.info', obj);
    logger.help(`
        This is a help box.
        {green logging supports {cyan chalk} syntax too...}
    `);
    logger.info('...');
    logger.info(obj.promise);
    logger.success('This is working!');
    logger.info('...');

    logger.progress('This is going to take a while...');
    await new Promise((resolve) => setTimeout(() => resolve(), 200));
    logger.progress('Still going...');
    await new Promise((resolve) => setTimeout(() => resolve(), 200));
    logger.success('This is done!');
    logger.info('i thought we were done.');
    for (let i = 0; i <= 100; i++) {
        logger.progress('This is going to take a while...', i / 100);
        await new Promise((resolve) => setTimeout(() => resolve(), 20));
    }
    logger.success('That was the spinner');
};

example().then(() => {});
