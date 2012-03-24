
var Util = require('util'),
    Style = require('./style'),
    NiceTime = require('./niceTime'),
    history = [];

var clusterCPU = 'NODE_WORKER_ID' in process.env ? Style(Style.GREEN, process.env.NODE_WORKER_ID + '.')
    : 'CLUSTER_WORKER' in process.env ? Style(Style.GREEN, process.env.CLUSTER_WORKER + '.')
    : '';

var TIMEZONE_OFFSET = (240 - (new Date).getTimezoneOffset()) * 60000;


function stdTimezoneOffset() {
    var fullYear = (new Date()).getFullYear();
    var jan = new Date(fullYear, 0, 1);
    var jul = new Date(fullYear, 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset()) * 60000;
}

TIMEZONE_OFFSET = TIMEZONE_OFFSET < stdTimezoneOffset() ? TIMEZONE_OFFSET + 3600000 : TIMEZONE_OFFSET;

function writeLog(d) {

    var res = process.stdout.write(d + '\n');

    // this is the first time stdout got backed up
    if (!res && !process.stdout.pendingWrite) {
         process.stdout.pendingWrite = true;

         // magic sauce: keep node alive until stdout has flushed
         process.stdout.once('drain', function () {
         process.stdout.draining = false;
         });
    }
}

function record(messages, file) {

    var date = new Date();
    date.setTime(date - TIMEZONE_OFFSET);
    var niceTime = NiceTime(date);

    var output = [],
        keys = Object.keys(messages);

    keys.forEach(function(key) {

        var msg = messages[key];
        switch (typeof msg) {
            case 'string':
                output.push(Style(Style.WHITE, msg));
                break;
            case 'number':
                output.push(Style(Style.YELLOW, msg));
                break;
            case 'function':
                output.push(Style(Style.YELLOW_BOLD, msg.toString()));
                break;
            default:
                msg = Util.inspect(msg, false, 6, true);
                if (msg.length > 80) {
                    msg = ("\n" + msg).split(/\n/).join("\n    ");
                }
                output.push(msg);
                break;
        }
    });

    writeLog(niceTime + ' - '
            + (file ? '[' : '')
            + clusterCPU
            + (file ? Style(Style.GREEN, file) : '')
            + (file ? '] - ' : '')
            + output.join(' ').replace(/\n/g, '\n' + '            '));


    history.push({
        date: date,
        niceTime: niceTime,
        file: file,
        messages: messages
    });

    if (history.length > 100) {
        history = [];
    }
}

var Log = exports = module.exports = function Log() {

    return record(arguments);
};


Log.from = function(path) {

    var file = path.split('/').pop().split('.')[0];
    var log_function = function() { record(arguments, file); };
    log_function.history = function(){ return history;};
    log_function.array = function(array) { record(array, file);};
    return log_function;
};


