describe('markdown', () => {
  describe('formatter', () => {
    let formatter;

    beforeEach(() => {
      formatter = window.xc.Markdown.format;
    });

    it('exists', () => {
      expect(formatter).to.be.a.function;
    });

    it('formats markdown to HTML', () => {
      expect(formatter('# a h1 heading')).to.equal('<h1>a h1 heading</h1>');
    });
  });

  describe('element', () => {
    let element;
    let fixture;

    const testRender = function(markdown, expected) {
      element.setAttribute('markdown', markdown);
      expect(element.innerHTML).to.equal(expected);
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
      it('renders markdown', () => {
        testRender('# a heading', '<h1>a heading</h1>');
      });
    });

    describe('listeners', () => {
      it('acts on markdown changes', () => {
        testRender('## another heading', '<h2>another heading</h2>');
        testRender('### yet another heading', '<h3>yet another heading</h3>');
      });
    });
  });
});
