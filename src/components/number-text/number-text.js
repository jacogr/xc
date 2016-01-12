(function() {
  window.xc = window.xc || {};

  const DIGITS = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ];
  const TENS = ['zero', 'ten', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  const digit = function(num) {
    return DIGITS[Math.floor(num)];
  };

  const frac = function(num) {
    if (!(num % 1)) {
      return '';
    }

    const fixed = `${num.toFixed(2) * 1}`;
    return ` point ${window.xc.NumberText.format(fixed.split('.')[1], true)}`;
  };

  const format = function(_number, single) {
    let number;

    if (_.isString(_number)) {
      number = _.parseInt(_number);
    } else if (_.isNumber(_number)) {
      number = _number;
    } else {
      return '';
    }

    let str = '';

    if (single || number > 99999) {
      while (number > 0) {
        const mod = number % 10;

        str = `${digit(mod)}${str.length ? ' ' : ''}${str}`;
        number = (number - mod) / 10;
      }

      return `${str.length ? str : digit(0)}${frac(number)}`;
    }

    const thousand = Math.floor(number / 1000);
    number = number % 1000;

    if (thousand) {
      str = `${format(thousand)}-thousand`;

      if (number <= 0) {
        return `${str}${frac(number)}`;
      }

      str = `${str} `;
    }

    const hundred = Math.floor(number / 100);
    number = number % 100;

    if (hundred) {
      str = `${str}${digit(hundred)}-hundred`;

      if (number <= 0) {
        return `${str}${frac(number)}`;
      }

      str = `${str} and `;
    }

    if (number < 20) {
      return `${str}${digit(number)}${frac(number)}`;
    }

    const remain = number % 10;
    const ten = (number - remain) / 10;

    if (ten) {
      str = `${str}${TENS[ten]}`;

      if (remain <= 0) {
        return `${str}${frac(remain)}`;
      }

      str = `${str}-`;
    }

    return `${str}${digit(remain)}${frac(remain)}`;
  };

  window.xc.NumberText = {
    properties: {
      number: {
        type: Number,
        observer: '_setNumberTextStr'
      },
      single: {
        type: Boolean,
        value: false,
        observer: '_setNumberTextStr'
      },
      numbertextstr: {
        type: String
      }
    },

    _setNumberTextStr: function() {
      this.numbertextstr = format(this.number, this.single);
    },

    format: format
  };

  Polymer({
    is: 'xc-number-text',
    behaviors: [
      window.xc.NumberText
    ]
  });
})();
