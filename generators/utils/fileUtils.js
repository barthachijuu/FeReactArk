const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const utils = {
  /**
   * Return true if the pattern match
   *
   * @param  {filename} string  The file to open
   * @param  {method} string  The string to validate
   */
  checkString: (filename, method) => method.test(fs.readFileSync(path.join(process.cwd(),
  `/app/${filename}`), 'utf-8')),
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
  pascalize: string => string.replace(/\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()).replace(/\s|\-/g, ''),
  /**
   * Return constant case of string
   *
   * @param  {string} string  The string to return in constant case
   */
  constantize: string => string.toUpperCase().replace(/\s/g, '_'),
  /**
   * Check existence of file in folder
   *
   * @param  {string} fielename      The filename to check existation
   */
  checkExist: fileName => fs.existsSync(path.join(process.cwd(), `/app/${fileName}`)),
  /**
   * List every Route
   *
   */
  readDir: srcPath => fs.readdirSync(srcPath),
  /**
   * Return base path
   */
  getPath: () => path.join(process.cwd(), `/app/`),
  /**
   * Return directory content if exist
   */
  getDirectoryContent: (dir) => {
    if (fs.existsSync(path.join(process.cwd(), `/app/${dir}`))) {
      return fs.readdirSync(path.join(process.cwd(), `/app/${dir}`));
    }
    return [];
  },
  // Trim template
  trimTemplateFile: template => fs.readFileSync(template, 'utf8').replace(/\s(?!(?:[^']*'[^']*')*[^']*$)/gm, ''),
  newLine: template => fs.readFileSync(template, 'utf8').replace(/__new__$/, '\n'),
  getAuthor: () => execSync('git config --get user.name').toString().replace(/\n/, ''),
  getDate: () => new Date().toGMTString().slice(5, 16).replace(/\s/g, '-'),
  getActionList: filename => fs.readFile(path.join(process.cwd(), `/app/${filename}`), 'utf-8', (err, data) => {
    if (err) return err;
    const lines = data.split('\n');
    lines.splice(0, 12);
    const start = lines.findIndex(line => line.indexOf('// @generator action:route:type') > -1);
    lines.splice(start);
    const action = lines;
    return action;
  }),
};

module.exports = utils;
