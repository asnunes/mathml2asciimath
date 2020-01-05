const trim = require('trim');
const BaseTag = require('./BaseTag');

module.exports = class MI extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) return this.mapChildrenToAsciimath().join('');

    return trim(value);
  }
}