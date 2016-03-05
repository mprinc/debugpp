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


// TODO: not working yet
// we need to deal with possibility with multiple require() for separate tests
describe('debugpp: ', function() {
	global.window = {};
	global.localStorage = {debug: ""};

	var debugpp = require('..');

	it('it should work with localStorage', function() {
	});
});
