var log = require('../lib').from(__filename);


module.exports = {
    'test test': function(assert) {
        assert.ok(true, 'true is true');
    },

    'test log': function(assert) {
        log('test');
        assert.ok(true, 'true is true');
    },

    'log multiple inputs': function(assert) {
        log('hello', 'world', 1, 2, 'three');
        assert.ok(true, 'true is true');
    },

    'log array': function(assert) {
        log('array', [1, 2, 3, 'four', 'five', 'six']);
        assert.ok(true, 'true is true');
    },

    'log object': function(assert) {
        log('object', { a: 'apple', b: 'bear', c: ['cookies', 'cake', 'calculators', { abc: 123,  def: 'jhi', klm: true, pqr: false }]});
        assert.ok(true, 'true is true');
    },

    'function name': function function_name(assert) {
        log('function name');
    },


    'arguments': function SUPERARGTEST(assert) {
        function YYYY (aaaa) {
            log('arguments', arguments);
            //log(caller);
            //log(callee);
            log(arguments.callee.caller.name);
            //log(arguments.caller.name);
            log(arguments.callee.name);
        }

        function ZZZZ() {
            YYYY('i am an argument');
        }

        ZZZZ();

    },
    
    'no filename': function  (assert) {
        var noFile = require('../lib');
        noFile('i don\'t have a filename');
    }

};