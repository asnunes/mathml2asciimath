const BaseTag = require('./BaseTag');
const especialMathOperators = require('../mathml-to-asciimath-characters/mathEspecialOperators');

module.exports = class MUnderover extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 3) {
      throw new Error('Wrong number of children for munder tag. It should have exactly 3.');
    }

    const base = children[0];
    const underContent = children[1];
    const overContent = children[2]; 

    const baseAscii = base.toAsciimath();
    const underContentAscii = underContent.toAsciimath();
    const overContentAscii = overContent.toAsciimath();

    if (this.isEspecialMathOperatorAscimath(baseAscii)) return `${baseAscii}_(${underContentAscii})^(${overContentAscii})`;

    return `underset(${underContentAscii})(overset(${overContentAscii})(${baseAscii}))`; 
  }

  isEspecialMathOperatorAscimath(operatorString) {
    return !!especialMathOperators.find(op => op['asciimath'] === operatorString);
  }
}