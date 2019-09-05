# Configuration: A Glossary

A guide to the configuration files for this project: where they live and what
they do.

## The root folder

- `.babelrc`: All babel options configuration, are stored in this file.

- `.browserlistrc`: The config to share target browsers and Node.js versions between different front-end tools.

- `.editorconfig`: Sets the default configuration for certain files across editors. (e.g. indentation)

- `.eslintignore`: A list of files of folder, which eslint ignore.

- `.eslintrc`: A list configuration for the eslint plugin.

- `.gitattributes`: Normalizes how `git`, the version control system this boilerplate uses, handles certain files.

- `.gitignore`: Tells `git` to ignore certain files and folders which don't need to be version controlled, like the build folder.

- `appveyor.yml`: Continuous Integration configuration
  This boilerplate uses [AppVeyor](https://www.appveyor.com/), but feel free
  to swap either out for your own choice of CI.

- `package.json`: Our `npm` configuration file has three functions:

  1. It's where Babel and ESLint are configured
  2. It's the API for the project: a consistent interface for all its controls
  3. It lists the project's package dependencies

  Baking the config in is a slightly unusual set-up, but it allows us to keep
  the project root as uncluttered and grokkable-at-a-glance as possible.

## The `./internals` folder

This is where the bulk of the tooling configuration lives, broken out into
recognisable units of work.

Feel free to change anything you like but don't be afraid to ask whether you
should: build systems are easy to break!
