(function() {
  const importComponent = function(base, _href, minified, cb) {
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

  const LoaderPrototype = Object.create(window.HTMLElement.prototype);

  LoaderPrototype.createdCallback = function() {
    const loaded = {};
    const components = this.getAttribute('components').split(',');
    const minified = this.getAttribute('minified') || false;
    const bootstrap = this.getAttribute('bootstrap');
    let base = this.getAttribute('base') || '';

    const loadcb = function(name, ok) {
      loaded[name] = ok;

      if (bootstrap && Object.keys(loaded).length === components.length) {
        window[bootstrap]();
      }
    };

    if (base.length && base[base.length - 1] !== '/') {
      base = `${base}/`;
    }

    components.forEach((_href) => {
      const href = _href.trim();

      importComponent(base, href, minified, loadcb);
    });
  };

  document.registerElement('xc-loader', {
    prototype: LoaderPrototype
  });
})();
