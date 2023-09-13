import Token from "./Token";
import {tokenTypesList} from "./TokenType";

export default class Lexer {
  code: string;
  pos: number = 0;
  tokenList: Token[] = [];

  constructor(code: string) {
    this.code = code;
  }

  lexemAnalysis(): Token[] {
    while (this.nextToken()) {}

    this.tokenList = this.tokenList.filter(token => token.type.name !== tokenTypesList.SPACE.name);
    return this.tokenList;
  }

  nextToken(): boolean {
    if (this.pos >= this.code.length) {
      return false;
    }

    const tokenTypesValues = Object.values(tokenTypesList);

    for (let i = 0; i < tokenTypesValues.length; i++) {
      const tokenType = tokenTypesValues[i];
      const regex = new RegExp('^' + tokenType.regex);
      const result = this.code.substring(this.pos).match(regex);

      if (result) {
        const resultTokenText = result[0];
        const token = new Token(tokenType, resultTokenText, this.pos);
        this.pos += resultTokenText.length;
        this.tokenList.push(token);

        return true;
      }
    }

    throw new Error(`На позиции ${this.pos} обнаружена ошибка в лексеме`);
  }
}