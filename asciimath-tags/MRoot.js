const BaseTag = require('./BaseTag');

module.exports = class MRoot extends BaseTag {
  constructor(tag) {
    super(tag);
  }

  toAsciimath() {
    const { children } = this.tag;

    if (children.length !== 2) {
      new Error('Wrong number of children for mroot tag. It should have exactly 2.');
    }

    const base = children[0];
    const index = children[1];
    const baseAsciimath = base.toAsciimath();
    const indexAsciimath = index.toAsciimath();

    return `root(${indexAsciimath})(${baseAsciimath})`;
  }
}