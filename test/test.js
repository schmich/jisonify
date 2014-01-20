#!/usr/bin/env node

var browserify = require('browserify');
var jisonify = require('../index');
var assert = require('assert');
var vm = require('vm');

function expectValue(fileName, b, value) {
  b.add(__dirname + '/' + fileName);
  b.transform(jisonify);

  b.bundle(function(err, src) {
    if (err)
      assert.fail(err);

    assert.ok(src);

    var sandbox = {
      test: { result: 0 }
    };

    vm.runInNewContext(src, sandbox);

    assert.equal(sandbox.test.result, value);
  });
}

function expectError(fileName, b) {
  b.add(__dirname + '/' + fileName);
  b.transform(jisonify);

  b.bundle(function(err, src) {
    if (!err)
      assert.fail('Expected error parsing Jison file.');
  });
}

expectValue('s1.js', browserify(), 42);
expectValue('s2.js', browserify({ extensions: '.jison' }), 42);
expectError('s3.js', browserify());
