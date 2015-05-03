# Jisonify

A [Browserify](https://github.com/substack/node-browserify) transform for [Jison](https://github.com/zaach/jison) parsers.

Mix Jison parsers into your JS files and Browserify projects without needing additional build steps.

[![NPM version](https://badge.fury.io/js/jisonify.svg)](https://npmjs.org/package/jisonify)
[![Build Status](https://travis-ci.org/schmich/jisonify.svg?branch=master)](https://travis-ci.org/schmich/jisonify)
[![Dependency Status](https://gemnasium.com/schmich/jisonify.svg)](https://gemnasium.com/schmich/jisonify)

## Installation

```
npm install jisonify
```

## Usage

```
browserify -t jisonify main.js > bundle.js
```

## Example

```js
// calc.jison
%lex
%%

\s+                   /* Skip whitespace. */
[0-9]+                return 'NUMBER'
"-"                   return '-'
"+"                   return '+'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%left '+' '-'
%start expressions
%%

expressions
  : expr EOF        { return $1; }
  ;

expr
  : expr '+' expr   { $$ = $1 + $3; }
  | expr '-' expr   { $$ = $1 - $3; }
  | NUMBER          { $$ = Number(yytext); }
  ;
```

```js
// main.js
var parser = require('./calc.jison').parser;

exports = run = function() {
  var input = document.getElementById('input');
  var output = document.getElementById('output');
  output.innerText = parser.parse(input.value);
};
```

```
browserify -t jisonify main.js > bundle.js
```

```html
<!-- calc.html -->
<!DOCTYPE html>
<html>
  <head>
    <script src="bundle.js"></script>
  </head>
  <body>
    <form onsubmit="run(); return false;">
      <input type="text" id="input" value="50 + 2 - 10" />
      <input type="submit" />
      Result: <span id="output">&ndash;</span>
    </form>
  </body>
</html>
```

### Programmatic example

```js
var browserify = require('browserify');
var jisonify = require('jisonify');

var b = browserify();
b.add('./main.js');
b.transform(jisonify);
b.bundle(function(err, src) {
  // ...
});
```

## License

Copyright &copy; 2014 Chris Schmich
<br />
MIT License, See [LICENSE](LICENSE) for details.
