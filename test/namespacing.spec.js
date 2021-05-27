var chai = require("chai");
var expect = chai.expect;
// var should = chai.should;
var should = chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

var sinon = require("sinon");
// http://chaijs.com/plugins/sinon-chai
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

// var assert = require('chai').assert;

// testing:
// cdd; cd nodejs/libs/debugpp
// node node_modules/mocha/bin/mocha test/namespacing.spec.js

global.window = {};
global.localStorage = {debug: "empty_space"};

describe('debugpp: ', function() {
	var debugpp = require('..');

	it('it should exist', function() {
		expect(debugpp).to.not.be.null;
		expect(debugpp).to.have.property('name');
		expect(debugpp.name).to.equal('debugpp');
	});

	it('it should create debugger', function() {
		var debugTest = debugpp.debug('test');
		expect(debugTest).to.have.property('log');
		expect(debugTest).to.have.property('warn');
		expect(debugTest).to.have.property('error');
	});

	it('it should get in global and window variables', function() {
		expect(global.debugpp).to.exist;
		expect(global.window.debugpp).to.exist;
	});

	it('it should not debug when disabled', function() {
		var debugTest = debugpp.debug('test', false);

		var logSpy = sinon.spy();
		debugTest.log.log = logSpy;

		debugTest.log("Hello");

		expect(logSpy).to.have.been.callCount(0);
	});

	xit('it should debug visually', function() {
		var debugTest = debugpp.debug('test', true);

		var testLoggerLog = function(msg){
			console.log("[log] ", msg);
		};
		var testLoggerWarn = function(msg){
			console.warn("[warn] ", msg);
		};
		var testLoggerError = function(msg){
			console.error("[error] ", msg);
		};
		debugTest.log.log = testLoggerLog;
		debugTest.warn.log = testLoggerWarn;
		debugTest.error.log = testLoggerError;

		debugTest.log("Hello");
		debugTest.log("World");
		debugTest.warn("Hm?!");
		debugTest.error("Huston!!!");
	});

	it('it should debug', function() {
		var debugTest = debugpp.debug('test', true);

		var logSpy = sinon.spy();
		var warnSpy = sinon.spy();
		var errorSpy = sinon.spy();
		debugTest.log.log = logSpy;
		debugTest.warn.log = warnSpy;
		debugTest.error.log = errorSpy;

		debugTest.log("Hello");
		debugTest.log("World");
		debugTest.warn("Hm?!");
		debugTest.error("Huston!!!");

		expect(logSpy).to.have.been.calledTwice;
		expect(warnSpy).to.have.been.calledOnce;
		expect(errorSpy).to.have.been.calledOnce;

		// Matchers: http://sinonjs.org/docs/
		expect(logSpy.getCall(0)).to.have.been.calledWith(sinon.match(/.*Hello.*/));
		expect(logSpy.getCall(1)).to.have.been.calledWith(sinon.match(/.*World.*/));
		expect(warnSpy).to.have.been.calledWith(sinon.match(/.*Hm\?!.*/));
		expect(errorSpy).to.have.been.calledWith(sinon.match(/.*Huston!!!.*/));;
	});

	it('it should disable subspaces', function() {
		debugpp.disableExt('test2', true);
		var debugTest = debugpp.debug('test2');
		var debugTestSub1 = debugpp.debug('test2.sub1');

		var logSpy = sinon.spy();
		var logSub1Spy = sinon.spy();
		debugTest.warn.log = logSpy;
		debugTestSub1.warn.log = logSub1Spy;

		debugTest.warn("Hello");
		debugTestSub1.warn("Hello sub1");

		expect(logSpy).to.have.been.callCount(0);
		expect(logSub1Spy).to.have.been.callCount(0);
	});

	it('it should enable subspaces', function() {
		debugpp.enableExt('test3.warn');
		debugpp.enableExt('test4', true);
		var debugTest3 = debugpp.debug('test3');
		var debugTest3Sub1 = debugpp.debug('test3.sub1');
		var debugTest4 = debugpp.debug('test4');
		var debugTest4Sub1 = debugpp.debug('test4.sub1');
		var debugTest4Sub2 = debugpp.debug('test4.sub1.sub2');

		var log3WarnSpy = sinon.spy();
		var log3SpyError = sinon.spy();
		var log3Sub1Spy = sinon.spy();
		var log4Spy = sinon.spy();
		var log4Sub1Spy = sinon.spy();
		var log4Sub2Spy = sinon.spy();
		debugTest3.warn.log = log3WarnSpy;
		debugTest3.error.log = log3SpyError;
		debugTest3Sub1.warn.log = log3Sub1Spy;
		debugTest4.warn.log = log4Spy;
		debugTest4Sub1.warn.log = log4Sub1Spy;
		debugTest4Sub2.warn.log = log4Sub2Spy;

		debugTest3.warn("Hello 3");
		debugTest3.error("Herror 3");
		debugTest3Sub1.warn("Hello 3 sub1");
		debugTest4.warn("Hello 4");
		debugTest4Sub1.warn("Hello 4 sub1");
		debugTest4Sub2.warn("Hello 4 sub2");

		expect(log3WarnSpy).to.have.been.calledOnce;
		expect(log3SpyError).to.have.been.callCount(0);
		expect(log3Sub1Spy).to.have.been.callCount(0);
		expect(log4Spy).to.have.been.calledOnce;
		expect(log4Sub1Spy).to.have.been.calledOnce;
		expect(log4Sub2Spy).to.have.been.calledOnce;
	});

});
