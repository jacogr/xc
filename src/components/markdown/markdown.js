(function() {
  window.xc = window.xc || {};

  const converter = new showdown.Converter({
    noHeaderId: true
  });

  window.xc.Markdown = {
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
  };

  Polymer({
    is: 'xc-markdown',
    behaviors: [
      window.xc.Markdown
    ]
  });
})();
