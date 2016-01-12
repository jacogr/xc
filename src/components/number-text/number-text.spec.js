describe('number-text', () => {
  describe('formatter', () => {
    let formatter;

    beforeEach(() => {
      formatter = window.xc.NumberText.format;
    });

    it('attaches to window.xc.NumberText.format', () => {
      expect(formatter).to.be.a.function;
    });


    describe('invalid inputs', () => {
      it('ignores non-string & non-numbers', () => {
        expect(
          formatter(true)
        ).to.equal('');
      });

      it('accepts number inputs', () => {
        expect(
          formatter(123)
        ).not.to.equal('');
      });

      it('accepts number inputs as a string', () => {
        expect(
          formatter('123')
        ).not.to.equal('');
      });
    });

    describe('formatting', () => {
      it('formats 0 to zero', () => {
        expect(
          formatter(0)
        ).to.equal('zero');
      });

      it('formats 9 to nine', () => {
        expect(
          formatter(9)
        ).to.equal('nine');
      });

      it('formats 15 to fifteen', () => {
        expect(
          formatter(15)
        ).to.equal('fifteen');
      });

      it('formats 30 to thirty', () => {
        expect(
          formatter(30)
        ).to.equal('thirty');
      });

      it('formats 42 to fourty-two', () => {
        expect(
          formatter(42)
        ).to.equal('fourty-two');
      });

      it('formats 42 to four two (single)', () => {
        expect(
          formatter(42, true)
        ).to.equal('four two');
      });

      it('formats 523 to five-hundred and twenty-three', () => {
        expect(
          formatter(523)
        ).to.equal('five-hundred and twenty-three');
      });

      it('formats 123.45 correctly', () => {
        expect(
          formatter(123.45)
        ).to.equal('one-hundred and twenty-three point four five');
      });

      it('format 99700 to ninety-nine-thousand seven-hundred', () => {
        expect(
          formatter(99700)
        ).to.equal('ninety-nine-thousand seven-hundred');
      });

      it('formats numbers >99999 as singles', () => {
        expect(
          formatter(123456)
        ).to.equal('one two three four five six');
      });
    });
  });

  describe('element', () => {
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
  });
});
