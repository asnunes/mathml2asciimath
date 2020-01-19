const XmldomInterface = require('./interfaces/XmldomInterface');
const AsciimathInterface = require('./interfaces/AsciimathInterface');

module.exports = class Mathml2Asciimath {
  constructor(xml) {
    this.parsedXml = new XmldomInterface(xml).parse();
    this.parsedAscii = new AsciimathInterface(this.parsedXml).parse();
  }

  convert() {
    return this.parsedAscii.map(tag => tag.toAsciimath()).join('');
  }
}