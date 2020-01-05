const BaseTag = require('./BaseTag');

module.exports = class MEnclose extends BaseTag {
  constructor(tag) {
    super(tag);
    this.notation = this.tag.notation;
  }

  toAsciimath() {
    switch (this.notation) {
      case 'longdiv':
        return `)bar(${this.mapChildrenToAsciimath().join('')})`;
      default:
        return this.mapChildrenToAsciimath().join('');
    }
  }
}