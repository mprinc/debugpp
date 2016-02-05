/**
debugpp
Copyright(c) 2015-2016 Sasha Rudan <mprinc@gmail.com>
MIT Licensed 
Augmented (namespaces, ...) debug nodejs package
*
```js
var debugpp = require('debugpp');
```
*/

(function () { // This prevents problems when concatenating scripts that aren't strict.
'use strict';

/**
@description
## Info
This module provides different Promise related (implemented with) patterns and sollutions
It contains semaphore implementation for syncing consumers of resources
(like simultaneous writing in files, etc), and concurrent itterators that are limited 
by number of parallel execution of iterators (if we want to limit number of parallel acceses
to webservice, etc).
## Dependencies
This module requires {@link https://www.npmjs.com/package/q | q npm module} (please check also the @see {@link https://github.com/kriskowal/q | q github})
@module module:debugpp
@requires module:q
*/

var debug = null;

if(typeof require !== 'undefined'){
	debug = require('debug');
}
else if(!debug){
	throw new Error("Missing dependency: debug");
}

/**
 * @external debug
 * @see [debug (npm)]{@link https://www.npmjs.com/package/debug} & [debug (github)]{@link https://github.com/visionmedia/debug}
 */


/**

Example

```js
debug.enable('worker:*');
debug.enable('worker:b');
debug.enable('worker:*:b');
```

Examples with localStorage
```js
localStorage.debug = 'worker:*';
localStorage.debug = 'worker:*:log';
localStorage.debug = '*';
localStorage.debug = 'cw.background.*.error';
localStorage.debug = 'cw.background';
localStorage.debug = 'cw.background.*.error; cw.model.data.*.error';
localStorage.debug = 'cw.background.*.*; cw.model.ContextModel.*; cw.model.CWModel.*; cw.tabs.TabsView.*';
```
*/

var debugpp = (function() {

	/*
	@exports debugpp
	*/
	var debugpp = {
		author: 'Sasha Mile Rudan (mPrinC) <mprinc@gmail.com>',
		name: 'debugpp',
		desc: 'Augmented (namespaces, ...) debug nodejs package',
		version: '1.0.0'
	};

	/**
	Creates a new debug
	@memberof debugpp#
	@function debug
	@param {string} namespace - namespace of debugger (both ':' and '.' are possible for namespacing)
	@param {boolean} [enable=undefined] - if set to true enables namespace, 
		if set to false disables namespace, if ommited follows external settings (localStorage, DEBUG, ...)
	@returns {debugpp} semantic-namespaced debug (log, warn, error)
	*/
	debugpp.debug = function(namespace, enable){
		namespace = namespace.replace(/\./g, ':');

		if(enable){
			this.enableExt(namespace);
		}else if(typeof enable === 'boolean' && enable === false){
			this.disableExt(namespace);
		}

		var def = debug(namespace);
		def.log = debug(namespace+':log');
		def.warn = debug(namespace+':warn');
		def.error = debug(namespace+':error');

		return def;
	};

	/**
	Enables namespace
	@memberof debugpp#
	@function enableExt
	@param {string} namespace - namespace of debugger (both ':' and '.' are possible for namespacing)
	to enable semantic subnamespace just provide it as a subspace, for example:
	```js
	enableExt('test:log');
	enableExt('test:*');
	```
	@param {string} [disableSubspaces=false] - if set to true it will not enable subspaces (log, warn, error) 
	*/
	debugpp.enableExt = function(namespace, disableSubspaces){
		if(typeof disableSubspaces === 'undefined' || disableSubspaces === true){
			namespace += '.*';
		}
		var namespace = namespace.replace(/\./g, ':');
		debug.enable(namespace);
	};

	/**
	Disables namespace
	@memberof debugpp#
	@function enableExt
	@param {string} namespace - namespace of debugger (both ':' and '.' are possible for namespacing)
	to disable semantic subnamespace just provide it as a subspace, for example:
	```js
	enableExt('test:log');
	enableExt('test:*');
	```
	@param {string} [disableSubspaces=false] - if set to true it will not disable subspaces (log, warn, error)
	*/
	debugpp.disableExt = function(namespace, disableSubspaces){
		if(typeof disableSubspaces === 'undefined' || disableSubspaces === true){
			namespace += '.*';
		}
		namespace = namespace.replace(/\./g, ':');
		debug.disable(namespace);
	};

	// register internal debugger stream
	debug.enable('debugPP');
	debugpp._internal = debugpp.debug('debugPP');

	// enable debugger streams
	if(typeof localStorage !== 'undefined'){
		var debugNSs = localStorage.debug && localStorage.debug.split(";") || ['*'];
		for(var nsi in debugNSs){
			var ns = debugNSs[nsi].trim();
			debugpp._internal("Enabling namespace: %s", ns);

			debug.enableExt(ns);
		}		
	}

	debugpp._internal("Debug is extended");

	return debugpp;

/**
waits on semaphore
@memberof debugpp.Semaphore#
@function wait
@param {string} consumerName - name of the consumer
@returns {external:Promise} promise that will get resolved after the semaphore is available.
The only possibility for promise to get rejected is when semaphore gets destroyed
In that case it will get rejected with an @see {@link Error}.
*/
Semaphore.prototype.wait = function(consumerName){
	var that = this;

	var deferred = Q.defer();
	if(this.debug) console.log("[Semaphore:%s:wait] this.resourcesNo:%d", this.name, this.resourcesNo);

	this.resourcesNo--;
	// enough available resources
	if(this.resourcesNo>=0){
		if(this.debug) console.log("[Semaphore:%s:wait] available", this.name);

		if(this.supportConsumersLog){
			this.consumersLog.push({
				consumerId: this.consumerUniqueId++,
				consumerName: consumerName
			});
		}
		deferred.resolve(this.resourcesNo, consumerId);
	// no enough available resources
	}else{
		if(this.debug) console.log("[Semaphore:%s:wait] not available", this.name);
		var that = this;
		if(this.supportConsumersLog){
			var consumerId = this.consumerUniqueId++;
			this.waitingQueue.push({
				func: function(){
					if(that.debug) console.log("[Semaphore:%s:wait:callback] became available", that.name);
					that.consumersLog.push({
						consumerId: consumerId,
						consumerName: consumerName
					});
					deferred.resolve(that.resourcesNo);
				},
				consumerId: consumerId,
				consumerName: consumerName					
			});				

		}else{
			this.waitingQueue.push(function(){
				if(that.debug) console.log("[Semaphore:%s:wait:callback] became available", that.name);
				deferred.resolve(that.resourcesNo);
			});				
		}
	}			
	return deferred.promise;
};


return Semaphore;
})();

// node.js world
if(typeof module !== 'undefined'){
	module.exports = (function() {
		return debugpp;
	})();	
}
if(typeof window != 'undefined'){
	window.debugpp = debugpp;
}

}()); // end of 'use strict';