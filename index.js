const XmldocInterface = require('./interfaces/XmldocInterface');
const AsciiInterface = require('./interfaces/AsciiInterface');

module.exports = class Mathml2Asciimath {
  constructor(html) {
    this.parsedXml = new XmldocInterface(html).parse();
    this.parsedAscii = new AsciiInterface(this.parsedXml).parse();
  }

  convert() {
    return this.parsedAscii.map(tag => tag.toAsciimath()).join('');
  }
}