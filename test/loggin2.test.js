var Log = require('../lib/logging2').from(__filename);


Log.debug("Info message", {title: "Title", description: "description"}, "test");
Log.info("Info message", {title: "Title", description: "description"}, "test");
Log.warn("Info message", {title: "Title", description: "description"}, "test");
Log.error("Info message", {title: "Title", description: "description"}, "test");

Log.useColor(false);

Log.debug("Info message", {title: "Title", description: "description"}, "test");
Log.info("Info message", {title: "Title", description: "description"}, "test");
Log.warn("Info message", {title: "Title", description: "description"}, "test");
Log.error("Info message", {title: "Title", description: "description"}, "test");
