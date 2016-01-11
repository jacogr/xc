(function() {
  window.xc = window.xc || {};

  window.xc.GraphBar = {
    properties: {
      type: {
        type: String,
        value: 'bar'
      }
    }
  };

  Polymer({
    is: 'xc-graph-bar',
    behaviors: [
      window.xc.Graph,
      window.xc.GraphBar
    ]
  });
})();
