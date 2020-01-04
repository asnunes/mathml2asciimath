const xmldoc = require('xmldoc');

module.exports = class XmldocInterface {
  constructor(html) {
    this.xmlDocument = new xmldoc.XmlDocument(html);
  }

  parse() {
    return this.filterAndParseElements(this.getMathTags());
  }

  filterAndParseElements(els) {
    return els
      .filter(el => el.constructor.name === ELEMENT_CONSTRUCTOR_NAME)
      .map(el => this.parseElement(el));
  }

  parseElement(element) {
    return {
      name: element.name,
      attr: element.attr,
      value: element.value,
      children: _hasNoChild(element) ? [] : this.filterAndParseElements(element.children)
    };
  }

  getMathTags() {
    return this.xmlDocument.childrenNamed('math');
  }
}

const ELEMENT_CONSTRUCTOR_NAME = 'XmlElement';

const _hasNoChild = el => el.children.length === 0;