module.exports = addParenthesesToMultipleCharString = str => {
  return str.length > 1 ? `(${str})` : str;
};