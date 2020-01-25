const BaseTag = require('./BaseTag');
const mathSymbols = require('../syntax/mathSymbols');

module.exports = class MI extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children, value } = this.tag;
    if (children.length > 0) return this.mapChildrenToAsciimath().join('');

    const normalizedValue = this.normalizeWhitespaces(value);
    if (normalizedValue === ' ') return '\\' + normalizedValue;

    const trimValue = value.trim();
    return this.getMathSymbol(trimValue) || trimValue;
  }

  getMathSymbol(trimValue) {
    return this.getMathSymbolBy('character', trimValue) ||
      this.getMathSymbolBy('glyph', trimValue);
  }

  getMathSymbolBy(type, trimValue) {
    const mathSymbolInfo = mathSymbols.find(op => op[type] === trimValue);
    return mathSymbolInfo ? mathSymbolInfo['asciimath'] || mathSymbolInfo['glyph'] : null;
  }

  normalizeWhitespaces(str){
    return str.replace(/\s+/g, ' ');
  }
}