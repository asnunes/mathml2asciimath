const BaseTag = require('./BaseTag');

module.exports = class MEnclose extends BaseTag {
  constructor(tag) {
    super(tag);
    this.notation = this.tag.attributes.notation;
  }

  toAsciimath() {
    switch (this.notation) {
      case 'longdiv':
        return `)bar(${this.mapChildrenToAsciimath().join('')})`;
      case 'actuarial':
        return `bar(${this.mapChildrenToAsciimath().join('')})|`;
      case 'box':
        return `|ul(bar(${this.mapChildrenToAsciimath().join('')}))|`;
      case 'roundedbox':
        return `(ul(bar(${this.mapChildrenToAsciimath().join('')})))`;
      default:
        return this.mapChildrenToAsciimath().join('');
    }
  }
}