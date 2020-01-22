import { destination } from 'pino';
import { proxyConsole } from '../proxy-console';

// We're flexible with what ENV people what to use to see the DEBUG messages.
const envString = `${process.env.LOG} ${process.env.DEBUG} ${process.env.LOGGING}`.toLowerCase();

export class Config {
    public paddingFromBoxen = 12;
    public jsonMetadata = {};
    public outputJson = false;
    public isDebug = ['debug', 'log', '*', 'verbose'].some((searchText: string) => envString.includes(searchText));
    public indent = 18;

    public proxyConsole() {
        proxyConsole(console);
    }
    public destination = process.stdout || destination();
}

export const logConfig = new Config();

export type LogConfig = Config;
