import xmldoc from 'xmldoc';

export class mathml2asciimath {
  constructor(mathmlString) {
    this.xmlRepresentation = _parseXML(mathmlString);
  }
}

const _parseXML = mathmlString => new xmldoc.XmlDocument(mathmlString);