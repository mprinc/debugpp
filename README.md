# debugpp

Augmented (dot-namespaces, semantic support (log, warn, error) ...) debug nodejs package

[![Build Status](https://travis-ci.org/mprinc/debugpp.svg)](https://travis-ci.org/mprinc/debugpp)
[![Dependency Status](https://david-dm.org/mprinc/debugpp.svg)](https://david-dm.org/mprinc/debugpp)
[![Coverage Status](https://img.shields.io/coveralls/mprinc/debugpp.svg)](https://coveralls.io/r/mprinc/debugpp)
[![Gittip](http://img.shields.io/gittip/mprinc.png)](https://www.gittip.com/mprinc/)

[![NPM](https://nodei.co/npm/debugpp.png?downloads=true&stars=true)](https://nodei.co/npm/debugpp/)

# Installation
	npm install debugpp --save

# Features

* dot-namespacing
* semantic subspaces support
	* log, warn, error, ...

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

# Release History
* 1.0.0 Initial release