const chalk = require('chalk');
const semver = require('semver');
const packageConfig = require('../../package.json');
const childProcess = require('child_process');

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
        console.log(chalk.yellow('To use this template, you must update following to modules:')); // eslint-disable-line

        for (let i = 0; i < warnings.length; i += 1) {
            const warning = warnings[i];
            // eslint-disable-next-line
            console.log(` ${warning}`);
        }
        // eslint-disable-next-line
        console.log();
        process.exit(1);
    }
};
