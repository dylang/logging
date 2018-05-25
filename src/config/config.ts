import {proxyConsole} from '../proxy-console';

export class Config {
    paddingFromBoxen = 12;
    indent = 8;
    jsonMetadata = {};
    outputColor = true;
    outputJson = false;

    proxyConsole() {
        proxyConsole(console);
    }

    setMetadata(data: object) {
        this.jsonMetadata = data;
    }
}

export const logConfig = new Config();
