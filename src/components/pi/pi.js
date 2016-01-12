(function() {
  window.xc = window.xc || {};

  // http://stephenbrooks.org/misc/jspi/decimal.html
  const convergedDecimals = function(a, b, safety, padded) {
    if (a.d[0] < 0) {
      const na = a.copy();
      a.invertSign();

      const nb = b.copy();
      b.invertSign();

      return `-${convergedDecimals(na, nb)}`;
    }

    let ret = `${a.d[0]}.`;

    for (let n = 1; n <= a.m - safety && a.d[n] === b.d[n]; n++) {
      ret += a.d[n];

      if (padded && n % 10 === 0) {
        ret += ' ';
      }
    }

    return ret;
  };

  const equalDecimals = function(a, b) {
    if (a.m !== b.m) {
      return 0;
    }

    for (let n = a.m; n >= 0; n--) {
      if (a.d[n] !== b.d[n]) {
        return 0;
      }
    }

    return 1;
  };

  function Decimal(digits) {
    this.d = new Array(digits);
    this.m = digits;

    for (let n = digits; n >= 0; n--) {
      this.d[n] = 0;
    }
  }

  Decimal.prototype.copy = function() {
    const ret = new Decimal(this.m);

    for (let n = this.m; n >= 0; n--) {
      ret.d[n] = this.d[n];
    }

    return ret;
  };

  Decimal.prototype.toString = function(padded) {
    if (this.d[0] < 0) {
      const x = this.copy();

      x.invertSign();

      return `-${x.toString()}`;
    }

    let ret = `${this.d[0]}.`;
    for (let n = 1; n <= this.m; n++) {
      ret += this.d[n];

      if (padded && n % 10 === 0) {
        ret += ' ';
      }
    }

    return ret;
  };

  Decimal.prototype.setValue = function(_x) {
    let x = _x;

    for (let n = 0; n <= this.m; n++) {
      this.d[n] = Math.floor(x);
      x -= this.d[n];
      x *= 10;
    }
  };

  Decimal.prototype.invertSign = function() { // The idea is to keep all the digits except d[0] from being negative
    for (let n = 0; n <= this.m; n++) {
      this.d[n] *= -1;

      for (let i = n; this.d[i] < 0 && i > 0; i--) {
        this.d[i] += 10;
        this.d[i - 1]--;
      }
    }
  };

  Decimal.prototype.addDecimal = function(x) {
    for (let n = this.m; n >= 0; n--) {
      this.d[n] += x.d[n];

      if (this.d[n] >= 10 && n > 0) {
        this.d[n] -= 10;
        this.d[n - 1]++;
      }
    }
  };

  Decimal.prototype.divideInt = function(x) {
    let r = 0;

    for (let n = 0; n <= this.m; n++) {
      r += this.d[n];
      const q = Math.floor(r / x);

      this.d[n] = q;
      r = (r - q * x) * 10;
    }
  };

  const calculate = function(digits, padded, cb) {
    let k = 0;
    const sum = new Decimal(digits + 10);

    const ta = new Decimal(digits + 10);
    ta.setValue(16);
    ta.divideInt(5);

    const tb = new Decimal(digits + 10);
    tb.setValue(-4);
    tb.divideInt(239);

    const loop = function() {
      // sum+=16*Math.pow(-1,k)/((2*k+1)*Math.pow(5,2*k+1))-4*Math.pow(-1,k)/((2*k+1)*Math.pow(239,2*k+1));

      const a = ta.copy();
      a.divideInt(2 * k + 1);

      const b = tb.copy();
      b.divideInt(2 * k + 1);

      const old = sum.copy();
      sum.addDecimal(a);
      sum.addDecimal(b);

      ta.invertSign();
      ta.divideInt(25);

      tb.invertSign();
      tb.divideInt(239 * 239);

      k++;

      if (!equalDecimals(sum, old)) {
        loop();
      } else {
        const pi = convergedDecimals(sum, old, 10, padded).trim();
        cb(pi);
      }
    };

    loop();
  };

  window.xc.Pi = {
    properties: {
      padded: {
        type: Boolean,
        value: false,
        observer: '_calculate'
      },
      digits: {
        type: Number,
        value: 10,
        observer: '_calculate'
      },
      pistr: {
        type: String
      }
    },

    _calculate: function() {
      if (!_.isNumber(this.digits) || this.digits < 0) {
        return;
      }

      if (this.digits <= 10) {
        this.pistr = '3.1415926535'.slice(0, 2 + this.digits);
        return;
      }

      this.busy = true;

      calculate(this.digits, this.padded, (str) => {
        this.pistr = str;
        this.busy = false;
      });
    },

    calculate: calculate
  };

  Polymer({
    is: 'xc-pi',
    behaviors: [
      window.xc.Pi
    ]
  });
})();
