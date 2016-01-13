(function() {
  window.xc = window.xc || {};

  const converter = new showdown.Converter({ noHeaderId: true });

  const format = function(markdown) {
    return converter.makeHtml(markdown);
  };

  window.xc.Markdown = {
    properties: {
      markdown: {
        type: String,
        observer: '_markdownChanged'
      }
    },

    _markdownChanged: function() {
      this.innerHTML = format(this.markdown);
    },

    format: format
  };

  Polymer({
    is: 'xc-markdown',
    behaviors: [
      window.xc.Markdown
    ]
  });
})();
