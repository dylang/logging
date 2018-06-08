import {log} from '../lib';

const example = () => {
    log.info('starting example');
    log.warn('today is', new Date());
    log.error(new Error('this was an error'));
};

example();
