module.exports = addParenthesesIfThereIsEmptySpaces = str => {
  return str.match(/\s+/g) ? `(${str})` : str;
};