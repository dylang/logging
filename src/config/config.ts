import {proxyConsole} from '../proxy-console';

export class Config {
    paddingFromBoxen = 12;
    jsonMetadata = {};
    outputColor = true;
    outputJson = false;
    isDebug = process.env.LOG === 'debug' ||
        process.env.LOGGING === 'debug' ||
        process.env.DEBUG === 'log' ||
        process.env.DEBUG === 'logging' ||
        process.env.DEBUG === '*';
    indent = this.isDebug ? 15 : 8;

    proxyConsole() {
        proxyConsole(console);
    }

    setMetadata(data: object) {
        this.jsonMetadata = data;
    }
}

export const logConfig = new Config();
