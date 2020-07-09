# Command Line Commands

## Initialization

```Shell
yarn setup --project=project_name
```

Initializes a new project with this boilerplate. Deletes the `fe-architecture`
git history, installs the dependencies and initializes a new repository.

> Note: This command is self-destructive, once you've run it the init script is
> gone forever. This is for your own safety, so you can't delete your project's
> history irreversibly by accident.

## Development

```Shell
yarn start
```

Starts the development server running on `http://localhost:random_port`

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
`localhost:random_port`. Changes in the application code will be hot-reloaded.

### Production

```Shell
yarn start:production
```

- Runs tests (see `yarn test`)
- Builds your app (see `yarn compile`)
- Starts the production server (see yarn start:prod)

The app is built for optimal performance: assets are minified and served gzipped.

## Building

```Shell
yarn build
```

Prepare your app for deployment on environment that is not production (does not run tests). The code has base optimization
and is not minified. All files are piping them to the `build` folder.

Upload the contents of `build` to your web server to see your work live!

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

### Remote testing

```Shell
yarn start:tunnel
```

Starts the development server and tunnels it with ngrok, making the website available worldwide.
Useful for testing on different devices in different locations!

### Dependency size test

```Shell
yarn analyze
```

This command will generate a `stats.json` file from your build, which you can
visualize on `locahost:9001` with [webpack jarvis](https://github.com/zouhir/jarvis).
This analyzer will visualize your dependencies and chunks with detailed statistics
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

## Deploing

```Shell
yarn deploy
```

Prepare your app for deployment. That command includes linting and testing. Optimizes and
minifies all files, piping them to the `dist` folder. If one of between lint or test fails,
the process stopped. Upload the contents of `dist` to your web server to see your work live!
