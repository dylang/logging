'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require('chalk');

var _prettyFormat = require('@ava/pretty-format');

var _prettyFormat2 = _interopRequireDefault(_prettyFormat);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var time = function time() {
    var now = new Date();
    var date = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return date.toISOString().replace(/.*T(.*)Z/, '$1');
};

var logger = function logger(_ref) {
    var title = _ref.title,
        messages = _ref.messages,
        logFunction = _ref.logFunction;

    var formattedMessages = messages.map(function (message) {
        if (typeof message === 'string') {
            return message;
        }
        return (0, _prettyFormat2.default)(message, {
            highlight: true,
            min: true,
            theme: {
                tag: 'cyan',
                content: 'reset',
                prop: 'yellow',
                value: 'green',
                number: 'green',
                string: 'reset', //
                date: 'green', //
                symbol: 'red',
                regex: 'red',
                function: 'blue',
                error: 'red',
                boolean: 'yellow', //
                label: 'blue',
                bracket: 'grey',
                comma: 'grey',
                misc: 'grey',
                key: 'cyan'
            }
        });
    });
    logFunction.apply(undefined, [(0, _chalk.gray)(time()), `[${title}]`].concat(_toConsumableArray(formattedMessages)));
};

var createLogger = function createLogger(title) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$debugFunction = _ref2.debugFunction,
        debugFunction = _ref2$debugFunction === undefined ? (0, _debug2.default)(title) : _ref2$debugFunction,
        _ref2$logFunction = _ref2.logFunction,
        logFunction = _ref2$logFunction === undefined ? console.log : _ref2$logFunction;

    return {
        debug() {
            for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
                messages[_key] = arguments[_key];
            }

            logger({
                title: (0, _chalk.yellow)(`DEBUG ${title}`),
                messages,
                logFunction: debugFunction
            });
        },
        info() {
            for (var _len2 = arguments.length, messages = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                messages[_key2] = arguments[_key2];
            }

            logger({
                title: (0, _chalk.blue)(title),
                messages,
                logFunction
            });
        },
        warn() {
            for (var _len3 = arguments.length, messages = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                messages[_key3] = arguments[_key3];
            }

            logger({
                title: (0, _chalk.yellow)(`WARNING ${title}`),
                messages,
                logFunction
            });
        },
        error() {
            for (var _len4 = arguments.length, messages = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                messages[_key4] = arguments[_key4];
            }

            logger({
                title: (0, _chalk.red)(`ERROR ${title}`),
                messages,
                logFunction
            });
        },
        fatal() {
            for (var _len5 = arguments.length, messages = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                messages[_key5] = arguments[_key5];
            }

            logger({
                title: (0, _chalk.red)(`========= FATAL ${title} =========`),
                messages,
                logFunction
            });
        },
        trace() {
            for (var _len6 = arguments.length, messages = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                messages[_key6] = arguments[_key6];
            }

            logger({
                title: (0, _chalk.red)(`TRACE ${title}`),
                messages,
                logFunction
            });
        }

    };
};

exports.default = createLogger;