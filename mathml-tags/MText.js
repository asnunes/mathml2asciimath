const BaseTag = require('./BaseTag');

module.exports = class MText extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) throw new Error('mtext tag should not have children');

    return `text(${value})`;
  }
}