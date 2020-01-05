const trim = require('trim');
const BaseTag = require('./BaseTag');

module.exports = class MFenced extends BaseTag {
  constructor(tag) {
    super(tag);
    this.open = this.getFence(this.tag.attributes.open, '(');
    this.close = this.getFence(this.tag.attributes.close, ')');
    //TODO: separators
  }

  toAsciimath() {
    const asciimathChildren = this.mapChildrenToAsciimath().join(',');
    return `${this.open}${asciimathChildren}${this.close}`;
  }

  getFence(attr, defaultValue) {
    if (!attr) return defaultValue;
    if (attr === 'null') return ':}'
    return trim(attr);
  }
}