module.exports = class BaseTag {
  constructor(tag) {
    this.tag = tag;
  }

  toAsciimath() {
    // subclass responsibility
  }
}