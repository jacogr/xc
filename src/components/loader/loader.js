(function() {
  const importComponent = function(base, _href, minified) {
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
    };

    const onerror = function() {
      console.error(`ERROR: Loading ${_href} as ${href}`);
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
    const components = this.getAttribute('components');
    const minified = this.getAttribute('minified') || false;
    let base = this.getAttribute('base') || '';

    if (!components) {
      return;
    }

    if (base.length && base[base.length - 1] !== '/') {
      base = `${base}/`;
    }

    components.split(',').forEach((_href) => {
      importComponent(base, _href.trim(), minified);
    });
  };

  document.registerElement('xc-loader', {
    prototype: LoaderPrototype
  });
})();
