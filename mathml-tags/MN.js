const BaseTag = require('./BaseTag');

module.exports = class MO extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) throw new Error('MI tag should not have children');

    return value.trim();
  }
}