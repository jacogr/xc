(function() {
  window.xc = window.xc || {};

  window.xc.DatetimeRemaining = {
    properties: {
      format: {
        type: String,
        value: '-remaining'
      }
    }
  };

  Polymer({
    is: 'xc-time-remaining',
    behaviors: [
      window.xc.Datetime,
      window.xc.DatetimeRemaining
    ]
  });
})();
