module.exports = addParenthesesIfIsMoreThanOneChar = str => {
  return str.length > 1 ? `(${str})` : str;
};