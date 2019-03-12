const fs = require('fs');
const path = require('path');

const utils = {
  /**
   * Return true if the pattern match
   *
   * @param  {filename} string  The file to open
   * @param  {method} string  The string to validate
   */
  checkString: (filename, method) => !method.test(fs.readFileSync(path.join(__dirname, `../../web/src/${filename}`), 'utf-8')),
  /**
   * Return true if is a dir
   *
   * @param  {string} string  The string to validate
   */
  isDirectory: string => fs.lstatSync(string).isDirectory(),
  /**
   * Return camel case of string
   *
   * @param  {string} string  The string to return in camel case
   */
  camelize: string => string.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase()),
  /**
   * Return pascal case of string
   *
   * @param  {string} string  The string to return in pascal case
   */
  pascalize: string => string.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s/g, ''),
  /**
   * Return pascal case of string
   *
   * @param  {string} string  The string to return in constant case
   */
  constantize: string => string.toUpperCase().replace(/\s/g, '_'),
  /**
   * Check existence of file in folder
   *
   * @param  {string} fielename      The filename to check existation
   */
  checkExist: fileName => !fs.existsSync(path.join(__dirname, `../../web/src/${fileName}`)),
  /**
   * List every Route
   *
   */
  readDir: srcPath => fs.readdirSync(srcPath),
  /**
   * Return base path
   */
  getPath: () => path.join(__dirname, `../../web/src/`),
  // Trim template
  trimTemplateFile: template => fs.readFileSync(template, 'utf8').replace(/\s(?!(?:[^']*'[^']*')*[^']*$)/gm, ''),
  newLine: template => fs.readFileSync(template, 'utf8').replace(/__new__$/, '\n'),

};

module.exports = utils;
