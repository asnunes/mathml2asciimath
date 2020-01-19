const BaseTag = require('./BaseTag');

module.exports = class MRow extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join(' ');
  }
}