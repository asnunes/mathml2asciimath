const BaseTag = require('./BaseTag');
const addParenthesesIfIsMoreThanOneChar = require('../utils/addParenthesesToMultipleCharString');

module.exports = class MSubsup extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 3) {
      throw new Error('Wrong number of children for msup tag. It should have exactly 3');
    }

    const base = children[0];
    const sub = children[1];
    const sup = children[2];
    const baseAscii = base.toAsciimath();
    const subAscii = addParenthesesIfIsMoreThanOneChar(sub.toAsciimath());
    const supAscii = addParenthesesIfIsMoreThanOneChar(sup.toAsciimath());
  
    return `${baseAscii}_${subAscii}^${supAscii}`;
  }
}