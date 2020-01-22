import pino from 'pino';
import { prettifier, getMixins } from '../src';

const pinoExample = () => {
    const log = pino({
        prettyPrint: {
            levelFirst: true
        },
        prettifier,
        mixin: getMixins,
        serializers: {
            [Symbol.for('pino.*')]: (x) => {
                return x;
            }
        }
    });
    log.info('starting example', '\nI will be on a new line!');
    log.warn('today is', new Date());
    log.error(new Error('this was an error'));

    const mapExample = new Map();
    mapExample.set('mapKey1', 'mapValue1');
    mapExample.set('mapKey2', 'mapValue2');

    const obj = {
        object: { obj1: { true: true }, obj2: { false: false } },
        [Symbol('foo')]: 'foo',
        map: new Map(),
        array: [1, NaN, Infinity],
        asyncFunction: async (param) => ({ param }),
        promise: new Promise(() => {}),
        native: console.log
    };
    obj.circularReference = obj;

    log.info('oh wow', obj);

    log.error({ data: ['This was an error:', new Error('after')] });
    log.error({ data: [new Error('before'), 'That was an error'] });
    log.error({ err: new Error('object') }, 'That was an error object');
    log.info({ data: [{ a: 1 }, { b: 2 }, { c: 3 }, 4, 5, 6] });

    const child = log.child({ children: 'some' });
    child.info({ data: ['what'] });
};

pinoExample();
