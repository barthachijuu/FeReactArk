[![dependencies Status](https://david-dm.org/barthachijuu/FeReactArk/status.svg)](https://david-dm.org/barthachijuu/FeReactArk)  [![devDependencies Status](https://david-dm.org/barthachijuu/FeReactArk/dev-status.svg)](https://david-dm.org/barthachijuu/FeReactArk?type=dev) [![Coverage Status](https://coveralls.io/repos/github/barthachijuu/FeReactArk/badge.svg?branch=master)](https://coveralls.io/github/barthachijuu/FeReactArk?branch=master) 

# FeReactArk

The purpose of this guide is to get the project up and running with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich
webpack build system that's already setup to provide hot reloading, SCSS preprocessing with Sass, unit testing, code coverage reports, bundle splitting, and more.

## Table of Contents

- [FeReactArk](#fereactark)
  - [Table of Contents](#table-of-contents)
  - [What this boilerplate contains](#what-this-boilerplate-contains)
  - [Browsers Support](#browsers-support)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Install from source](#install-from-source)
  - [Application Structure](#application-structure)
  - [Development](#development)
    - [Developer Tools](#developer-tools)
    - [Using Redux DevTools](#using-redux-devtools)
    - [Routing](#routing)
    - [What about Actions/Reducers/Sagas and Forms?](#what-about-actionsreducerssagas-and-forms)
    - [Implementing Components](#implementing-components)
    - [Actions](#actions)
    - [Reducers](#reducers)
    - [Sagas](#sagas)
  - [Deployment](#deployment)
    - [Static Deployments](#static-deployments)
  - [Build System](#build-system)
    - [Configuration](#configuration)
    - [Globals](#globals)
    - [Styles](#styles)
    - [Server](#server)
    - [Production Optimization](#production-optimization)
  - [Learning Resources](#learning-resources)

---

## What this boilerplate contains

<img src="./repo_readme_assets/react.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/redux.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/router.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/logo-sass.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/logo-npm.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/yarn.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/logo-es6.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/logo-node.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/logo-webpack.png" height="55">&nbsp;&nbsp;
<img src="./repo_readme_assets/jest.png" height="55">&nbsp;&nbsp;

- [x] Webpack task runner
- [x] SASS/SCSS Compiler & Linter + CSS Modules
- [x] ESLint minification
- [x] Yarn / Npm package managers
- [x] ES6 supported
- [x] Npm-better
- [x] React Lazy Mode for Routes
- [x] Styleguidist
- [x] Jest
- [x] Enzyme
- [x] React Redux Form
- [x] Generators

---

## Browsers Support

|<img src="./repo_readme_assets/browsers/browser-ie.svg" height="35">|<img src="./repo_readme_assets/browsers/browser-firefox.svg" height="35">|<img src="./repo_readme_assets/browsers/browser-chrome.svg" height="35">|<img src="./repo_readme_assets/browsers/browser-safari.svg" height="35">|<img src="./repo_readme_assets/browsers/browser-opera.svg" height="35">|
|--------------------------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Edge+ | latest | latest | latest | latest |

---

## Features

- [react](https://github.com/facebook/react)
- [redux](https://github.com/rackt/redux)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [react-router](https://github.com/rackt/react-router)
- [webpack](https://github.com/webpack/webpack)
- [babel](https://github.com/babel/babel)
- [express](https://github.com/expressjs/express)
- [jest](https://jestjs.io/)
- [eslint](http://eslint.org)

## Requirements

- [Node](http://nodejs.org/download/) (version >= 8.0.x)
- [Yarn](https://yarnpkg.com/en/docs/install) (version >= 1.3.x)

## Getting Started

After confirming that your development environment meets the specified [requirements](#requirements), you can create a new project by doing the following:

### Install from source

First, clone the project:

```bash
git clone git@github.com:barthachijuu/FeReactArk.git
cd FeReactArk
```

Then install dependencies and check to see it works. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic installs, but `npm install` will work just as well.

```bash
yarn setup --project=projectName # Sets up a new project with the given name and generates project's scaffolding.
yarn start # Compile and launch (same as `npm start`)
```

If everything works, you should see the homepage

While developing, you will probably rely mostly on `yarn start`; however, there are additional scripts at your disposal:

|`yarn run <script>`|Description|
|------------------|-----------|
|`analyze`|Launches the package analyzer. [Read more about Webpack Visualizer](https://github.com/chrisbateman/webpack-visualizer).|
|`archive`|Create an archive of the `~/dist` directory.|
|`clean`|Clean the `~/dist` directory.|
|`compile`|Compiles the application to disk (`~/dist` by default).|
|`generate`|Starts the generate prompt. Read more about this in `~/GENERATORS.md`.|
|`get-version`|Retrieve latest version of architecture. Useful for deploy.|
|`lint`|Lint all`.js` files.|
|`lint:fix`|Lint and fix all`.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).|
|`lint:web`|Lint all files on `/web` directory. Prevent commit if found errorrs|
|`prettify`|Lauches prettier in the whole project. [Read more about Preittier](https://prettier.io/).|
|`reinit`|Cleans up the project for a fresh start.|
|`setup`|Sets up a new project and generates project's scaffolding.|
|`start`|Serves your app at `localhost:4000`. HMR will be enabled in development.|
|`styleguidist`|Serves styleguidist at `localhost:6060`. |
|`test`|Launches all tests written using [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/docs/api/).|
|`test:watch`|Launches tests never launched before.|

## Application Structure

The application structure presented in this boilerplate is **fractal**, where functionality is grouped primarily by feature rather than file type. Please note,
however, that this structure is only meant to serve as a guide, it is by no means prescriptive. That said, it aims to represent generally accepted guidelines and
patterns for building scalable applications. If you wish to read more about this pattern, please check out this
[awesome writeup](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure) by [Justin Greenberg](https://github.com/justingreenberg).

```bash

│
├── config            <! Project Configuration Files !>
│   ├── deployenv
│   │   ├── development.js
│   │   ├── integration.js
│   │   ├── production.js
│   │   └── staging.js
│   ├── environments.config.js
│   ├── global.vars.js
│   └── project.config.js
│
├── generators        <! Generators Sources !>
│   ├── action
│   ├── apimocks
│   ├── apirest
│   ├── bootstrap
│   ├── component
│   ├── reducer
│   ├── route
│   ├── sagas
│   ├── subroute
│   ├── utils
│   └── index.js
│
├── internals         <! Build/Start scripts !>
│   ├── helpers
│   │   ├── __mocks__
│   │   │     └──jestMock.js
│   │   ├── checkmark.js
│   │   ├── matchMedia.mock
│   │   ├── progress.js
│   │   └── SCSSStub.js
│   ├── analyze.js
│   ├── archive.js
│   ├── clean.js
│   ├── compile.js
│   ├── dev-server.js
│   ├── enzyme.setup.js
│   └── setup.js
│
├── repo_readme_assets  <! Images for Readme !>
│   └── readme images
│
├── server  <! Express Application !>
│   ├── utils
│   │   ├── check-version.js
│   │   └── logger.js
│   └── server.js
│
├── web
│   ├── assets        <! Static Resources !>
│   │   ├── fonts
│   │   └── styles    <! Global SCSS !>
│   └── src
│       ├── api         <! Application REST Scripts !>
│       ├── components  <! Global Components !>
│       ├── containers  <! Global App Container !>
│       ├── mocks       <! Application test responses !>
│       ├── routes      <! Project Routes !>
│       ├── store       <! Redux Store !>
│       ├── utility     <! Global SCSS !>
│       ├── index.html
│       └── index.jsx
│
├── webpack <! Build Rulse Configuration Files !>
│   ├── webpack.compile.js
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   ├── webpack.monitor.js
│   └── webpack.prod.js
│
├──.babelrc
├──.browserslistrc
├──.editorconfig
├──.eslintignore
├──.eslintrc
├──.gitignore
├──.gitattrbutes
├──.jsbeautifyrc
├──.markdownlint.json
├──.prettierrc
├──.scss-lint.yml
├── AUTHORS.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CODE_REVIEW.md
├── CONTRIBUTING.md
├── COMMIT_TEMPLATE.md
├── LICENSE.md
├── MAP.md
├── package.json
├── postcss.config.js
├── README.md
└── yarn.lock
```

## Development

### Developer Tools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords to better performance and functionality. It comes with several of the most
popular monitors, is easy to configure, filters actions, and doesn’t require installing any packages.

However, adding the DevTools components to your project is simple. First, grab the packages from npm:

### Using Redux DevTools

[Redux Devtools](https://github.com/gaearon/redux-devtools) are enabled by default in development.

```html
— <kbd>CTRL</kbd>+<kbd>H</kbd> Toggle DevTools Dock
— <kbd>CTRL</kbd>+<kbd>Q</kbd> Move DevTools Dock Position
```

See [redux-devtools-dock-monitor](https://github.com/gaearon/redux-devtools-dock-monitor) for more detailed information.

If, you have the [Redux DevTools chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) installed it will
automatically be used on the client-side instead.

DevTools are not enabled during production.

### Routing

We use `react-router` [route definitions](https://github.com/reactjs/react-router/blob/master/docs/API.md#plainroute) (`<route>/index.js`) to define units of
logic within our application. See the [application structure](#application-structure) section for more information.

To create a new route, we recommend to use the generator tools. If you want to create a route manually, go to the file `index.js`: adding a PlainRoute object evaluated by react-router during application bootstrap.
There two different route exports, based on if the route should be visible to logged users or not.

```jsx
export const createAuthRoutes = () => ({
  routes: [
    {
      path: '/myAuthorizedRoute',
      // exact path only if we do not have any subroutes
      exact: false,
      component: props => <LazyComponent {...props} componentName="MyAuthorizedRoute" />,
    },
    ...
  ]
});

export const createUnauthRoutes = () => ({
  routes: [
    {
      path: '/myUnauthorizedRoute',
      exact: false,
      component: props => <LazyComponent {...props} componentName="MyUnauthorizedRoute" />,
    },
    ...
  ]
});
```

Also you can use two different methods to add a route, a [lazy route](https://reactjs.org/docs/code-splitting.html#reactlazy) and an async route, the first one will show a loading fallback before it gets rendered and the second one will not. (Use lazy route as much as possible to keep our application's optimization consistent).

Let's start defining a new route, on top of our `routes/index.jsx` just after our initial imports:

```jsx
// Lazy Route with chunkName so we can recognize it during app compilation.
const MyAwesomeRoute = lazy(() => import(/* webpackChunkName: "MyAwesomeRoute" */ './MyAwesomeRoute'));
```

Or as an Async Component:

```jsx
const MyAwesomeRoute = asyncComponent(() => import('./MyAwesomeRoute').then(module => module.default(rootStore)), 'MyAwesomeRoute');
```

**If we used lazy method** we also need to add the route name to exported Components' names:

```jsx
export const Components = {
    ...
    MyAwesomeRoute
};
```

In `<route>/components` create the route components.

At `<route>/RootComponent.jsx` add the <Switch> component of react-router-dom to manage additional nested child routes.

```jsx
export const MyAwesomeRoute = props => (
  <Switch>
    <Route path={`${props.match.path}/`} component={MyAwesomeRoute} exact />
    <Route path={`${props.match.path}/MyAwesomeSubroute`} component={MyAwesomeSubroute} />
  </Switch>
);
```

In `<route>/index.js`:

Let's export our route components, if it is a lazy route:

```js
import RootComponent from './RootComponent';

export default RootComponent;
```

or an async route:

```js
import RootComponent from './RootComponent';

export default () => RootComponent;
```

### What about Actions/Reducers/Sagas and Forms?

**Actions**, **Reducers**, **Sagas** are dynamically imported if they are present inside `<route>/modules` folder.

**Foms** in routes are also imported dynamically, they only need to be named in `store/reducers/form.js` with the route's name plus Form, like this:

```js
// Instead of route you must put the same name of your route in lowercase
export const routeFormReducers = combineForms({
  RouteForm: {
    fieldOne: '',
    fieldTwo: false,
  },
}, 'routeForm');
```

### Implementing Components

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. These are all normal React components, so we won't
examine them in detail. We write functional stateless components unless we need to use local state or the lifecycle methods.

React bindings for Redux embrace the idea of separating presentational and container components. If you're not familiar with these terms,
[read about them first](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0).

**Counter.jsx** is the presentational and is concerned with how things look.

```jsx
export const Counter = props => (
  <div>
    <Value
      icon={<TasksIcon />}
      value={props.counter}
      label={props.intl.formatMessage(messages.counter)}
    />
    <div>
      <div>
        <Button
          onClick={props.increment}
        >
          <Pulse />
        </Button>

        <Button
          accent
          onClick={props.doubleAsync}
          label={props.intl.formatMessage(messages.doubleAsync)}
        />
        <Link to="/counter/twittersearch" >{props.intl.formatMessage(messages.vaitwitter)}</Link>
      </div>
    </div>
  </div>
);

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default Counter;

```

**CounterContainer.js** is the container and is concerned with how things work.

```jsx
import { connect } from 'react-redux';
import { increment, doubleAsync } from '../../modules/actions';

/* This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter: */

import Counter from './Counter';

/* Object of action creators (can also be function that returns object).
Keys will be passed as props to presentational components. Here we are
implementing our wrapper around increment; the component doesn't care*/

const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
};

const mapStateToProps = state => ({
  counter: state.counter
});

/*
  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:
    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

  Selectors can compute derived data, allowing Redux to store the minimal possible state.
  Selectors are efficient. A selector is not recomputed unless one of its arguments change.
  Selectors are composable. They can be used as input to other selectors.
  https://github.com/reactjs/reselect
*/

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```

Technically, a container component is just React component that uses store.subscribe() to read a part of the Redux state tree and supply props to a
presentational component it renders. You could write a container component by hand, but we suggest instead generating container components with React Redux
library's connect() function, which provides many useful optimizations to prevent unnecessary re-renders. (One result of this is that you shouldn't have to worry
about React performance suggestion of implementing shouldComponentUpdate yourself.)

To use connect(), you need to define a special function called mapStateToProps that tells how to transform the current Redux store state into the props you want
to pass to a presentational component you are wrapping.
In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called mapDispatchToProps() that
receives the dispatch() method and returns callback props that you want to inject into the presentational component.

### Actions

Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator,” so do your best to use the proper
term.

```js
import { createRequestTypes, createAction } from 'Store/actions';

export const actionTypes = {
  COUNTER_INCREMENT: 'COUNTER_INCREMENT',
  COUNTER_DOUBLE: 'COUNTER_DOUBLE',
  COUNTER_DOUBLE_ASYNC: 'COUNTER_DOUBLE_ASYNC',
  GITHUB_SEARCH: 'GITHUB_SEARCH',
  ...createRequestTypes('USER')
};

// ------------------------------------
// Actions
// ------------------------------------



export function increment(value: number = 1) {
  return {
    type: actionTypes.COUNTER_INCREMENT,
    payload: value
  };
}

export function doubleAsync(value: number = 1) {
  return {
    type: actionTypes.COUNTER_DOUBLE_ASYNC,
    payload: value
  };
}

```

### Reducers

Actions describe the fact that something happened, but don't specify how the application's state changes in response. This is the job of reducers

```js

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [actionTypes.COUNTER_INCREMENT]: (state: number, action: Action) => state + action.payload,
  [actionTypes.COUNTER_DOUBLE]: (state: number, action: Action) => state * 2, // eslint-disable-line
  [actionTypes.USER_SUCCESS]: (state, action: Action) => Object.keys(action.payload).length
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
export default function counterReducer(state: number = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}

```

### Sagas

Redux-saga is a library that aims to make side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) in
React/Redux applications easier and better.

```js
// Our worker Saga: will perform the async increment task
export function* doubleAsync() {
  yield call(delay, 1000);
  yield put(double());
}

function* watchDoubleAsync() {
  yield takeEvery(actionTypes.COUNTER_DOUBLE_ASYNC, doubleAsync);
}
```

## Deployment

Out of the box, this starter kit is deployable by serving the `~/dist` folder generated by `yarn run deploy` (make sure to specify your target `NODE_ENV` as well).
This project does not concern itself with the details of server-side rendering or API structure, since that demands an opinionated structure that makes it
difficult to extend the starter kit. However, if you do need help with more advanced deployment strategies, here are a few tips:

### Static Deployments

If you are serving the application via a web server such as nginx, make sure to direct incoming routes to the root `~/dist/index.html` file and let react-router
take care of the rest. If you are unsure of how to do this, you might find
[this documentation](https://github.com/reactjs/react-router/blob/master/docs/guides/Histories.md#configuring-your-server) helpful. The Express server that comes
with the starter kit is able to be extended to serve as an API or whatever else you need, but that's entirely up to you.

## Build System

### Configuration

Default project configuration can be found in `~/config/project.config.js`. Here you'll be able to redefine your `src` and `dist` directories, adjust compilation
settings, tweak your vendor dependencies, and more. For the most part, you should be able to make changes in here
**without ever having to touch the actual webpack build configuration**.

If you need environment-specific overrides (useful for dynamically setting API endpoints, for example), you can edit `~/config/environments.config.js` and define
overrides on a per-NODE_ENV basis. There are examples for both `development` and `production`, so use those as guidelines. Here are some common configuration
options:

|Key|Description|
|---|-----------|
|`dir_src`|application source code base path|
|`dir_dist`|path to build compiled application to|
|`server_host`|hostname for the Express server|
|`server_port`|port for the Express server|
|`compiler_devtool`|what type of source-maps to generate (set to `false`/`null` to disable)|
|`compiler_vendor`|packages to separate into to the vendor bundle|

Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if
you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js
// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'Components/SomeComponent' // Hooray!
```

Here is a list of available resolved paths, feel free to add yours to `~/webpack/webpack.config.js`:

- Api
- Components
- Mocks
- Store
- Route
- Root
- Utility

### Globals

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in
`~/config/project.config.js`. When adding new globals, make sure you also add them to `~/.eslintrc`.

|Variable|Description|
|---|---|
|`process.env.NODE_ENV`|the active `NODE_ENV` when the build started|
|`__DEV__`|True when `process.env.NODE_ENV` is `development`|
|`__PROD__`|True when `process.env.NODE_ENV` is `production`|
|`__TEST__`|True when `process.env.NODE_ENV` is `test`|

### Styles

Both`.scss` and`.css` file extensions are supported out of the box. After being imported, styles will be processed with
[PostCSS](https://github.com/postcss/postcss) for minification and autoprefixing, and will be extracted to a`.css` file during production builds.

### Server

This starter kit comes packaged with an Express server. It's important to note that the sole purpose of this server is to provide `webpack-dev-middleware` and
`webpack-hot-middleware` for hot module replacement. Using a custom Express app in place of [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
makes it easier to extend the starter kit to include functionality such as API's, universal rendering, and more -- all without bloating the base boilerplate.

### Production Optimization

Babel is configured to use [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined. In
production, webpack will extract styles to a`.css` file, minify your JavaScript, and perform additional optimizations such as module deduplication.

## Learning Resources

- [Starting out with react-redux-starter-kit](https://suspicious.website/2016/04/29/starting-out-with-react-redux-starter-kit/) is an introduction to the
  components used in this starter kit with a small example in the end.
- [Front-End Developer Handbook 2018](https://frontendmasters.com/books/front-end-handbook/2018/) is a guide that anyone could use to learn about the
 practice of front-end development.
