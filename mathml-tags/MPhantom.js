const BaseTag = require('./BaseTag');

module.exports = class MPhantom extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join('').replace(/./g,' ');
  }
}