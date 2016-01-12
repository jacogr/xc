(function() {
  window.xc = window.xc || {};

  window.xc.GraphLine = {
    properties: {
      type: {
        type: String,
        value: 'line'
      }
    }
  };

  Polymer({
    is: 'xc-graph-line',
    behaviors: [
      window.xc.Graph,
      window.xc.GraphLine
    ]
  });
})();
