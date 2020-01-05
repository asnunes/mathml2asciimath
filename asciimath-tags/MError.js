const BaseTag = require('./BaseTag');

module.exports = class MError extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return `color(red)(|ul(bar(${this.mapChildrenToAsciimath().join('')}))|)`;
  }
}