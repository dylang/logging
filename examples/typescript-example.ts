import {log} from '../lib';

const typescriptExample = () => {
    log.info('starting example', '\nI will be on a new line!');
    log.warn('today is', new Date());
    log.error(new Error('this was an error'));
};

typescriptExample();
