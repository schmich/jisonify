var parser = require('./calc.jison').parser;

exports = run = function() {
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  output.innerText = parser.parse(input.value);
};
