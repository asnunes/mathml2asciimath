const Math = require('../asciimath-tags/Math');
const MI = require('../asciimath-tags/MI');
const MN = require('../asciimath-tags/MN');
const MO = require('../asciimath-tags/MO');
const MRow = require('../asciimath-tags/MRow');
const MSup = require('../asciimath-tags/MSup');
const MSqrt = require('../asciimath-tags/MSqrt');

module.exports = class Dispatcher {
  constructor(el) {
    this.el = el;
  }

  dispatch() {
    const { name, value, attr } = this.el;
    const children = this.el.children.map(el => new Dispatcher(el).dispatch());

    switch (name) {
      case 'math':
        return new Math({ value, attr, children });
      case 'mrow':
        return new MRow({ value, attr, children });
      case 'msup':
        return new MSup({ value, attr, children });
      case 'msqrt':
        return new MSqrt({ value, attr, children });
      case 'mi':
        return new MI({ value, attr, children });
      case 'mo':
        return new MO({ value, attr, children });
      case 'mn':
        return new MN({ value, attr, children });
      default:
        return new Error('tag not implemented');
    }
  }
}