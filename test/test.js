#!/usr/bin/env node

var browserify = require('browserify');
var jisonify = require('../index');
var assert = require('assert');
var vm = require('vm');

function expectValue(fileName, b, value, done) {
  b.add(__dirname + '/' + fileName);
  b.transform(jisonify);

  b.bundle(function(err, src) {
    if (err)
      assert.fail(err);

    assert.ok(src);

    var sandbox = {
      test: { result: null }
    };

    vm.runInNewContext(src, sandbox);

    assert.equal(sandbox.test.result, value);

    done();
  });
}

describe('jisonify', function () {
  it('processes a script with jison', function (done) {
    expectValue('s1.js', browserify(), 42, done);
  });

  it('processes a script with jison with implicit extension', function (done) {
    expectValue('s2.js', browserify({ extensions: '.jison' }), 42, done);
  });

  it('reports errors', function (done) {
    var fileName = 's3.js';
    var b = browserify();
    b.add(__dirname + '/' + fileName);
    b.transform(jisonify);

    b.bundle(function(err, src) {
      if (!err)
        assert.fail('Expected error parsing Jison file.');

      done();
    });
  });
});
