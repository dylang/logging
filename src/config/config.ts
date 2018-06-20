import {proxyConsole} from '../proxy-console';

// We're flexible with what ENV people what to use to see the DEBUG messages.
const envString = `${process.env.LOG} ${process.env.DEBUG} ${process.env.LOGGING}`.toLowerCase();

export class Config {
    paddingFromBoxen = 12;
    jsonMetadata = {};
    outputJson = false;
    isDebug = ['debug', 'log', '*', 'verbose'].some((searchText: string) => envString.includes(searchText));
    indent = this.isDebug ? 15 : 8;

    proxyConsole() {
        proxyConsole(console);
    }
}

export const logConfig = new Config();
