// yarn run example
// import {defaultLog} from "../src/log-instance";

const { createLog } = require('../lib');

const example = async () => {
    const log = createLog('Feature');

    const details = { blah: true };
    const err = new Error('This error is part of the example');
    const context = { userid: 1 };
    const etc = false;

    log.info('1234567890'.repeat(100));
    log.debug('set DEBUG=Feature or DEBUG=* to see this one');
    log.info('Interesting');
    log.warn('Hmmm...', 123, false, { details });
    log.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
    log.info(`
        This
        will
        span
        {blue multiple}
        lines
            and i'm indented.\n`);

    const obj = { property: {} };
    obj.circularReference = obj;
    obj[Symbol('foo')] = 'foo';
    obj.map = new Map();
    obj.map.set('prop', 'value');
    obj.array = [ 1, NaN, Infinity ];

    log.info(obj);

    log.help(`
    
        This is
        {green multiple lines.}
        Should add chalk too?
        
    `);
    log.success('This is working!');
    log.progress('This is going to take a while...');
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Still going...');
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Not too much longer...');
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.fail('Whoops...');
    log.info('i thought we were done.');
    log.progress('This is going to take a while...', 0);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Still going 1...', .10);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Still going 2...', .20);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Still going 3...', .30);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Still going 4...', .40);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('Not too much longer...', .50);
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
    log.progress('All done!', 1.00);
    log.success('All done!');

    log.help('That was the spinner');
};

example().then(() => {});
