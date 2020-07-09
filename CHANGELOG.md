# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [2.0.0] — 2020-07-07

### News

Hooray!! Fe React Architecture v2.0.0 is out and we added a lot of cool update:

- React has added many new features and we decided to take this opportunity:
  - We now use `React.memo` and `Context` for prop memoization and prevent the drilling prop.
  - We've added `@loadable` to manage components in lazy mode, and handling a fallback during the loading of them.)
- After much case study, Immutability is finally gone. We've added `Immer` instead. With it, we can write very concise and readable
  reducers while sticking to native JavaScript data structures.
- We added react helmet. Now you can manage title and description for every single route

There are many more changes to our documentation, internals, generators and general project setup. You can find a full changelog below.

### Main

- Reorganize the root structure
- Added `Immer`
- Now reducers handling immutability
- Add `eslint-plugin-react-hooks`
- Migrate all class components to functions
- Add `React.memo` option and `Context` for improove components performance.
- Use `loadable-components` to code-split and asynchronously load components
- Add the fallback language to prevent a possibile CMS 500 error
- Handling the dynamic environments

### Documentation updates

- Update all md files to explain new functionality
- Spelling and grammar fixes

### Internals updates

- Many dependency updates and some libraries added, including:
  - react-helmet
  - offline-plugin
  - connected-react-router
  - @loadable/component
  - redux-devtools-extension
  - ngrok
  - redux-thunk
  and many oters.
- Migrate default Node version to `10.0.0`
- Fix support for `stylelint`
- Rewrite generators code
- Complete rewrite of express web server
- Remove unused libraries
- New Webpack code config
- Miscellaneous fixes
- Rewrite actions creations code
- Rewrite setup and clean scripts
- Reorganize the package.json scripts

### Others updates

- Fixes to generators
- Bug fix in setup script
- Reorganize fonts and images folders
- Remove scss in favour of jss

## [1.2.0] — 2019-06-06

## Minor Release

### Added

- Added some documentation

## [1.1.0] — 2019-04-18

## Minor Release

### Added

- Added Travis configuration for CI.
- Added Coveralls configuration for manage code history
- Added jest test for coveralls
- Fixed some code for linting error.

## [1.0.0] — 2019-04-14

## First Release

### Added

- Added default language helper on generator.

## [0.0.9] — 2019-04-13

### Added

- Added default langiage helper on generator.

## [0.0.8] — 2019-04-13

### Changed

- Remove container append text on clean script.
- Clean code for setup script.
- Add improovements on setup script, to prevent wrong launch.

## [0.0.7] — 2019-04-12

### Fixed

- Fixed some problem on generator.

## [0.0.6] — 2019-04-09

### Fixed

- Fixed generator for prevent error on regex.

### Removed

- Removed Material UI.

## [0.0.5] — 2019-04-05

### Added

- Jest Configuration.
- Enzyme.
- PostCSS Configuration.
- Roboto Font and Material Icon

## [0.0.4] — 2019-04-02

### Added

- Express server.
- Axios libraries.
- Logger and check version utils.
- Commit template

## [0.0.3] — 2019-03-29

### Added

- SCSS Scaffolding.
- Store configuration.
- Package.json structure.
- Lzy and Async component injector.
- Libraries and scripts for project automation.
- Index page.

## [0.0.2] — 2019-03-12

### Added

- Generators.
- Webpack configuration for dev and prod environments.
- Webpack compiler and monitor stats.
- Project configuration and deploy envs.

## [0.0.1] — 2019-03-11

### Added

- Project configuration, linting rules and style rules.
- This CHANGELOG file to hopefully serve as an evolving example of a standardized open source project CHANGELOG.
- All md files explain all the details of this project.
