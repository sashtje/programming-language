import ExpressionNode from "./ExpressionNode";
import Token from "../Token";

export default class UnarOperationNode extends ExpressionNode {
  operator: Token;
  operand: ExpressionNode;

  constructor(operator: Token, operand: ExpressionNode) {
    super();

    this.operator = operator;
    this.operand = operand;
  }
}