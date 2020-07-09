const chalk = require('chalk');
const semver = require('semver');
const childProcess = require('child_process');
const packageConfig = require('../../package.json');

function exec(cmd) {
  return childProcess
    .execSync(cmd)
    .toString()
    .trim();
}

const versionRequirements = [{
  name: 'node',
  currentVersion: semver.clean(process.version),
  versionRequirement: packageConfig.engines.node,
},
{
  name: 'npm',
  currentVersion: exec('npm --version'),
  versionRequirement: packageConfig.engines.npm,
},
];

module.exports = () => {
  const warnings = [];
  for (let i = 0; i < versionRequirements.length; i += 1) {
    const mod = versionRequirements[i];
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(`${mod.name} : ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`);
    }
  }

  if (warnings.length) {
    console.log(chalk.yellow('To use this template, you must update following to modules:'));
    for (let i = 0; i < warnings.length; i += 1) {
      const warning = warnings[i];
      console.log(` ${warning}`);
    }
    process.exit(1);
  }
};
