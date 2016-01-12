## xc

A collection of web components built on Polymer


### components

The following components are available in `<name>/<name>.html`

- [bytes](bytes/)
- [datetime](datetime/)
- [graph](graph/)
- [loader](loader/)
- [markdown](markdown/)
- [number](number/)
- [number-text](number-text/)
- [pi](pi/)


### 3rdparty

In addition the following 3rd party components are available and used internally. They all pull their dependencies from the bower component directories and as such is specified as dependencies in `bower.json`.

- 3rdparty/d3.html
- 3rdparty/lodash.html
- 3rdparty/moment.html
- 3rdparty/nvd3.html
- 3rdparty/polymer.html
- 3rdparty/showdown.html

### development/production

Components are available in both a `.html` and `.min.html` version, for production (i.e. real-world) it is advisable to use the minified version. For debugging the normal version can be employed.
