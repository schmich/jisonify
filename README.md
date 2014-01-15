# Jisonify

A [Browserify](https://github.com/substack/node-browserify) transform for [Jison](https://github.com/zaach/jison) parsers.

[![NPM version](https://badge.fury.io/js/jisonify.png)](https://npmjs.org/package/jisonify)
[![Build Status](https://travis-ci.org/schmich/jisonify.png?branch=master)](https://travis-ci.org/schmich/jisonify)
[![Dependency Status](https://gemnasium.com/schmich/jisonify.png)](https://gemnasium.com/schmich/jisonify)

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
<!-- calc.html --->
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

## License

Copyright &copy; 2014 Chris Schmich
<br />
MIT License, See [LICENSE](LICENSE) for details.
