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
    let scriptelem;
    let fixture;

    const testRender = function(markdown, expected) {
      element.setAttribute('markdown', markdown);
      expect(element.innerHTML).to.equal(expected);
    };

    beforeEach(() => {
      fixture = document.getElementById('fixture');
      fixture.create();

      element = document.getElementById('element');
      scriptelem = document.getElementById('scriptelement');
    });

    afterEach(() => {
      fixture.restore();
    });

    it('attaches the element', () => {
      expect(element).to.be.ok;
    });

    describe('formatting', () => {
      it('renders markdown via attribute', () => {
        testRender('# a heading', '<h1>a heading</h1>');
      });

      it('renders markdown via text/markdown script', () => {
        expect(scriptelem.innerHTML).to.equal('<p>Some <strong>embedded</strong> markdown</p>');
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
