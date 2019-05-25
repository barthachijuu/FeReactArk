# Documentation

## Table of Contents

## Overview

### Quickstart

1. First, let's kick the tyres by launching the sample _Repospective_ app
    bundled with this project to demo some of its best features:

    ```Shell
    yarn setup --project=your_project && yarn start
    ```

2. Open [localhost:3000](http://localhost:4000) to see it in action.

    - Create a route with command `yarn generate route`
    - Edit the file at `./web/src/routes/your_route/components/your_route.jsx` changing the text with some different
      and reads your new text to see [Hot Module Reloading](https://webpack.js.org/guides/hot-module-replacement/) in action.

3. Time to build your own app: If you want to start from scratch run

    ```shell
    yarn reinit
    ```

    ...and use the built-in generators to start your first feature.

### Development

Run `yarn start` to see your app at `localhost:3000`

### Building & Deploying

1. Run `yarn compile`, which will compile all the necessary files to the
    `dist` folder.

2. Upload the contents of the `dist` folder to your web server's root folder.

### Structure

The [`web/src/`](../../../tree/master/web/src) directory contains your entire application code, including CSS,
JavaScript, HTML and tests.

The rest of the folders and files only exist to make your life easier, and
should not need to be touched.

_(If they do have to be changed, please [submit an issue](https://github.com/barthachijuu/FeReactArk/issues)!)_

### JS

We bundle all your clientside scripts and chunk them into several files using
code splitting where possible. We then automatically optimize your code when
building for production so you don't have to worry about that.

See the [JS documentation](#) for more information about the
JavaScript side of things.

### Testing

For a thorough explanation of the testing procedure, see the
[testing documentation](#)!

#### Unit testing

Unit tests live in each of the `tests/` folders created directories right next to the components being tested
and are run with `yarn test`.