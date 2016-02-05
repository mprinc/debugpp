var debugpp = require('..');

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
describe('debugpp: ', function() {
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
});