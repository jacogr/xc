describe('graph', () => {
  const PAUSE_DELAY = 5; // 000;

  let element;
  let fixture;

  beforeEach(() => {
    fixture = document.getElementById('fixture');
    fixture.create();

    element = document.getElementById('element');
  });

  afterEach(() => {
    fixture.restore();
  });

  it('attaches the element', () => {
    expect(element).to.be.ok;
  });

  describe('render', () => {
    let dataset;
    let datalist;

    beforeEach(() => {
      dataset = {
        xaxis: ['January', 'February', 'March', 'April', 'May', 'June'],
        fill: false,
        data: [
          { key: '1st', values: [65, 59, 80, 81, 32, 57] },
          { key: '2nd', values: [28, 48, 40, 19, 53, 43] },
          { key: '3rd', values: [38, 44, 50, 23, 64, 48] },
          { key: '4th', values: [23, 28, 30, 29, 37, 29] },
          { key: '5th', values: [20, 38, 34, 39, 75, 37], fill: true },
          { key: '6th', values: [18, 58, 25, 49, 48, 76] }
        ]
      };
      datalist = {
        data: [
          { key: '1st', value: 300 },
          { key: '2nd', value: 50 },
          { key: '3rd', value: 100 },
          { key: '4th', value: 75 },
          { key: '5th', value: 125 },
          { key: '6th', value: 187 }
        ]
      };
    });

    const renderTest = function(done, type, data) {
      element.setAttribute('type', type);
      element.setAttribute('data', JSON.stringify(data));

      setTimeout(done, PAUSE_DELAY);
    };

    it('renders a bar graph', (done) => {
      renderTest(done, 'bar', dataset);
    });

    it('renders a donut graph', (done) => {
      renderTest(done, 'donut', datalist);
    });

    it('renders a line graph', (done) => {
      renderTest(done, 'line', dataset);
    });

    it('renders a pie graph', (done) => {
      renderTest(done, 'pie', datalist);
    });
  });
});
