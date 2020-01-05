const xmldom = require('xmldom');

module.exports = class XmldomInterface {
  constructor(xml) {
    this.errorLocator = {};
    this.errors = [];
    
    this.xml = _removeLineBreaks(xml);
    this.xmlDocument = new xmldom.DOMParser({
      locator: this.errorLocator,
      errorHandler: this.errorHandler.bind(this),
    });
  }

  parse() {
    this.parsedDOM = this.parseElements(this.getMathTags());
    return this.parsedDOM;
  }

  parseElements(els) {
    const arrOfParsedElements = [];
    for (let i=0; i < els.length; i++) {
      let el = els[i];
      if(el.tagName != undefined) arrOfParsedElements.push(this.parseElement(el));
    } return arrOfParsedElements;
  }

  parseAttributes(attrs) {
    const parsedAttrs = {};
    for (let i=0; i < attrs.length; i++) {
      let attr = attrs[i];
      parsedAttrs[attr.nodeName] = attr.nodeValue;
    } return parsedAttrs;
  }

  parseElement(element) {
    return {
      name: element.tagName,
      attributes: element.attributes ? this.parseAttributes(element.attributes) : {},
      value: element.textContent,
      children: _hasChild(element) ? this.parseElements(element.childNodes) : [] 
    };
  }

  getMathTags() {
    const mathTags = this.xmlDocument.parseFromString(this.xml).getElementsByTagName('math');
    if (this.errors.length > 0) {
      this.errors = [];
      return this.getMathTags();
    } return mathTags;
  }

  errorHandler(msg) {
    if (_isMissingAttributeValueError(msg)) {
      const missingAttribute = msg.split("\"")[1];
      this.xml = _fixMissingAttribute(missingAttribute, this.xml);
      this.parse()
      this.errors.push(msg);
    }
  }
}

const LINE_BREAK = /\n|\r\n|\r/g;

const _matchAttr = attr => new RegExp(`(?<=\<.*)(${attr}=(?!(\"|\')))|(${attr}(?!(\"|\')))(?=.*\>)`, "g");
const _hasChild = el => el.childNodes && el.childNodes.length !== 0;
const _removeLineBreaks = str => str.replace(LINE_BREAK, '');
const _isMissingAttributeValueError = msg => {
  return msg.includes("attribute") && msg.includes("missed")
};
const _fixMissingAttribute = (missingAttribute, xml) => {
  return xml.replace(_matchAttr(missingAttribute), `${missingAttribute}='null'`);
}