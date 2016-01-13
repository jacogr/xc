(function() {
  window.xc = window.xc || {};

  const DATE_MEDIUM = 'D MMM YYYY';
  const TIME_MEDIUM = 'HH:mm';
  const DATE_LONG = 'DD MMMM YYYY';
  const TIME_LONG = 'HH:mm:ss';

  const format = function(datetime, _fmt) {
    const date = moment(datetime);
    const century = Math.floor(date.year() / 100);

    const ntf = function(fmt) {
      return window.xc.NumberText.format(date.format(fmt));
    };

    const formatTextDate = function() {
      const centurytext = window.xc.NumberText.format(century);

      return `${ntf('D')} ${date.format('MMMM')} ${centurytext} ${ntf('YY')}`;
    };

    const formatTextTime = function() {
      let min = date.format('mm');

      if (min === '00') {
        min = `o'clock`;
      } else {
        min = `${min.indexOf('0') === 0 ? "o'" : ''}${window.xc.NumberText.format(min)}`;
      }

      return `${ntf('h')} ${min} ${date.format('a')}`;
    };

    let fmt = _fmt;

    fmt = fmt.replace(/\(elapsed\)/g, () => `[${date.fromNow()}]`);
    fmt = fmt.replace(/\(remaining\)/g, () => `[${date.fromNow()}]`);
    fmt = fmt.replace(/\(textDate\)/g, () => `[${formatTextDate()}]`);
    fmt = fmt.replace(/\(textTime\)/g, () => `[${formatTextTime()}]`);
    fmt = fmt.replace(/\(text\)/g, () => `[${formatTextDate()} ${formatTextTime()}]`);
    fmt = fmt.replace(/\(longDate\)/g, DATE_LONG);
    fmt = fmt.replace(/\(longTime\)/g, TIME_LONG);
    fmt = fmt.replace(/\(long\)/g, `${DATE_LONG} ${TIME_LONG}`);
    fmt = fmt.replace(/\(mediumDate\)/g, DATE_MEDIUM);
    fmt = fmt.replace(/\(mediumTime\)/g, TIME_MEDIUM);
    fmt = fmt.replace(/\(medium\)/g, `${DATE_MEDIUM} ${TIME_MEDIUM}`);

    return date.format(fmt);
  };

  window.xc.Datetime = {
    properties: {
      datetime: {
        type: String,
        observer: '_setDateStr'
      },
      format: {
        type: String,
        value: '(medium)',
        observer: '_setDateStr'
      },
      date: {
        type: Date
      },
      datestr: {
        type: String
      }
    },

    _setDateStr: function() {
      this.datestr = format(this.datetime, this.format);
    },

    format: format
  };

  Polymer({
    is: 'xc-datetime',
    behaviors: [
      window.xc.Datetime
    ]
  });
})();
