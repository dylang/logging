var
  Util = require('util'),
  Style = require('./style'),
  NiceTime = require('./niceTime');


var TIMEZONE_OFFSET = (240 - (new Date).getTimezoneOffset()) * 60000;

function stdTimezoneOffset() {
  var fullYear = (new Date()).getFullYear();
  var jan = new Date(fullYear, 0, 1);
  var jul = new Date(fullYear, 6, 1);
  return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) * 60000;
}


TIMEZONE_OFFSET = TIMEZONE_OFFSET < stdTimezoneOffset() ? TIMEZONE_OFFSET + 3600000 : TIMEZONE_OFFSET;


var gLevel = parseInt(process.env.LOG || 4, 10);

if ( isNaN(gLevel) ) {
  console.warn("WARNING: no valid logger level set", process.env.LOG, "Use *all*");
  gLevel = 4;
}

process.env.LOG = gLevel;

function Log() {

  this._stdout = Log.stdout;
  this._stderr = Log.stderr;
  this._level = Log.level;

}

Log.stdout = Log.stdout || process.stdout;
Log.stderr = Log.stderr || process.stderr;
Log.level = Log.level || process.env.LOG;


Log.prototype = {

  stdout: function(std) {
    if ( arguments.length <= 0 ) return this._stdout;
    this._stdout = std;
  },

  stderr: function(std) {
    if ( arguments.length <= 0 ) return this._stderr;
    this._stderr = std;
  },

  level: function(l){
    if ( arguments.length <= 0 ) return this._level;
    this._level = parseInt(l, 10);
    if ( isNaN(this._level) ) {
      console.warn("WARNING: no valid logger level set", l, "Use *global*", Log.level);
      this._level = Log.level;
      return false;
    }
    Log.level = this._level;
    return true;
  },

  file: function(f) {
    if ( arguments.length <= 0 ) return this._file;
    this._file = f;
  },

  _writeLog: function(d, l) {

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

    var res = this.stdout().write(d + '\n');
    if ( l == 1 ) {
      this.stderr().write(d + '\n');
    }

    // this is the first time stdout got backed up
    if (!res && !this.stdout().pendingWrite) {
      this.stdout().pendingWrite = true;

      // magic sauce: keep node alive until stdout has flushed
      this.stdout().once('drain', function () {
        this.stdout().draining = false;
      });
    }
  },


  error: function(){
    var cur_level = 1;
    if ( cur_level > this.level() ) return;
    var str = record(arguments, this.file(), cur_level);
    return this._writeLog(str, cur_level);
  },

  warn: function(){
    var cur_level = 2;
    if ( cur_level > this.level() ) return;
    var str = record(arguments, this.file(), cur_level);
    return this._writeLog(str, cur_level);
  },
  info: function(){
    var cur_level = 3;
    if ( cur_level > this.level() ) return;
    var str = record(arguments, this.file(), cur_level);
    return this._writeLog(str, cur_level);
  },
  debug: function(){
    var cur_level = 4;
    if ( cur_level > this.level() ) return;
    var str = record(arguments, this.file(), cur_level);
    return this._writeLog(str, cur_level);
  }


};



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

  return niceTime + ' - '
    + (file ? '[' : '')
    + (file ? Style(Style.GREEN, file) : '')
    + (file ? '] - ' : '')
    + output.join(' ').replace(/\n/g, '\n' + '            ');

}



module.exports = {
  log: function() {
    return new Log();
  },
  from: function(obj) {
    var l = new Log();
    for( var p in obj ) {
      if ( obj.hasOwnProperty(p) ) {
        l[ p ] && l[ p ].apply && l[ p ].apply(l, [ obj[p] ] );
      }
    }
    return l;
  }
};

