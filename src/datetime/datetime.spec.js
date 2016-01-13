describe('datetime', () => {
  const TWO_DAYS = 2 * 24 * 60 * 60 * 1000;

  describe('formatter', () => {
    let formatter;

    beforeEach(() => {
      formatter = window.xc.Datetime.format;
    });

    const testFormat = function(date, fmt, expected) {
      expect(formatter(date, fmt)).to.equal(expected);
    };

    it('exists', () => {
      expect(formatter).to.be.a.function;
    });

    describe('shorthand', () => {
      const TS = '2016-01-03 06:09:15';

      it('formats using (mediumDate)', () => {
        testFormat(TS, '(mediumDate)', '3 Jan 2016');
      });

      it('formats using (mediumTime)', () => {
        testFormat(TS, '(mediumTime)', '06:09');
      });

      it('formats using (medium)', () => {
        testFormat(TS, '(medium)', '3 Jan 2016 06:09');
      });

      it('formats using (longDate)', () => {
        testFormat(TS, '(longDate)', '03 January 2016');
      });

      it('formats using (longTime)', () => {
        testFormat(TS, '(longTime)', '06:09:15');
      });

      it('formats using (long)', () => {
        testFormat(TS, '(long)', '03 January 2016 06:09:15');
      });
    });

    describe('offsets', () => {
      it('formats using (elapsed)', () => {
        testFormat(Date.now() - TWO_DAYS, '(elapsed)', '2 days ago');
      });

      it('formats using (remaining)', () => {
        testFormat(Date.now() + TWO_DAYS, '(remaining)', 'in 2 days');
      });
    });

    describe('text', () => {
      const TS = '2016-01-13 06:59';

      it('formats using (textDate)', () => {
        testFormat(TS, '(textDate)', 'thirteen January twenty sixteen');
      });

      it('formats using (textTime)', () => {
        testFormat(TS, '(textTime)', 'six fifty-nine am');
      });

      it('formats using (text)', () => {
        testFormat(TS, '(text)', 'thirteen January twenty sixteen six fifty-nine am');
      });
    });
  });

  describe('element', () => {
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

    describe('listeners', () => {
      it('acts on datetime changes', () => {
        testRender('2016-01-08T06:55:23+02:00', undefined, '8 Jan 2016 06:55');
        testRender('2016-01-08T07:13:42+02:00', undefined, '8 Jan 2016 07:13');
      });

      it('acts on format changes', () => {
        testRender('2016-01-08T06:55:23+02:00', '(mediumDate)', '8 Jan 2016');
        testRender(undefined, '(mediumTime)', '06:55');
      });
    });
  });
});
