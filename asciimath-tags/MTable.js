const BaseTag = require('./BaseTag');

module.exports = class MTable extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join(', ');
  }
}