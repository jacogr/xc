(function() {
  window.xc = window.xc || {};

  window.xc.DatetimeDate = {
    properties: {
      datetime: {
        type: Object
      },
      format: {
        type: String,
        value: '-medium',
        observer: '_formatChanged'
      },
      dtformat: {
        type: String,
        value: '-mediumDate'
      }
    },

    _formatChanged: function() {
      let format;

      if (_.includes(this.format, '-long')) {
        format = '-long';
      } else if (_.includes(this.format, '-text')) {
        format = '-text';
      } else {
        format = '-medium';
      }

      this.dtformat = `${format}Date`;
    }
  };

  Polymer({
    is: 'xc-date',
    behaviors: [
      window.xc.DatetimeDate
    ]
  });
})();
