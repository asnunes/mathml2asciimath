//https://www.w3.org/Math/draft-spec/mathml.html#chapter3_id.3.7.1.1

const BaseTag = require('./BaseTag');

module.exports = class MAction extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return this.mapChildrenToAsciimath().join('; ');
  }
}