(function() {
  window.test = {};
  window.test.linedata = {
    axis: ['January', 'February', 'March', 'April', 'May', 'June'],
    data: [
      { key: '1st', values: [65, 59, 80, 81, 32, 57] },
      { key: '2nd', values: [28, 48, 40, 19, 53, 43] },
      { key: '3rd', values: [38, 44, 50, 23, 64, 48] },
      { key: '4th', values: [23, 28, 30, 29, 37, 29] },
      { key: '5th', values: [20, 38, 34, 39, 75, 37] },
      { key: '6th', values: [18, 58, 25, 49, 48, 76] }
    ]
  };

  const checkHttps = function() {
    if (window.location.host.substr(-10) === '.github.io' && window.location.protocol !== 'https:') {
      window.location.protocol = 'https:';
      return false;
    }

    return true;
  };

  const lazyLoadPolymerAndElements = function() {
    // const elements = ['components/test/test.html'];
    //
    // elements.forEach(function(elementURL) {
    //   const elImport = document.createElement('link');
    //
    //   elImport.rel = 'import';
    //   elImport.href = elementURL;
    //
    //   document.head.appendChild(elImport);
    // });
  };

  const checkWebComponents = function() {
    const webComponentsSupported = ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template'));

    if (!webComponentsSupported) {
      const wcPoly = document.createElement('script');

      wcPoly.src = '';
      wcPoly.onload = lazyLoadPolymerAndElements;

      document.head.appendChild(wcPoly);
    } else {
      lazyLoadPolymerAndElements();
    }
  };

  checkHttps() && checkWebComponents();
})();
