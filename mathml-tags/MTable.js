const BaseTag = require('./BaseTag');

module.exports = class MTable extends BaseTag {
  constructor(tag) {
    super(tag);
    this.markInnerMTables(this.tag.children);
  }

  markInnerMTables(children) {
    children.forEach(child => {
      this.markInnerMTables(child.tag.children);
      if (child.constructor.name === "MTable") child.tag.attributes.innerMTable = true;
    });
  }

  toAsciimath() {
    const { innerMTable } = this.tag.attributes;
    return innerMTable ? this.mapChildrenToAsciimath().join('') : this.mapChildrenToAsciimath().join(', ');
  }
}