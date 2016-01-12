describe('number', () => {
  describe('formatter', () => {
    let formatter;

    beforeEach(() => {
      formatter = window.xc.Bytes.format;
    });

    const testFormat = function(number, value, unit) {
      const fmt = formatter(number);

      expect(fmt.value).to.equal(value);
      expect(fmt.unit).to.equal(unit);
    };

    const K = 1024;
    const M = K * 1024;
    const G = M * 1024;
    const T = G * 1024;
    const P = T * 1024;
    const E = P * 1024;
    const Z = E * 1024;
    const Y = Z * 1024;

    it('exists', () => {
      expect(formatter).to.be.a.function;
    });

    it('ignores invalid numbers', () => {
      testFormat('1234', undefined, undefined);
    });

    it('renders < 2048 as bytes', () => {
      testFormat(2047, '2,047', 'bytes');
    });

    it('renders kB', () => {
      testFormat(2256, '2.2', 'kB');
    });

    it('renders MB', () => {
      testFormat(2256 * K, '2.2', 'MB');
    });

    it('renders GB', () => {
      testFormat(2256 * M, '2.2', 'GB');
    });

    it('renders TB', () => {
      testFormat(2256 * G, '2.2', 'TB');
    });

    it('renders PB', () => {
      testFormat(2256 * T, '2.2', 'PB');
    });

    it('renders EB', () => {
      testFormat(2256 * P, '2.2', 'EB');
    });

    it('renders ZB', () => {
      testFormat(2256 * E, '2.2', 'ZB');
    });

    it('renders YB', () => {
      testFormat(2256 * Z, '2.2', 'YB');
    });

    it('renders YB (large)', () => {
      testFormat(2256 * Y * K, '2,310,144', 'YB');
    });
  });

  describe('element', () => {
    let element;
    let fixture;

    const testFormat = function(number, value, unit) {
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

    it('formats a byte string correctly', () => {
      testFormat(2047000, '1,999', 'kB');
    });

    it('acts on byte changes', () => {
      testFormat(2047, '2,047', 'bytes');
      testFormat(2048, '2', 'kB');
    });
  });
});
