import {log} from './log-instance';

describe('log-instance', () => {
    test('defaultLog', async () => {
        log.info('test');
        log.progress('This is going to take a while...', 0.1);
        await new Promise(resolve => setTimeout(() => resolve(), 1000));
        log.info('yay');

    });

    test('examples ', async () => {
        log.info(process.versions);
        log.info({
            obj: {
                a: [{foo: 'bar', baz: {qux: 'fez'}}],
                c: 'd', e: 'f',
                g:  (one: string, two: string) => one + two,
                h: {a: 'b', c: 'd'},
                regex: /^foo(?=bar)/g }
        });
        log.info('this failed', {a: '1 ms'});
        log.info('abc 123'.repeat(100), new Error('mock error'), {a: {b: {c : true}}});
        log.warn('this failed', new Error('mock error'), {a: {b: {c : true}}});
        const foobar = new Error('mock error');
        log.error('abc 123'.repeat(100), foobar, {a: {b: {c : true}}});
    });
});
