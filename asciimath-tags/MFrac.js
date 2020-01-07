const BaseTag = require('./BaseTag');
const addParenthesesIfIsMoreThanOneChar = require('../utils/addParenthesesToMultipleCharString');

module.exports = class MFrac extends BaseTag {
  constructor(tag) {
    super(tag);
    this.bevelled = this.tag.attributes.bevelled == 'true';
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      throw new Error('Wrong number of children for mfrac tag. It should have exactly 2.');
    }

    const num = children[0];
    const den = children[1];
    const numAscii = addParenthesesIfIsMoreThanOneChar(num.toAsciimath());
    const denAscii = addParenthesesIfIsMoreThanOneChar(den.toAsciimath());

    return numAscii + this.getSeparator() + denAscii;
  }

  getSeparator() {
    return this.bevelled ? '//' : '/';
  }
}