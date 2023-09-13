import Lexer from './Lexer';
import Parser from './Parser';

const code =
  `перем РАВНО (5 ПЛЮС 10) ПЛЮС ( 2 МИНУС 12 );
   КОНСОЛЬ перем;`;
  // `5 РАВНО 5 ПЛЮС 9 ПЛЮС ( 4 МИНУС 6 );`;
  // `код РАВНО 5 ПЛЮС 9 ПЛЮС ( 4 МИНУС 6 );
  //  КОНСОЛЬ код;
  //  переменная РАВНО код ПЛЮС 3;
  //  КОНСОЛЬ переменная ПЛЮС код МИНУС 6;`

const lexer = new Lexer(code);

lexer.lexemAnalysis();

const parser = new Parser(lexer.tokenList);
const rootNode = parser.parseCode();
parser.run(rootNode);