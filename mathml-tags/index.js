const BaseTag = require('./BaseTag');
const MAction = require('./MAction');
const MathTag = require('./Math');
const MEnclose = require('./MEnclose');
const MError = require('./MError');
const MFenced = require('./MFenced');
const MFrac = require('./MFrac');
const MGlyph = require('./MGlyph');
const MI = require('./MI');
const MMultiscripts = require('./MMultiscripts');
const MN = require('./MN');
const MO = require('./MO');
const MOver = require('./MOver');
const MPadded = require('./MPadded');
const MPhantom = require('./MPhantom');
const MPrescripts = require('./MPrescripts');
const MRoot = require('./MRoot');
const MRow = require('./MRow');
const MSqrt = require('./MSqrt');
const MSub = require('./MSub');
const MSubsup = require('./MSubsup');
const MSup = require('./MSup');
const MTable = require('./MTable');
const MTd = require('./MTd');
const MText = require('./MText');
const MTr = require('./MTr');
const MUnder = require('./MUnder');
const MUnderOver = require('./MUnderOver');


module.exports = {
  'basetag': BaseTag,
  'maction': MAction,
  'math': MathTag,
  'menclose': MEnclose,
  'merror': MError,
  'mfenced': MFenced,
  'mfrac': MFrac,
  'mglyph': MGlyph,
  'mi': MI,
  'mmultiscripts': MMultiscripts,
  'mn': MN,
  'mo': MO,
  'mover': MOver,
  'mpadded': MPadded,
  'mphantom': MPhantom,
  'mprescripts': MPrescripts,
  'mroot': MRoot,
  'mrow': MRow,
  'msqrt': MSqrt,
  'msub': MSub,
  'msubsup': MSubsup,
  'msup': MSup,
  'mtable': MTable,
  'mtd': MTd,
  'mtext': MText,
  'mtr': MTr,
  'munder': MUnder,
  'munderover': MUnderOver,
};