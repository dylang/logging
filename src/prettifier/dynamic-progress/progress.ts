import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import LogUpdate from 'log-update';
import timeSpan from 'time-span';
import { clearInterval } from 'timers';
import { getColumns, logConfig } from '../../config';
import { rightJustify, wrap, indentAllLines } from '../layout';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinnerFramesLength = spinnerFrames.length;

export class Progress {
    private percentage = 0;
    private interval: NodeJS.Timer | null = null;
    private message: string | null = null;
    private label: string;
    private timestamp: string;
    private hidden = false;
    private logUpdate = LogUpdate.create(logConfig.destination);

    private startTime = timeSpan();

    constructor({ timestamp, label }: { timestamp: string; label: string }) {
        this.timestamp = timestamp;
        this.label = label;
        this.interval = setInterval(() => this.update(), 50);
    }

    public progress({ message, percentage }: { message: string; percentage: number }) {
        this.message = message;
        this.percentage = percentage;
    }

    private stop(message = this.message) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.message = message;
        this.update();
        this.logUpdate.done();
    }

    private renderBar() {
        const columns = getColumns();
        const progressBarLength = columns - stripAnsi(this.label).length - 10;
        const currentLength = Math.round(this.percentage * progressBarLength);
        const on = chalk.bgHex('73c1bf')(' '.repeat(currentLength));
        const off = chalk.bgWhite(' '.repeat(progressBarLength - currentLength));

        return `${on}${off}`;
    }

    private update() {
        if (this.hidden) {
            return;
        }

        const durationNs = this.startTime();
        const percentage100 = Math.round(this.percentage * 100);
        const progressBar =
            percentage100 > 0
                ? chalk`${this.renderBar()} {hex('73c1bf') ${rightJustify(String(percentage100), 3)}% }`
                : '';
        const columns = getColumns();
        const spinnerFrame = Math.round(durationNs / 80) % spinnerFramesLength;
        const spinner = chalk.hex('73c1bf')(spinnerFrames[spinnerFrame]);
        const everythingButText = `${this.timestamp}${this.label} ${progressBar}${spinner}`;
        const message = indentAllLines(wrap(this.message || '', columns));

        if (this.interval) {
            this.logUpdate(
                [
                    '',
                    chalk.underline(' '.repeat(columns + logConfig.indent)),
                    '',
                    '',
                    everythingButText,
                    message,
                    '\n'.repeat(4 - Math.ceil((message || '').length / columns))
                ].join('\n')
            );
        } else {
            this.logUpdate(`${this.timestamp}${this.label} ${message.trim()}`);
        }
    }

    public success(message: string | null) {
        this.stop(message || 'Complete!'); // , logSymbols.success);
    }

    public fail(message: string | null) {
        this.stop(message || 'Failed.'); // , logSymbols.error);
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
            this.update();
        }
    }
}
