export default class TokenType {
  name: string;
  regex: string;

  constructor(name: string, regex: string) {
    this.name = name;
    this.regex = regex;
  }
}

export const tokenTypesList = {
  'NUMBER': new TokenType('NUMBER', '\\d+'),
  'VARIABLE': new TokenType('VARIABLE', '[а-я]+'),
  'SEMICOLON': new TokenType('SEMICOLON', ';'),
  'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
  'ASSIGN': new TokenType('ASSIGN', 'РАВНО'),
  'LOG': new TokenType('LOG', 'КОНСОЛЬ'),
  'PLUS': new TokenType('PLUS', 'ПЛЮС'),
  'MINUS': new TokenType('MINUS', 'МИНУС'),
  'LEFT_PAR': new TokenType('LEFT_PAR', '\\('),
  'RIGHT_PAR': new TokenType('RIGHT_PAR', '\\)'),
}
