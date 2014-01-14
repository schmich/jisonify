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
