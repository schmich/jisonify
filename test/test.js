#!/usr/bin/env node

var browserify = require('browserify');
var jisonify = require('../index');
var assert = require('assert');
var vm = require('vm');

function runTest(scriptFileName, b) {
  b.add(__dirname + '/' + scriptFileName);
  b.transform(jisonify);

  b.bundle(function(err, src) {
    if (err)
      assert.fail(err);

    assert.ok(src);

    var sandbox = {
      test: { result: 0 }
    };

    vm.runInNewContext(src, sandbox);

    assert.equal(sandbox.test.result, 42);
  });
}

runTest('s1.js', browserify());
runTest('s2.js', browserify({ extensions: '.jison' }));
