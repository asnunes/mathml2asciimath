const Math = require('../asciimath-tags/Math');
const MI = require('../asciimath-tags/MI');
const MN = require('../asciimath-tags/MN');
const MO = require('../asciimath-tags/MO');
const MRow = require('../asciimath-tags/MRow');
const MSup = require('../asciimath-tags/MSup');
const MSqrt = require('../asciimath-tags/MSqrt');
const MFenced = require('../asciimath-tags/MFenced');
const MFrac = require('../asciimath-tags/MFrac');

module.exports = class Dispatcher {
  constructor(el) {
    this.el = el;
  }

  dispatch() {
    const { name, value, attributes } = this.el;
    const children = this.el.children.map(el => new Dispatcher(el).dispatch());

    switch (name) {
      case 'math':
        return new Math({ value, attributes, children });
      case 'mrow':
        return new MRow({ value, attributes, children });
      case 'msup':
        return new MSup({ value, attributes, children });
      case 'msqrt':
        return new MSqrt({ value, attributes, children });
      case 'mfrac':
        return new MFrac({ value, attributes, children });
      case 'mfenced':
        return new MFenced({ value, attributes, children });
      case 'mi':
        return new MI({ value, attributes, children });
      case 'mo':
        return new MO({ value, attributes, children });
      case 'mn':
        return new MN({ value, attributes, children });
      default:
        return new Error('tag not implemented');
    }
  }
}