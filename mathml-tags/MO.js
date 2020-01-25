const BaseTag = require('./BaseTag');
const mathOperators = require('../syntax/allMathOperators');

module.exports = class MO extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) throw new Error('MO tag should not have children');

    const trimValue = value.trim();
    const mathOperator = this.getAsciimathOperator(trimValue);

    return mathOperator || trimValue;
  }

  getAsciimathOperator(trimValue) {
    return this.getAsciimathOperatorBy('character', trimValue) ||
      this.getAsciimathOperatorBy('glyph', trimValue);
  }

  getAsciimathOperatorBy(type, trimValue) {
    const mathOperatorInfo = mathOperators.find(op => op[type] === trimValue);
    return mathOperatorInfo ? mathOperatorInfo['asciimath'] || mathOperatorInfo['glyph'] : null;
  }
}