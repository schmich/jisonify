/* jslint node: true */
'use strict';

var jison = require('jison');
var through = require('through');

function jisonify(fileName) {
  if (!fileName.match(/\.jison$/)) {
    return through();
  }

  var src = '';

  var stream = through(write, end);
  return stream;

  function write(data) {
    src += data;
  }

  function end() {
    try {
      var parser = new jison.Parser(src); 
      this.queue(parser.generate());
    } catch (e) {
      stream.emit('error', e);
    }

    this.queue(null);
  }
}

module.exports = jisonify;
