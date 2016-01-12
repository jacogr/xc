(function() {
  window.xc = window.xc || {};

  const loadComponent = function(base, _href, minified, cb) {
    let href = `${base}${_href}`;
    const parts = href.split('/');

    if (parts[parts.length - 1] === '') {
      href = `${href}${parts[parts.length - 2]}`;
    }

    if (href.lastIndexOf('.html') !== href.length - 5) {
      href = `${href}${minified ? '.min' : ''}.html`;
    }

    const onload = function() {
      console.log(`OK: Loaded ${_href} as ${href}`);
      cb(_href, true);
    };

    const onerror = function() {
      console.error(`ERROR: Loading ${_href} as ${href}`);
      cb(_href, false);
    };

    const element = document.createElement('link');

    element.rel = 'import';
    element.href = href;
    element.onload = onload;
    element.onerror = onerror;

    document.head.appendChild(element);
  };

  const loadComponents = function(_base, components, minified, bootstrap) {
    const loaded = {};
    let base = _base || '';

    const loadcb = function(name, ok) {
      loaded[name] = ok;

      if (bootstrap && Object.keys(loaded).length === components.length) {
        window[bootstrap]();
      }
    };

    if (base.length && base[base.length - 1] !== '/') {
      base = `${base}/`;
    }

    _.each(components, (href) => {
      loadComponent(base, href, minified, loadcb);
    });
  };

  window.xc.Loader = {
    properties: {
      base: {
        type: String
      },
      bootstrap: {
        type: String
      },
      components: {
        type: Array,
        value: []
      },
      minified: {
        type: Boolean,
        value: false
      }
    },

    ready: function() {
      loadComponents(this.base, this.components, this.minified, this.boostrap);
    },

    load: loadComponents
  };

  Polymer({
    is: 'xc-loader',
    behaviors: [
      window.xc.Loader
    ]
  });
})();
