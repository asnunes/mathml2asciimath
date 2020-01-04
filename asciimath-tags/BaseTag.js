module.exports = class BaseTag {
  constructor(tag) {
    this.tag = tag;
  }

  toAsciimath() {
    new Error('tag not implemented');
  }
}