# debugpp

A namespaced logging package with semantical subspaces (log, warn, error)

[![Build Status](https://travis-ci.org/mprinc/debugpp.svg)](https://travis-ci.org/mprinc/debugpp)
[![Dependency Status](https://david-dm.org/mprinc/debugpp.svg)](https://david-dm.org/mprinc/debugpp)
[![Coverage Status](https://img.shields.io/coveralls/mprinc/debugpp.svg)](https://coveralls.io/r/mprinc/debugpp)
[![Gittip](http://img.shields.io/gittip/mprinc.png)](https://www.gittip.com/mprinc/)

[![NPM](https://nodei.co/npm/debugpp.png?downloads=true&stars=true)](https://nodei.co/npm/debugpp/)

This package augments [debug]{@link https://www.npmjs.com/package/debug} nodejs package

# Installation
## node
	npm install debugpp --save
## browser
	bower install debugpp --save

# Features

* dot-namespacing
* semantic subspaces support
	* log, warn, error, ...
* supports both node and browser environment

## Example

```js
var debug = debug.extended('cw.tabs.TabsController');

var contextName = "collabo";
var tabs = ['http://www.CollaboScience.com', 'http://www.KnAllEdge.org', 'http://www.CollaboArte.com'];
if(!error) debug.log("[loadContexts] context '%s' loaded: %d", contextName, tabs.length);
else debug.error("[loadContexts] context '%s' are not loaded, error: ", contextName, error);
```

Please check [documentation](http://mprinc.github.io/debugpp/ "debugpp Documentation") for detailed documentation and basic examples.

For more detailed and complex examples, please check the ***test*** folder in the repository

# Test
	npm test

# ToDo

* disabling only some of semantic domains (log and warn but not error)
* provide better logging function suplementing, a way toward Winston, bunyan

# Release History
* 1.1.7 Extra test coverage, adding debugpp to global.* namespace (useful for node testing of a frontend code)
* 1.1.6 Fixed problem with missing versions for debug package (bower)
* 1.1.5 Fixed suport for browser (bower)
* 1.1.4 Support for browser (bower)
* 1.1.3 Test support for browser (bower)
* 1.1.0 Initial release
