(function() {
  window.xc = window.xc || {};

  const UNITS = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const MAXDIV = UNITS.length - 1;
  const BASE = 1024;
  const TWOBASE = 2 * BASE - 1;
  const DECIMALS = 1;

  const format = function(_number) {
    if (!_.isNumber(_number)) {
      return '';
    }

    let number = _number;
    let unit = 0;

    while (number > TWOBASE && unit < MAXDIV) {
      number = number / BASE;
      unit++;
    }

    return {
      value: window.xc.formatNumber(number, DECIMALS, true),
      unit: UNITS[unit]
    };
  };

  window.xc.Bytes = {
    properties: {
      bytes: {
        type: Number,
        observer: '_setBytesStr'
      },
      bytesstr: {
        type: String
      },
      unitstr: {
        type: String
      }
    },

    _setBytesStr: function() {
      const fmt = format(this.bytes);

      this.bytesstr = fmt.value;
      this.unitstr = fmt.unit;
    }
  };

  Polymer({
    is: 'xc-bytes',
    behaviors: [
      window.xc.Bytes
    ]
  });
})();
