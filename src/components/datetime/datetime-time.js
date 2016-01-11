(function() {
  Polymer({
    is: 'xc-time',
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
        value: '-mediumTime'
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

      this.dtformat = `${format}Time`;
    }
  });
})();
