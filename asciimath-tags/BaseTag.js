module.exports = class BaseTag {
  constructor(tag) {
    this.tag = tag;
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join('');
  }

  mapChildrenToAsciimath() {
    return this.tag.children.map(tag => tag.toAsciimath());
  }
}