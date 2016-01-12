(function() {
  window.xc = window.xc || {};

  window.xc.GraphPie = {
    properties: {
      type: {
        type: String,
        value: 'pie'
      }
    }
  };

  Polymer({
    is: 'xc-graph-pie',
    behaviors: [
      window.xc.Graph,
      window.xc.GraphPie
    ]
  });
})();
