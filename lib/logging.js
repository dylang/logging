
var sys = require('sys'),
    Color = require('./color'),
    Style = require('./style'),
    NiceTime = require('./niceTime'),
    history = [],
    ready;

var TIMEZONE_OFFSET = (240 - (new Date).getTimezoneOffset()) * 60000;

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

function record(messages, func, file) {

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
                msg = sys.inspect(msg, false, 6, true);
                if (msg.length > 80) {
                    msg = ("\n" + msg).split(/\n/).join("\n    ");
                }
                output.push(msg);
                break;
        }
    });

    writeLog(niceTime + ' - '
            + (file || func ? '[' : '')
            + (file ? Style(Style.GREEN, file) : '')
            + (file && func ? '.' : '')
            + (func ? Style(Style.GREEN, func) : '')
            + (file || func ? '] - ' : '')
            + output.join(' ').replace(/\n/g, '\n' + '            '));


    history.push({
        date: date,
        niceTime: niceTime,
        file: file,
        func: func,
        messages: messages
    });

    if (history.length > 10000) {
        history = [];
    }
}

function calledFrom(args, count) {
    return !args || count > 3 ? false : (args.name && args.name != 'forEach' ? args.name : calledFrom(args.caller, count ? count + 1: 1));
}



var Log = exports = module.exports = function Log() {
    return record(arguments, calledFrom(arguments.callee));
};


Log.from = function(path) {

    var file = path.split('/').pop().split('.')[0];
    var log_function = function() { record(arguments, arguments.callee ? calledFrom(arguments.callee) : false, file); };
    log_function.history = function(){ return history;};
    log_function.array = function(array) { record(array, arguments.callee ? calledFrom(arguments.callee) : false, file);};
    return log_function;
};




if (!ready) {
    //record(['ready'], false, 'log');
    ready = true;
}