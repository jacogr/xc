## xc-loader

Loads a number of components as specified with HTML imports

### usage

    <link rel="import" href="<path>/loader/loader.html"/>
    <xc-loader components="component1,component2,..." [base="<basepath>"] [minified]></xc-loader>

eg.

    <xc-loader components="components/3rdparty/polymer.html,components/test/test.html"></xc-loader>
    <xc-loader base="components/" components="3rdparty/polymer.html,test/test.html"></xc-loader>
    <xc-loader base="components/" components="3rdparty/polymer,test/"></xc-loader>

components - a string list of the components you wish to load. Components with a '/' at the end will append the component name automatically, e.g. `test/` becomes `test/test.html`. Leaving off the extension will automatically add `.html`.

base - the actual basepath (prepended to all components)

minified - adds .min.html when the extension is not specified for a component as opposed to the default .html
