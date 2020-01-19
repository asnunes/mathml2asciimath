const fs = require('fs');
const path = require('path');

const exposeAllAsciimathTags = () => {
  return fs.readdirSync(__dirname).reduce((acc, fileName) => {
    const baseName = path.basename(fileName, '.js').toLowerCase();
    
    if (baseName === 'index') return acc;
    acc[baseName] = require(path.join(__dirname, fileName));
    return acc;
  }, {});
};

module.exports = exposeAllAsciimathTags();