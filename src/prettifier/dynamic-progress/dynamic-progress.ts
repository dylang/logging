import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import LogUpdate from 'log-update';
import logSymbols from 'log-symbols';
import timeSpan from 'time-span';
import { clearInterval } from 'timers';
import { getColumns, logConfig } from '../../config';
import { rightJustify, wrap, indentAllLines } from '../layout';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinnerFramesLength = spinnerFrames.length;

export class DynamicProgress {
    private percentage = 0;
    private interval: NodeJS.Timer | null = null;
    private timer: timeSpan.TimeEndFunction | undefined;
    private message: string | null = null;
    private previousMessage: string | null = null;
    private prefix: string | null = null;
    private timestamp = '';
    private hidden = false;
    private logUpdate = LogUpdate.create(logConfig.destination);

    public progress({
        message = '',
        percentage = 0,
        timestamp,
        label
    }: {
        timestamp: string;
        label: string;
        message: string;
        percentage: number;
    }) {
        if (logConfig.isDebug && this.previousMessage === message) {
            return;
        }
        this.message = message;
        this.previousMessage = message;
        // Webpack progress % can go and down
        this.percentage = this.percentage > 0 ? Math.max(this.percentage, percentage) : percentage;
        if (this.interval) {
            this.render();
            return;
        }

        if (logConfig.isDebug) {
            return this.render();
        }

        this.timestamp = timestamp;
        this.prefix = label;
        this.timer = timeSpan();
        this.hidden = false;
        this.interval = setInterval(() => this.render(), 50);
    }

    public stop(message = this.message, symbol = ' ') {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.render(message, symbol);
        this.timer = undefined;
        this.message = null;
        this.prefix = null;
        this.percentage = 0;
        this.logUpdate.done();
    }

    private renderBar(prefix: string) {
        if (logConfig.isDebug) {
            return '';
        }
        const columns = getColumns();
        const progressBarLength = columns - stripAnsi(prefix).length - 10;
        const currentLength = Math.round(this.percentage * progressBarLength);
        const on = chalk.bgHex('73c1bf')(' '.repeat(currentLength));
        const off = chalk.bgWhite(' '.repeat(progressBarLength - currentLength));

        return `${on}${off}`;
    }

    private render(text = this.message, symbol = '') {
        if (this.hidden) {
            return;
        }

        if (this.percentage >= 1 && this.interval) {
            return this.success(text);
        }
        const ms = this.timer ? this.timer() : 0;
        const percentage100 = Math.round(this.percentage * 100);
        const prefix = this.prefix;
        if (!prefix) {
            return;
        }
        const progressBar =
            percentage100 > 0
                ? chalk`${this.renderBar(prefix)} {hex('73c1bf') ${rightJustify(String(percentage100), 3)}% }`
                : '';
        const columns = getColumns();
        const spinnerFrame = Math.round(ms / 80) % spinnerFramesLength;
        const spinner =
            symbol || (this.timer && !logConfig.isDebug ? chalk.hex('73c1bf')(spinnerFrames[spinnerFrame]) : '');
        const everythingButText = `${this.timestamp}${prefix} ${progressBar}${spinner}`;
        const message = indentAllLines(wrap(text || '', columns));

        if (this.timer && !this.interval) {
            this.logUpdate(`${this.timestamp}${prefix} ${symbol}  ${message.trim()}`);
            return;
        }

        if (this.timer) {
            this.logUpdate(
                [
                    '',
                    chalk.underline(' '.repeat(columns + logConfig.indent)),
                    '',
                    '',
                    everythingButText,
                    message,
                    '\n'.repeat(4 - Math.ceil((text || '').length / columns))
                ].join('\n')
            );
            return;
        }

        logConfig.destination.write(message);
        logConfig.destination.write('\n');
        this.message = null;
    }

    public success(message: string | null) {
        this.stop(message || 'Complete!', logSymbols.success);
    }

    public fail(message: string | null) {
        this.stop(message || 'Failed.', logSymbols.error);
    }

    public hide() {
        if (this.interval && !logConfig.isDebug) {
            this.hidden = true;
            this.logUpdate.clear();
        }
    }

    public show() {
        if (this.interval && !logConfig.isDebug) {
            this.hidden = false;
            this.render();
        }
    }
}
