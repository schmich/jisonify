var calc = require('./calc.jison').parser;

test.result = calc.parse('50 + 2 - 10');
