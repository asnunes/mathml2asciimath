const BaseTag = require('./BaseTag');

module.exports = class Math extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.normalizeWhitespaces(this.mapChildrenToAsciimath().join(''));
  }

  normalizeWhitespaces(str){
    return str.replace(/\s+/g, ' ');
  }
}