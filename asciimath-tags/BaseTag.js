module.exports = class BaseTag {
  constructor(tag) {
    this.tag = tag;
  }

  toAsciimath() {
    // subclass responsibility
  }

  mapChildrenToAsciimath() {
    return this.tag.children.map(tag => tag.toAsciimath());
  }
}