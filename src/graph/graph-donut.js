(function() {
  window.xc = window.xc || {};

  window.xc.GraphDonut = {
    properties: {
      type: {
        type: String,
        value: 'donut'
      }
    }
  };

  Polymer({
    is: 'xc-graph-donut',
    behaviors: [
      window.xc.Graph,
      window.xc.GraphDonut
    ]
  });
})();
