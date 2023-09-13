import Token from "./Token";
import TokenType, {tokenTypesList} from "./TokenType";
import ExpressionNode from "./AST/ExpressionNode";
import StatementsNode from "./AST/StatementsNode";
import NumberNode from "./AST/NumberNode";
import VariableNode from "./AST/VariableNode";
import BinOperationNode from "./AST/BinOperationNode";
import UnarOperationNode from "./AST/UnarOperationNode";

export default class Parser {
  tokens: Token[];
  pos: number = 0;
  scope: any = {};

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  match(...expected: TokenType[]): Token | null {
    if (this.pos < this.tokens.length) {
      const currentToken = this.tokens[this.pos];

      if (expected.find(type => type.name === currentToken.type.name)) {
        this.pos += 1;
        return currentToken;
      }
    }

    return null;
  }

  require(...expected: TokenType[]): Token {
    const token = this.match(...expected);

    if (!token) {
      throw new Error(`На позиции ${this.pos} ожидается ${expected[0].name}`);
    }

    return token;
  }

  parseVariableOrNumber(): ExpressionNode {
    const number = this.match(tokenTypesList.NUMBER);
    if (number !== null) {
      return new NumberNode(number);
    }

    const variable = this.match(tokenTypesList.VARIABLE);
    if (variable !== null) {
      return new VariableNode(variable);
    }

    throw new Error(`Ожидается переменная или число на позиции ${this.pos}`);
  }

  parseParentheses(): ExpressionNode {
    if (this.match(tokenTypesList.LEFT_PAR) !== null) {
      const node = this.parseFormula();
      this.require(tokenTypesList.RIGHT_PAR);

      return node;
    } else {
      return this.parseVariableOrNumber();
    }
  }

  parseFormula(): ExpressionNode {
    let leftNode = this.parseParentheses();
    let operator = this.match(tokenTypesList.PLUS, tokenTypesList.MINUS);

    while (operator !== null) {
      const rightNode = this.parseParentheses();
      leftNode = new BinOperationNode(operator, leftNode, rightNode);
      operator = this.match(tokenTypesList.PLUS, tokenTypesList.MINUS);
    }

    return leftNode;
  }

  parsePrint(): ExpressionNode {
    const operatorLog = this.match(tokenTypesList.LOG);

    if (operatorLog !== null) {
      return new UnarOperationNode(operatorLog, this.parseFormula());
    }

    throw new Error(`Ожидается унарный оператор КОНСОЛЬ на позиции ${this.pos}`);
  }

  parseExpression(): ExpressionNode {
    if (this.match(tokenTypesList.VARIABLE) === null) {
      const printNode = this.parsePrint();

      return printNode;
    }

    this.pos -= 1;
    let variableNode = this.parseVariableOrNumber();
    const assignOperator = this.match(tokenTypesList.ASSIGN);
    if (assignOperator !== null) {
      const rightFormulaNode = this.parseFormula();
      const binaryNode = new BinOperationNode(assignOperator, variableNode, rightFormulaNode);

      return binaryNode;
    }

    throw new Error(`После переменной ожидается оператор присваивания на позиции ${this.pos}`);
  }

  parseCode(): ExpressionNode {
    const root = new StatementsNode();

    while (this.pos < this.tokens.length) {
      const codeStringNode = this.parseExpression();
      this.require(tokenTypesList.SEMICOLON);
      root.addNode(codeStringNode);
    }

    return root;
  }
}