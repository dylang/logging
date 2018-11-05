import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import logUpdate from 'log-update';
import logSymbols from 'log-symbols';
import timeSpan from 'time-span';
import {clearInterval} from 'timers';
import {getDuration, getPackageAndFilename} from '../prefix';
import {getColumns, logConfig} from '../../../config';
import {rightJustify, wrap, indentAllLines} from '../helpers';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinnerFramesLength = spinnerFrames.length;

export class DynamicProgress {
    private percentage = 0;
    private interval: NodeJS.Timer | null = null;
    private timer: timeSpan.TimeSpanObject | undefined;
    private message: string | null = null;
    private previousMessage: string | null = null;
    private prefix: string | null = null;

    progress(message: string, percentage = 0) {
        if (logConfig.isDebug && this.previousMessage === message) {
            return;
        }
        this.message = message;
        this.previousMessage = message;
        // Webpack progress % can go and down
        this.percentage = this.percentage > 0
            ? Math.max(this.percentage, percentage)
            : percentage;
        if (this.interval) {
            this.render();
            return;
        }

        if (logConfig.isDebug) {
            return this.render();
        }

        this.prefix = getPackageAndFilename('PROGRESS');
        this.timer = timeSpan();

        this.interval = setInterval(() => this.render(), 50);
    }

    stop(message = this.message, symbol = ' ') {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.render(message, symbol);
        this.timer = undefined;
        this.message = null;
        this.prefix = null;
        this.percentage = 0;
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
        if (this.percentage >= 1 && this.interval) {
            return this.success(text);
        }
        const ms = this.timer ? this.timer() : 0;
        const percentage100 = Math.round(this.percentage * 100);
        const prefix = this.prefix || getPackageAndFilename('PROGRESS');
        const progressBar = percentage100 > 0
            ? chalk`${this.renderBar(prefix)} {hex('73c1bf') ${rightJustify(percentage100, 3)}% }`
            : '';
        const columns = getColumns();
        const spinnerFrame = Math.round(ms / 80) % spinnerFramesLength;
        const spinner = (symbol || (this.timer && !logConfig.isDebug ? chalk.hex('73c1bf')(spinnerFrames[spinnerFrame]) : ''));
        const everythingButText = `${getDuration('PROGRESS', this.timer)}${prefix} ${progressBar}${spinner}`;
        const message = indentAllLines(wrap(text || '', columns));

        if (this.timer) {
            logUpdate([
                '',
                chalk.underline(' '.repeat(columns + logConfig.indent)),
                '',
                '',
                everythingButText,
                message,
                '\n'.repeat(4 - Math.ceil((text || '').length / columns))
            ].join('\n'));
            return;
        }

        process.stdout.write(message);
        process.stdout.write('\n');

        this.message = null;
    }

    success(message: string | null) {
        this.stop(message || 'Complete!', logSymbols.success);
    }

    fail(message: string | null) {
        this.stop(message || 'Failed.', logSymbols.error);
    }

    clear() {
        if (this.interval && !logConfig.isDebug) {
            logUpdate.clear();
        }
    }
}
