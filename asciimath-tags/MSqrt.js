const BaseTag = require('./BaseTag');

module.exports = class MSqrt extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length > 1) throw new Error('Wrong number of children for msqrt tag. It should have only one') 

    return `sqrt(${children[0].toAsciimath()})`;
  }
}