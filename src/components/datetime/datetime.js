(function() {
  window.xc = window.xc || {};

  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const pad = function(num) {
    return `0${num || 0}`.slice(-2);
  };

  const format = function(time, fmt) {
    const day = time.getDay();
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    return fmt.replace(/%([%aAbBcdDhHIlmMpPsStwyYZz])/g, (val, modifier) => {
      let match;

      switch (modifier) {
        case '%': return '%';
        case 'a': return WEEKDAYS[day].slice(0, 3);
        case 'A': return WEEKDAYS[day];
        case 'b': return MONTHS[month].slice(0, 3);
        case 'B': return MONTHS[month];
        case 'c': return Math.floor(year / 100);
        case 'd': return date;
        case 'D': return pad(date);
        case 'h': return hour;
        case 'H': return pad(hour);
        case 'I': return pad(format(time, '%l'));
        case 'l': return (hour === 0 || hour === 12) ? 12 : (hour + 12) % 12;
        case 'm': return pad(month + 1);
        case 'M': return pad(minute);
        case 'p': return (hour > 11) ? 'pm' : 'am';
        case 'P': return (hour > 11) ? 'PM' : 'AM';
        case 's': return second;
        case 'S': return pad(second);
        case 't': return time.toString();
        case 'w': return day;
        case 'y': return pad(year % 100);
        case 'Y': return year;
        case 'Z':
          match = time.toString().match(/\((\w+)\)$/);
          return match ? match[1] : '';
        case 'z':
          match = time.toString().match(/\w([+-]\d\d\d\d) /);
          return match ? match[1] : '';
        default:
          return '';
      }
    });
  };

  const formatRemaining = function(ms) {
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);
    const month = Math.round(day / 30);
    const year = Math.round(month / 12);

    if (ms < 0 || sec < 10) {
      return 'just now';
    } else if (sec < 45) {
      return `${sec} seconds`;
    } else if (sec < 90) {
      return 'a minute ago';
    } else if (min < 45) {
      return `${min} minutes`;
    } else if (min < 90) {
      return 'an hour';
    } else if (hr < 24) {
      return `${hr} hours`;
    } else if (hr < 36) {
      return 'a day';
    } else if (day < 30) {
      return `${day} days`;
    } else if (day < 45) {
      return 'a month';
    } else if (month < 12) {
      return `${month} months`;
    } else if (month < 18) {
      return 'a year';
    }

    return `${year} years`;
  };

  const formatTextDate = function(date) {
    const f = function(fmt) {
      return window.xc.formatNumberText(format(date, fmt));
    };

    return `${f('%d')} ${format(date, '%B')} ${f('%c')} ${f('%y')}`;
  };

  const formatTextTime = function(date) {
    const f = function(fmt) {
      return window.xc.formatNumberText(format(date, fmt));
    };

    let min = format(date, '%M');

    if (min === '00') {
      min = `o'clock`;
    } else {
      min = `${min.indexOf('0') === 0 ? "o'" : ''}${window.xc.formatNumberText(min)}`;
    }

    return `${f('%l')} ${min} ${format(date, '%p')}`;
  };

  const fmtMediumDate = '%d %b %Y';
  const fmtMediumTime = '%H:%M';
  const fmtLongDate = '%D %B %Y';
  const fmtLongTime = '%H:%M:%S';

  window.xc.Datetime = {
    properties: {
      datetime: {
        type: String,
        observer: '_datetimeChanged'
      },
      format: {
        type: String,
        value: '-medium',
        observer: '_setDateStr'
      },
      date: {
        type: Date
      },
      datestr: {
        type: String
      }
    },

    _datetimeChanged: function() {
      const millis = Date.parse(this.datetime);

      this.date = _.isNaN(millis) ? null : new Date(millis);
      this._setDateStr();
    },

    _setDateStr: function() {
      this.datestr = this._format(this.date, this.format);
    },

    _format: function(date, _fmt) {
      if (!date || !_.isDate(date)) {
        return '';
      }

      let fmt = _fmt;

      fmt = fmt.replace(/-elapsed/g, () => formatRemaining(new Date().getTime() - date.getTime()));
      fmt = fmt.replace(/-remaining/g, () => formatRemaining(date.getTime() - new Date().getTime()));
      fmt = fmt.replace(/-textDate/g, () => formatTextDate(date));
      fmt = fmt.replace(/-textTime/g, () => formatTextTime(date));
      fmt = fmt.replace(/-text/g, `${formatTextDate(date)} ${formatTextTime(date)}`);
      fmt = fmt.replace(/-longDate/g, fmtLongDate);
      fmt = fmt.replace(/-longTime/g, fmtLongTime);
      fmt = fmt.replace(/-long/g, `${fmtLongDate} ${fmtLongTime}`);
      fmt = fmt.replace(/-mediumDate/g, fmtMediumDate);
      fmt = fmt.replace(/-mediumTime/g, fmtMediumTime);
      fmt = fmt.replace(/-medium/g, `${fmtMediumDate} ${fmtMediumTime}`);

      return format(date, fmt);
    }
  };

  Polymer({
    is: 'xc-datetime',
    behaviors: [
      window.xc.Datetime
    ]
  });
})();
