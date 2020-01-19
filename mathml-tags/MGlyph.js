//https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mglyph

const BaseTag = require('./BaseTag');

module.exports = class MGlyph extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join('');
  }
};