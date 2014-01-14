# Jisonify

A [Browserify](https://github.com/substack/node-browserify) v2 transform for [Jison](https://github.com/zaach/jison) parsers.

## Installation

```
npm install jisonify
```

## Usage

```
browserify -t jisonify script.js > bundle.js
```

## Example

```js
%lex
%%

\s+                   /* Skip whitespace. */
[0-9]+                return 'NUMBER'
"-"                   return '-'
"+"                   return '+'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

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
var parser = require('./parser').parser;

var result = parser.parse('3 + 2 - 1');
console.log(result);
// ...
```

## License

Copyright &copy; 2014 Chris Schmich
<br />
MIT License, See [LICENSE](LICENSE) for details.
