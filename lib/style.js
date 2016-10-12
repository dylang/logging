

function Style() {

  this.disabled = false;

  this.color = Style.color.bind(this);
  this.disable = Style.disable.bind(this);

  return this;
}

Style.color = function color(color, text) {
  var disabled = false;
  if ( this instanceof Style ) {
    disabled = this.disabled;
  } else {
    disabled = Style.disabled;
  }
  return (disabled ? "" : color ) + text + (disabled ? "" : Style.RESET );
};

Style.disable = function(value) {
  if ( this instanceof Style ) {
    this.disabled = !!value;
  } else {
    Style.disabled = !!value;
  }
};

Style.disabled = false;

Style.RESET = '\x1B[0m';

Style.GREY =    '\x1B[0;30m';
Style.RED =     '\x1B[0;31m';
Style.GREEN =   '\x1B[0;32m';
Style.YELLOW =  '\x1B[0;33m';
Style.BLUE =    '\x1B[0;34m';
Style.MAGENTA = '\x1B[0;35m';
Style.CYAN =    '\x1B[0;36m';
Style.WHITE =   '\x1B[0;37m';

Style.UNDERLINE = '\033[4m';

Style.GREY_BOLD =    '\x1B[1;30m';
Style.RED_BOLD =     '\x1B[1;31m';
Style.GREEN_BOLD =   '\x1B[1;32m';
Style.YELLOW_BOLD =  '\x1B[1;33m';
Style.BLUE_BOLD =    '\x1B[1;34m';
Style.MAGENTA_BOLD = '\x1B[1;35m';
Style.CYAN_BOLD =    '\x1B[1;36m';
Style.WHITE_BOLD =   '\x1B[1;37m';

module.exports = Style;
