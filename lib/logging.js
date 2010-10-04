
var sys = require('sys'),
    Color = require('./color'),
    Style = require('./style'),
    NiceTime = require('./niceTime'),
    history = [],
    ready;

var TIMEZONE_OFFSET = (240 - (new Date).getTimezoneOffset()) * 60000;

function record(messages, func, file) {

    var date = new Date();
    date.setTime(date - TIMEZONE_OFFSET);

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

    console.log(
        (Style(Style.CYAN, NiceTime(date))) + ' '
        + (file ? Style(Style.GREEN, file) + ' ' : '')
        + (func ? Style(Style.CYAN, func) + ' ' : '')
        + output.join(' ')
        );


    history.push({
        date: date,
        file: file,
        messages: messages
    });
}

function calledFrom(args) {
    return !args ? false : (args.name && args.name != 'forEach' ? args.name : calledFrom(args.caller));
}



var Log = exports = module.exports = function Log() {
    return record(arguments, calledFrom(arguments.callee));
};


Log.from = function(path) {

    var file = path.split('/').pop().split('.')[0];
    var log_function = function() { record(arguments, calledFrom(arguments.callee), file); };
    log_function.history = function(){ return history;};
    return log_function;
};




if (!ready) {
    record(['ready'], false, 'log');
    ready = true;
}