describe('number', () => {
  describe('formatter', () => {
    let formatter;

    beforeEach(() => {
      formatter = window.xc.Number.format;
    });

    it('attaches to window.xc.Number.format', () => {
      expect(formatter).to.be.a.function;
    });


    describe('inputs', () => {
      it('ignores non-string & non-numbers', () => {
        expect(
          formatter(true, 2)
        ).to.equal('');
      });

      it('accepts number inputs', () => {
        expect(
          formatter(123, 2)
        ).to.equal('123.00');
      });

      it('drops the decimals when 0 and drop specified', () => {
        expect(
          formatter(123, 2)
        ).to.equal('123.00');
        expect(
          formatter(456, 2, true)
        ).to.equal('456');
      });
    });
  });

  describe('element', () => {
    let element;
    let fixture;

    const testRender = function(number, format, expected) {
      !_.isUndefined(number) && element.setAttribute('number', number);
      !_.isUndefined(format) && element.setAttribute('format', format);

      expect(element.textContent).to.equal(expected);
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
      it('renders with 2 decimals (default)', () => {
        testRender('98765.4321', undefined, '98,765.43');
      });

      it('renders with 5 decimals', () => {
        testRender('12345.6789', '5', '12,345.67890');
      });

      it('renders with number-text with -text', () => {
        testRender(142, '-text', 'one-hundred and fourty-two');
      });
    });

    describe('listeners', () => {
      it('acts on number changes', () => {
        testRender('98765.4321', undefined, '98,765.43');
        testRender('12345.6789', undefined, '12,345.68');
      });

      it('acts on format changes', () => {
        testRender('12345.6789', '5', '12,345.67890');
        testRender(undefined, '3', '12,345.679');
      });
    });
  });
});
