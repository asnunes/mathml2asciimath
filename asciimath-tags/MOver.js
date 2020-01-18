const BaseTag = require('./BaseTag');
const asciimathAccents = require('../syntax/asciimathAccents');

module.exports = class MOver extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      throw new Error('Wrong number of children for mover tag. It should have exactly 2.');
    }

    const content = children[0];
    const brace = children[1];

    const contentAscii = content.toAsciimath();
    const braceAscii = brace.toAsciimath();

    return `${this.getOperator(braceAscii)}(${contentAscii})`; 
  }

  getOperator(brace) {
    return asciimathAccents.includes(brace) ? brace : `overset(${brace})`; 
  }
}