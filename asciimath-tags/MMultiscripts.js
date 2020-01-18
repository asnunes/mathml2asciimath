const BaseTag = require('./BaseTag');
const trim = require('trim');

module.exports = class MRow extends BaseTag {
  constructor(tag) {
    super(tag);
    this.flagChildrens();
  }

  flagChildrens() {
    const { children } = this.tag;
    let currentFlag = POS_SCRIPT_FLAG;
    for (let i = 1; i < children.length; i++) {
        if (children[i].constructor.name === "MPrescripts") currentFlag = PRE_SCRIPT_FLAG;
        else {
            children[i].tag.attributes.currentFlag = currentFlag;
            currentFlag = POS_SCRIPT_FLAG;
        }
    }
  }

  toAsciimath() {
    const { children } = this.tag;
    const base = children[0];
    const prescripts = findChildrenByFlag(children, PRE_SCRIPT_FLAG);
    const posScripts = findChildrenByFlag(children, POS_SCRIPT_FLAG);

    const prescriptsAnscii = prescripts.map(pre => pre.toAsciimath());
    const posScriptsAnscii = posScripts.map(pos => pos.toAsciimath());

    const prescriptString = isOnlyEmptySpaces(prescriptsAnscii) ? '' : `{::}_(${prescriptsAnscii.join(', ')})`;
    const posScriptString = isOnlyEmptySpaces(posScriptsAnscii) ? '' : `^(${posScriptsAnscii.join(', ')})`;

    return prescriptString + base.toAsciimath() + posScriptString;
  }
}

const POS_SCRIPT_FLAG = 'posScript';
const PRE_SCRIPT_FLAG = 'preScript';

function findChildrenByFlag(children, flag) {
    return children.filter(c => c.tag.attributes.currentFlag === flag);
}

function isOnlyEmptySpaces(arrOfStr) {
    return trim(arrOfStr.join('')) === '';
}