const Dispatcher = require('../dispatcher/Dispatcher');

module.exports = class AsciimathInterface {
  constructor(xmlDocument) {
    this.xmlDocument = xmlDocument;
  }

  parse() {
    return this.xmlDocument.map(el => this.dispatch(el));
  }

  dispatch(el) {
    return new Dispatcher(el).dispatch();
  }
}