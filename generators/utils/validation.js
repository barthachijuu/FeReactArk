module.exports = {
  cmdName: name => /^[a-z][a-z0-9\-_]{2,}$/i.test(name) && name.indexOf('-') !== -1,
  uiName: name => /^[a-z][a-z0-9]+$/i.test(name) || 'The name can only contain alphanumeric characters and cannot start with a number',
  routeName: name => /^[a-z]+$/i.test(name) || 'The name can only contain alphabetic characters',
};
