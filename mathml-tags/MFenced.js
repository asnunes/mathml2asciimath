const BaseTag = require('./BaseTag');

module.exports = class MFenced extends BaseTag {
  constructor(tag) {
    super(tag);
    this.open = this.getFence(this.tag.attributes.open, '(');
    this.close = this.getFence(this.tag.attributes.close, ')');
    this.separators = this.tag.attributes.separators;
  }

  toAsciimath() {
    const asciimathChildren = this.mapChildrenToAsciimath().reduce((acc, val, index) => {
      return acc + val + this.getSeparatorFor(index);
    }, '');

    return this.open + asciimathChildren + this.close;
  }

  getFence(attr, defaultValue) {
    if (attr === '' || attr === 'null') return ':}'
    if (!attr) return defaultValue;
    return attr.trim();
  }

  getSeparatorFor(index) {
    if (index + 1 === this.tag.children.length || this.tag.children.length === 1) return '';
    if (!this.separators) return ',';
    
    const arrOfSeparators = this.separators.split('');
    return arrOfSeparators[index] || arrOfSeparators[arrOfSeparators.length - 1];
  }
}