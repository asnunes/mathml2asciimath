const mathmlTags = require('../mathml-tags');

module.exports = class Dispatcher {
  constructor(el) {
    this.el = el;
  }

  dispatch() {
    const { name, value, attributes } = this.el;
    const children = this.el.children.map(el => new Dispatcher(el).dispatch());

    return mathmlTags[name] ?
      new mathmlTags[name]({ value, attributes, children }) :
      new mathmlTags['basetag']({ value, attributes, children });
  }
}