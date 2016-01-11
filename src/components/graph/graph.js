(function() {
  const makeDataset = function(data) {
    return _.map(data.data, (set, sidx) => {
      return {
        key: set.key || data.keys[sidx],
        area: _.get(set, 'fill', data.fill || false),
        fillOpacity: 0.25,
        values: _.map(set.values, (val, vidx) => {
          return { x: vidx, y: val };
        })
      };
    });
  };

  const makeDatalist = function(data) {
    return _.map(data.data, (set, sidx) => {
      return {
        key: set.key || data.keys[sidx],
        y: _.get(set, 'value', set)
      };
    });
  };

  const setupAxis = function(data, chart) {
    const xfmt = !data.xaxis ? d3.format(',r') : (d, idx) => data.xaxis[idx];
    const yfmt = d3.format(',r');

    chart.yAxis.tickFormat(yfmt);
    chart.xAxis.tickFormat(xfmt);
  };

  const createLineChart = function(data) {
    const chart = nv.models
      .lineChart()
      .options({
        transitionDuration: 300,
        useInteractiveGuideline: true
      });

    setupAxis(data, chart);

    return { chart: chart, data: makeDataset(data) };
  };

  const createPieChart = function(data) {
    const chart = nv.models
      .pieChart()
      .x((d) => d.key)
      .y((d) => d.y)
      .labelType('value');

    return { chart: chart, data: makeDatalist(data) };
  };

  const createDonutChart = function(data) {
    const obj = createPieChart(data);

    obj.chart.donut(true);

    return obj;
  };

  const createMultiBarChart = function(data) {
    const chart = nv.models
      .multiBarChart()
      .stacked(_.get(data, 'stacked', false));

    setupAxis(data, chart);

    return { chart: chart, data: makeDataset(data) };
  };

  const render = function(svg, type, _data) {
    nv.addGraph(() => {
      let obj;

      switch (type) {
        case 'bar': obj = createMultiBarChart(_data); break;
        case 'donut': obj = createDonutChart(_data); break;
        case 'line': obj = createLineChart(_data); break;
        case 'pie': obj = createPieChart(_data); break;
        default: break;
      }

      d3.select(svg)
        .datum(obj.data)
        .transition()
        .duration(1000)
        .call(obj.chart);

      nv.utils.windowResize(obj.chart.update);

      return obj.chart;
    });

    return true;
  };

  Polymer({
    is: 'xc-graph',
    properties: {
      data: {
        type: Object,
        observer: '_renderChart'
      },
      type: {
        type: String,
        observer: '_renderChart'
      }
    },

    _renderChart: function() {
      this._render(this.$.svg, this.type, this.data);
    },

    _render: function(svg, type, data) {
      if (!type || !data) {
        return false;
      }

      return render(svg, type, data);
    }
  });
})();
