const AsciimathTags = require('../asciimath-tags');

module.exports = class Dispatcher {
  constructor(el) {
    this.el = el;
  }

  dispatch() {
    const { name, value, attributes } = this.el;
    const children = this.el.children.map(el => new Dispatcher(el).dispatch());

    return AsciimathTags[name] ? 
      new AsciimathTags[name]({ value, attributes, children }) :
      new AsciimathTags['basetag']({ value, attributes, children });
  }
}