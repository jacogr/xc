describe('markdown', () => {
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

  describe('rendering', () => {
    it('renders markdown', () => {
      element.setAttribute('markdown', '## a heading');
      expect(element.innerHTML).to.equal('<h2>a heading</h2>');
    });

    it('acts on markdown changes', () => {
      element.setAttribute('markdown', '## a heading');
      expect(element.innerHTML).to.equal('<h2>a heading</h2>');

      element.setAttribute('markdown', '### another heading');
      expect(element.innerHTML).to.equal('<h3>another heading</h3>');
    });
  });
});
