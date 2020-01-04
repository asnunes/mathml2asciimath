const trim = require('trim');
const BaseTag = require('./BaseTag');

module.exports = class MFenced extends BaseTag {
  constructor(tag) {
    super(tag);
    console.log(tag.attr);
  }

  toAsciimath() {
    const { children } = this.tag;
    return `(${children.join(',')})`;
  }
}