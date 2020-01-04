const BaseTag = require('./BaseTag');

module.exports = class Math extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.tag.children.map(tag => tag.toAsciimath()).join('');
  }
}