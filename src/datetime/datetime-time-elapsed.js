(function() {
  window.xc = window.xc || {};

  window.xc.DatetimeElapsed = {
    properties: {
      format: {
        type: String,
        value: '(elapsed)'
      }
    }
  };

  Polymer({
    is: 'xc-time-elapsed',
    behaviors: [
      window.xc.Datetime,
      window.xc.DatetimeElapsed
    ]
  });
})();
