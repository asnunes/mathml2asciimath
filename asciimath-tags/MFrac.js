const BaseTag = require('./BaseTag');
const addParenthesesIfIsMoreThanOneChar = require('../utils/addParenthesesToMultipleCharString');

module.exports = class MFrac extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      new Error('Wrong number of children for msup tag. It should have exactly 2');
    }

    const num = children[0];
    const den = children[1];
    const numAscii = addParenthesesIfIsMoreThanOneChar(num.toAsciimath());
    const denAscii = addParenthesesIfIsMoreThanOneChar(den.toAsciimath());

    return `${numAscii}/${denAscii}`;
  }
}