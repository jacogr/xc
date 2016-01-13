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

    ready: function() {
      // stolen from https://github.com/PolymerElements/marked-element/blob/master/marked-element.html
      if (!this.markdown) {
        const mdscript = Polymer.dom(this).querySelector('[type^="text/markdown"]');

        if (mdscript) {
          this.innerHTML = format(mdscript.textContent);
        }
      }
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
