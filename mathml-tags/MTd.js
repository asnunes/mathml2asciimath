const BaseTag = require('./BaseTag');

module.exports = class MTd extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join('');
  }
}