const BaseTag = require('./BaseTag');
const addParenthesesIfIsMoreThanOneChar = require('../utils/addParenthesesToMultipleCharString');


module.exports = class MSup extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      new Error('Wrong number of children for msup tag. It should have exactly 2');
    }

    const base = children[0];
    const exponent = children[1];
    const baseAscii = addParenthesesIfIsMoreThanOneChar(base.toAsciimath());
    const exponentAscii = addParenthesesIfIsMoreThanOneChar(exponent.toAsciimath());
  
    return `${baseAscii}^${exponentAscii}`;
  }
}