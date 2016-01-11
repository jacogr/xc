describe('number', () => {
  let element;
  let fixture;

  const testRender = function(number, value, unit) {
    !_.isUndefined(number) && element.setAttribute('bytes', number);

    expect(element.textContent).to.equal(`${value} ${unit}`);
  };

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

  describe('formatting', () => {
    const K = 1024;
    const M = K * 1024;
    const G = M * 1024;
    const T = G * 1024;
    const P = T * 1024;
    const E = P * 1024;
    const Z = E * 1024;
    const Y = Z * 1024;

    it('renders < 2048 as bytes', () => {
      testRender(2047, '2,047', 'bytes');
    });

    it('renders kB', () => {
      testRender(2156, '2.1', 'kB');
    });

    it('renders MB', () => {
      testRender(2256 * K, '2.2', 'MB');
    });

    it('renders GB', () => {
      testRender(2256 * M, '2.2', 'GB');
    });

    it('renders TB', () => {
      testRender(2256 * G, '2.2', 'TB');
    });

    it('renders PB', () => {
      testRender(2256 * T, '2.2', 'PB');
    });

    it('renders EB', () => {
      testRender(2256 * P, '2.2', 'EB');
    });

    it('renders ZB', () => {
      testRender(2256 * E, '2.2', 'ZB');
    });

    it('renders YB', () => {
      testRender(2256 * Z, '2.2', 'YB');
    });

    it('renders YB (large)', () => {
      testRender(2256 * Y * K, '2,310,144', 'YB');
    });
  });

  describe('listeners', () => {
    it('acts on byte changes', () => {
      testRender(2047, '2,047', 'bytes');
      testRender(2048, '2', 'kB');
    });
  });
});
