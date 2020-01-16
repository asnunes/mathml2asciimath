const BaseTag = require('./BaseTag');
const asciimathAccents = require('../syntax/asciimathAccents');
const especialMathOperators = require('../mathml-to-asciimath-characters/mathEspecialOperators');

module.exports = class MUnder extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      throw new Error('Wrong number of children for munder tag. It should have exactly 2.');
    }

    const base = children[0];
    const underscript = children[1];

    const baseAscii = base.toAsciimath();
    const underscriptAscii = underscript.toAsciimath();

    if (this.isEspecialMathOperatorAscimath(baseAscii)) return `${baseAscii}_(${underscriptAscii})`;

    return `${this.getOperator(underscriptAscii)}(${baseAscii})`; 
  }

  getOperator(underscript) {
    return asciimathAccents.includes(underscript) ? underscript : `underset(${underscript})`; 
  }

  isEspecialMathOperatorAscimath(operatorString) {
    return !!especialMathOperators.find(op => op['asciimath'] === operatorString);
  }
}