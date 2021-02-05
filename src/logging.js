import chalk from 'chalk';
import nicelyFormat from 'nicely-format';
import createDebug from 'debug';

const time = () => {
    const now = new Date();
    const date = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));
    return date.toISOString().replace(/.*T(.*)Z/, '$1');
};

const indentText = (text) => text.replace(/^(?!\s+$)/gm, ' '.repeat(13)).trim();

const logger = ({
    title,
    messages,
    logFunction
}) => {
    const formattedMessages = messages.map((message) => {
        if (typeof message === 'string') {
            return message;
        }

        return nicelyFormat(message, {
            highlight: true,
            min: true,
            theme: {
                tag: 'cyan',
                content: 'reset',
                prop: 'yellow',
                value: 'green',
                number: 'green',
                string: 'reset',
                date: 'green',
                symbol: 'red',
                regex: 'red',
                function: 'blue',
                error: 'red',
                boolean: 'yellow',
                label: 'blue',
                bracket: 'grey',
                comma: 'grey',
                misc: 'grey',
                key: 'cyan'
            }
        });
    }).map((text) => indentText(text));
    logFunction(chalk.gray(time()), `[${title}]`, ...formattedMessages);
};

const createLogger = (title,
    {
        debugFunction = createDebug(title),
        logFunction = console.log
    } = {}) => {
    return {
        debug(...messages) {
            logger({
                title: chalk.yellow(`DEBUG ${title}`),
                messages,
                logFunction: debugFunction
            });
        },
        info(...messages) {
            logger({
                title: chalk.blue(title),
                messages,
                logFunction
            });
        },
        warn(...messages) {
            logger({
                title: chalk.yellow(`WARNING ${title}`),
                messages,
                logFunction
            });
        },
        error(...messages) {
            logger({
                title: chalk.red(`ERROR ${title}`),
                messages,
                logFunction
            });
        },
        fatal(...messages) {
            logger({
                title: chalk.red(`========= FATAL ${title} =========`),
                messages,
                logFunction
            });
        },
        trace(...messages) {
            logger({
                title: chalk.red(`TRACE ${title}`),
                messages,
                logFunction
            });
        }

    };
};

export default createLogger;

