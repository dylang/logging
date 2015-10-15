
var Util = require('util'),
    Style = require('./style'),
    NiceTime = require('./niceTime'),
    Cluster = require('cluster');

var isWorker = Cluster.isWorker && Cluster.worker;

var clusterCPU = isWorker ? Cluster.worker.id
    : 'CLUSTER_UNIQUE_ID' in process.env ? process.env.CLUSTER_UNIQUE_ID
    : 'NODE_WORKER_ID' in process.env ? process.env.NODE_WORKER_ID
    : 'CLUSTER_WORKER' in process.env ? process.env.CLUSTER_WORKER
    : '';

clusterCPU = clusterCPU ? Style(Style.GREEN, clusterCPU + '.') : '';

var TIMEZONE_OFFSET = (240 - (new Date).getTimezoneOffset()) * 60000;


var Level = parseInt(process.env.LOG || 4, 10);

if ( isNaN(Level) ) {
    console.warn("WARNING: no valid logger level set", process.env.LOG, "Use *all*");
    Level = 4;
}


function stdTimezoneOffset() {
    var fullYear = (new Date()).getFullYear();
    var jan = new Date(fullYear, 0, 1);
    var jul = new Date(fullYear, 6, 1);
    return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) * 60000;
}

TIMEZONE_OFFSET = TIMEZONE_OFFSET < stdTimezoneOffset() ? TIMEZONE_OFFSET + 3600000 : TIMEZONE_OFFSET;

function writeLog(d, l) {

    var lvl = "";
    if ( l == 1 ) {
      lvl = Style(Style.RED, "ERROR") + ": ";
    } else if ( l == 2 ) {
      lvl = Style(Style.YELLOW, "WARN") + ": ";
    } else if ( l == 3 ) {
      lvl = Style(Style.BLUE, "INFO") + ": ";
    } else {
      lvl = Style(Style.WHITE, "LOG") + ": ";
    }

    d = lvl + d;

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

function record(messages, file, l) {

    if ( l > Level ) { return; }

    var date = new Date();
    date.setTime(date - TIMEZONE_OFFSET);
    var niceTime = NiceTime(date);

    var output = [],
        keys = Object.keys(messages);

    keys.forEach(function(key) {

        var msg = messages[key];
        switch (typeof msg) {
            case 'string':
                var length = msg.length;
                if (length && msg[0] === '(' && msg[length - 1] === ')') {
                    output.push(Style(Style.CYAN, msg.substring(1, length - 1)));
                } else if (length && msg[0] === '[' && msg[length - 1] === ']') {
                    output.push(Style(Style.BLUE, msg.substring(1, length - 1)));
                } else if (length && msg[0] === '{' && msg[length - 1] === '}') {
                    output.push(Style(Style.MAGENTA, msg.substring(1, length - 1)));
                } else if (length && msg[0] === '*' && msg[length - 1] === '*') {
                    output.push(Style(Style.RED, msg));
                } else if (length && msg[0] === '!' && msg[length - 1] === '!') {
                    output.push(Style(Style.RED_BOLD, msg));

                } else if (length && msg.substr(0, 7) === 'http://') {
                        output.push(Style(Style.UNDERLINE, msg));
                    } else {
                    output.push(Style(Style.WHITE, msg));
                }
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
            + output.join(' ').replace(/\n/g, '\n' + '            '), l);

}

function extendsLogFn(fn, file) {
  var functions = {
    error: function(){
      record(arguments, file, 1);
    },
    warn: function(){
      record(arguments, file, 2);
    },
    info: function(){
      record(arguments, file, 3);
    },
    debug: function(){
      record(arguments, file, 4);
    }
  };
  return Util._extend(fn, functions);
}


var Log = exports = module.exports = function Log() {
    return record(arguments);
};


Log.from = function(path) {
    var file = path.split('/').pop().split('.')[0];
    var log_function = function() { record(arguments, file); };
    log_function.array = function(array) { record(array, file);};
    return extendsLogFn(log_function, file);
};

extendsLogFn(Log);
