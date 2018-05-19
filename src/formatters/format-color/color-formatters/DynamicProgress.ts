import chalk from 'chalk';
import * as logUpdate from 'log-update';
import * as logSymbols from 'log-symbols';
import * as timeSpan from 'time-span';
import * as prettyMs from 'pretty-ms';
import {clearInterval} from 'timers';
import {Transform} from 'stream';
import {getPrefix} from './get-prefix';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinnerFramesLength = spinnerFrames.length;

const outStream = new Transform({
    transform: (data, encoding, callback) => {
        logUpdate.clear();
        callback(undefined, data);
    }
});

outStream.pipe(process.stdout);

export const logStream = () => {
    return outStream;
};

export class Progress {
    private percentage: number;
    private interval: NodeJS.Timer | null;
    private timer: timeSpan.TimeSpanObject | null;
    private message: string | null;
    private prefix: string | null;

    constructor(private label: string) {}

    progress(message: string, percentage: number = 0) {
        this.message = message;
        // Webpack progress % can go and down
        this.percentage = this.percentage > 0
            ? Math.max(this.percentage, percentage)
            : percentage;
        if (this.interval) {
            this.render();
            return;
        }
        console.log = (...args: any[]) => {
            if (this.interval) {
                logUpdate.clear();
            }
            console.warn(...args);
        };

        /*outStream.on('data', () => {
            if (this.interval) {
                logUpdate.clear();
            }
        });*/
        this.prefix = getPrefix('', this.label, 'blue');
        this.timer = timeSpan();
        this.interval = setInterval(() => this.render(), 50);
    }

    stop(message = this.message, symbol = ' ') {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.render(message, symbol);
        this.timer = null;
        this.message = null;
        this.prefix = null;
    }

    private render(text = this.message, symbol: string = '') {
        if (this.percentage >= 1 && this.interval) {
            return this.success(text);
        }
        const ms = this.timer ? this.timer() : 0;
        const msString = ms > 1000
            ? chalk.green(`${prettyMs(ms, {secDecimalDigits: 0, msDecimalDigits: 0})}`)
            : '';
        const percentage100 = Math.round(this.percentage * 100);
        const percentage10 = Math.round(this.percentage * 10);
        const progressBar = percentage10 > 0
            ? `${chalk.bgHsl(32, 100, percentage100 / 2 + 50)(' '.repeat(percentage10 * 2))}${' '.repeat(20 - percentage10 * 2)} ${percentage100}% `
            : '';
        const spinnerFrame = Math.round(ms / 80) % spinnerFramesLength;
        const spinner = symbol || (this.timer ? spinnerFrames[spinnerFrame] || spinnerFrame : '');
        const message = `${this.prefix || getPrefix('', this.label, 'blue')}${progressBar}${spinner} ${text} ${msString}`;
        if (this.timer) {
            return logUpdate(message);
        }
        if (message) {
            console.error(message);
        }
        this.message = null;
    }

    success(message: string | null) {
        this.stop(message || 'Complete!', logSymbols.success);
    }

    fail(message: string | null) {
        this.stop(message || 'Failed.', logSymbols.error);
    }
}
