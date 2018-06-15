// yarn run example
// import {defaultLog} from "../src/log-instance";

const { default: defaultLog } = require('../lib');
const { log  } = require('../lib');
const createLog = require('../lib');



const deepStackTest = () => {
    const forErrorStack = () => {
        const iWillThrowAnError = () => {
            log.error(new Error('i threw an error'));
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

    log.info('/', 'back');
    log.info('\/', 'escaped back');
    log.info('\\', 'forward');
    log.info(' \\ \\ wtf? / /', 'mulitiple forward');

    log.info(' \\ \\/ / _` | \'_ \\ ____\\ \\ /\\ / / _ \\| \'__| |/ / __| \'_ \\ / _` |/ __/ _ \\/ __|');
    log.info('1234567890'.repeat(100));
    log.debug('set DEBUG=logging or DEBUG=* to see this one');
    log.info('Interesting');
    log.warn('Hmmm...', 123, false, { details });
    log.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
    log.error('Error object', new Error('Exception happened'));
    log.info(`
        This
        will
        span
        {blue multiple}
        lines
            and i'm indented.`);

    const obj = { property: {} };
    obj.circularReference = obj;
    obj[Symbol('foo')] = 'foo';
    obj.map = new Map();
    obj.map.set('prop', 'value');
    obj.array = [ 1, NaN, Infinity ];
    obj.asyncFunction = async (param) => ({param}),
    obj.promise = new Promise(() => {}),
    obj.native = console.log;

    log.info('using log.info', obj);
    log.help(`
        This is a help box.
        {green logging supports {cyan chalk} syntax too...}
    `);
    log.info('...');
    log.info(obj.promise);
    log.success('This is working!');
    log.info('...');

    log.progress('This is going to take a while...');
    await new Promise(resolve => setTimeout(() => resolve(), 200));
    log.progress('Still going...');
    await new Promise(resolve => setTimeout(() => resolve(), 200));
    log.success('This is done!');
    log.info('i thought we were done.');
    for (let i = 0; i<=100; i++) {
        log.progress('This is going to take a while...', i/100);
        await new Promise(resolve => setTimeout(() => resolve(), 20));
    }
    log.help('That was the spinner');
};

example().then(() => {});
