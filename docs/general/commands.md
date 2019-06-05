# Command Line Commands

## Initialization

```Shell
yarn setup --project=project_name
```

Initializes a new project with this boilerplate. Deletes the `react-boilerplate`
git history, installs the dependencies and initializes a new repository.

> Note: This command is self-destructive, once you've run it the init script is
> gone forever. This is for your own safety, so you can't delete your project's
> history irreversibly by accident.

## Development

```Shell
yarn start
```

Starts the development server running on `http://localhost:4000`

## Cleaning

```Shell
yarn reinit
```

Deletes the example app, replacing it with the smallest amount of boilerplate
code necessary to start writing your app!

> Note: This command is self-destructive, once you've run it you cannot run it
> again. This is for your own safety, so you can't delete portions of your project
> irreversibly by accident.

## Generators

```Shell
yarn generate
```

Allows you to auto-generate boilerplate code for common parts of your
application, specifically `component`s, and `container`s. You can
also run `yarn generate <part>` to skip the first selection. (e.g. `yarn generate route`)

## Server

### Development

```Shell
yarn start
```

Starts the development server and makes your application accessible at
`localhost:4000`. Changes in the application code will be hot-reloaded.

### Production

```Shell
yarn start:production
```

- Runs tests (see `yarn test`)
- Builds your app (see `yarn compile`)

The app is built for optimal performance: assets are
minified and served gzipped.

## Building

```Shell
yarn build
```

Preps your app for deployment (does not run tests). Optimizes and minifies all files, piping them to the `dist` folder.

Upload the contents of `dist` to your web server to
see your work live!

## Testing

See the [testing documentation](../testing/README.md) for detailed information
about our testing setup!

## Unit testing

```Shell
yarn test
```

Tests your application with the unit tests specified in the `**/tests/*.js` files
throughout the application.
All the `test` commands allow an optional `-- [string]` argument to filter
the tests run by Jest. Useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
yarn test -- Button
```

### Watching

```Shell
yarn test:watch
```

Watches changes to your application and re-runs tests whenever a file changes.

### Dependency size test

```Shell
yarn analyze
```

This command will generate a `stats.json` file from your production build, which
you can upload to the [webpack analyzer](https://webpack.github.io/analyse/) or [Webpack Visualizer](https://chrisbateman.github.io/webpack-visualizer/). This
analyzer will visualize your dependencies and chunks with detailed statistics
about the bundle size.

## Linting

```Shell
yarn lint
```

Lints your JavaScript and your CSS.

```Shell
yarn lint:eslint:fix -- .
```

Lints your code and tries to fix any errors it finds.