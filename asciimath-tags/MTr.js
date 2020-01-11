const BaseTag = require('./BaseTag');

module.exports = class MTr extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return `(${this.mapChildrenToAsciimath().join(', ')})`;
  }
}