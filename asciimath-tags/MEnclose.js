const BaseTag = require('./BaseTag');

module.exports = class MEnclose extends BaseTag {
  constructor(tag) {
    super(tag);
    this.notation = this.tag.attributes.notation;
  }

  toAsciimath() {
    const childrenAsciimath = this.mapChildrenToAsciimath().join('');

    return {
      longdiv: `)bar(${childrenAsciimath})`,
      actuarial: `bar(${childrenAsciimath})|`,
      box: `|ul(bar(${childrenAsciimath}))|`,
      roundedbox: `(ul(bar(${childrenAsciimath})))`,
      circle: `(ul(bar(${childrenAsciimath})))`,
      left: `|${childrenAsciimath}`,
      right: `${childrenAsciimath}|`,
      top: `bar(${childrenAsciimath})`,
      bottom: `ul(${childrenAsciimath})`,
      updiagonalstrike: `cancel(${childrenAsciimath})`,
      downdiagonalstrike: `cancel(${childrenAsciimath})`,
      verticalstrike: `cancel(${childrenAsciimath})`,
      horizontalstrike: `cancel(${childrenAsciimath})`,
    }[this.notation] || childrenAsciimath;
  }
}