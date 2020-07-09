# Documentation

## Table of Contents

- [General](general)
  - [**CLI Commands**](general/commands.md)
  - [Tool Configuration](general/files.md)
  - [FAQ](general/faq.md)
- [Testing](testing)
  - [Unit Testing](testing/unit-testing.md)
  - [Component Testing](testing/component-testing.md)
- [JS](js)
  - [Redux](js/redux.md)
  - [Immer](js/immer.md)
  - [reselect](js/reselect.md)
  - [redux-saga](js/redux-saga.md)
  - [i18n](js/i18n.md)
  - [routing](js/routing.md)
  - [generator](js/generator.md)

## Overview

### Quickstart

1. First, let's start with some try on our project by launching the setup command:

    ```Shell
    yarn setup --project=your_project && yarn start
    ```

2. A tab on localhost with a random port will be open, and you try to create some routes or components,
   with the generators.

    - Create a route with command `yarn generate route`
    - Edit the file at `./web/src/routes/your_route/components/your_route.jsx` changing the text with some different
      and reads your new text to see [Hot Module Reloading](https://webpack.js.org/guides/hot-module-replacement/) in action.

3. Time to build your own app:

    ```shell
    yarn reinit
    ```

    ...and now it's time to start your real project.

### Development

Run `yarn start` to see your app at `localhost:random_port`

### Building & Deploying

1. Run `yarn compile`, which will compile all the necessary files to the `dist` folder.

2. Upload the contents of the `dist` folder to your web server's root folder.

### Structure

The [`app/`](../../../tree/master/app) directory contains your entire application code, including SCSS,
JavaScript, HTML and tests.

The rest of the folders and files only exist to make your life easier, and should not need to be touched.

### SCSS

The SCSS syntax uses the file extension .scss. With a few small exceptions, it’s a superset of CSS,
which means essentially all valid CSS is valid SCSS as well. Because of its similarity to CSS,
it’s the easiest syntax to get used to and the most popular.

See the [SCSS documentation](./scss/README.md) for more information.

### JS

We bundle all your clientside scripts and chunk them into several files using code splitting where possible.
We then automatically optimize your code when building for production so you don't have to worry about that.

See the [JS documentation](./js) for more information about the JavaScript side of things.

### Testing

For a thorough explanation of the testing procedure, see the [testing documentation](./testing)!

#### Browser testing

`yarn start:tunnel` makes your locally-running app globally available on the web via a temporary URL:
This make you the possibility to have a great feature for testing on different devices, client demos, etc!

#### Unit testing

Unit tests live in each of the `tests/` folders created directories right next to the components being tested
and are run with `yarn test`.
