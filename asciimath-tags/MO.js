const trim = require('trim');
const BaseTag = require('./BaseTag');
const mathOperators = require('../mathml-to-asciimath-characters/allMathOperators');

module.exports = class MO extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) throw new Error('MO tag should not have children');

    const trimValue = trim(value);
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