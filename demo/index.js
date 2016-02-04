var debugpp = require('..');

var debugSystem = debugpp.debug('system', true);
var debugSystemTest = debugpp.debug('system.test', true);

debugSystem.log("Hello system!");

debugSystemTest.log("Hello system test!");
debugSystemTest.log("World");
debugSystemTest.warn("Hm?!");
debugSystemTest.error("Huston!!!");