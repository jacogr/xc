(function() {
  const converter = new showdown.Converter({
    noHeaderId: true
  });

  Polymer({
    is: 'xc-markdown',
    properties: {
      markdown: {
        type: String,
        observer: '_markdownChanged'
      }
    },

    _markdownChanged: function() {
      this.innerHTML = this._render(this.markdown);
    },

    _render: function(markdown) {
      return converter.makeHtml(markdown);
    }
  });
})();
