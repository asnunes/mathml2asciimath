const BaseTag = require('./BaseTag');

module.exports = class MPrescripts extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    return '';
  }
}