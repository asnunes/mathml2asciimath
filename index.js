const XmldomInterface = require('./interfaces/XmldomInterface');
const AsciiInterface = require('./interfaces/AsciiInterface');

module.exports = class Mathml2Asciimath {
  constructor(xml) {
    this.parsedXml = new XmldomInterface(xml).parse();
    this.parsedAscii = new AsciiInterface(this.parsedXml).parse();
  }

  convert() {
    return this.parsedAscii.map(tag => tag.toAsciimath()).join('');
  }
}