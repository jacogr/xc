describe('datetime', () => {
  const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

  let element;
  let fixture;

  const testRender = function(datetime, format, expected) {
    !_.isUndefined(datetime) && element.setAttribute('datetime', datetime);
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

  describe('formatting with shorthand', () => {
    it('formats using -elapsed', () => {
      testRender(new Date(Date.now() - TWO_DAYS), '-elapsed', '2 days');
    });

    it('formats using -remaining', () => {
      testRender(new Date(Date.now() + TWO_DAYS), '-remaining', '2 days');
    });

    it('formats using -mediumDate', () => {
      testRender(new Date('2016-01-08T06:55:23+02:00'), '-mediumDate', '8 Jan 2016');
    });

    it('formats using -mediumDate -longTime %P (combined)', () => {
      testRender(new Date('2016-01-08T06:55:23+02:00'), '-mediumDate -longTime %P', '8 Jan 2016 06:55:23 AM');
    });

    it('formats via number-text with -textDate', () => {
      testRender(new Date('2016-01-08T06:55:23+02:00'), '-textDate', 'eight January twenty sixteen');
    });

    describe('formats via number-text with -textTime', () => {
      it(`formats 06:00 to six o'clock am`, () => {
        testRender(new Date('2016-01-08T06:00:23+02:00'), '-textTime', `six o'clock am`);
      });

      it(`formats 12:01 to twelve o'one pm`, () => {
        testRender(new Date('2016-01-08T12:01:23+02:00'), '-textTime', `twelve o'one pm`);
      });

      it('formats 21:57 to nine fifty-seven pm', () => {
        testRender(new Date('2016-01-08T21:57:23+02:00'), '-textTime', 'nine fifty-seven pm');
      });
    });
  });

  describe('listeners', () => {
    it('acts on datetime changes', () => {
      testRender('2016-01-08T06:55:23+02:00', undefined, '8 Jan 2016 06:55');
      testRender('2016-01-08T07:13:42+02:00', undefined, '8 Jan 2016 07:13');
    });

    it('acts on format changes', () => {
      testRender('2016-01-08T06:55:23+02:00', '-mediumDate', '8 Jan 2016');
      testRender(undefined, '-mediumTime', '06:55');
    });
  });
});
