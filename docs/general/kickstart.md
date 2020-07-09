# Let's Kickstart with `FeReactArk`

The [`README.md`](https://github.com/barthachijuu/FeReactArk#features) provides you with basic information on how to clone the project,
install all dependencies and start the project. Once you have done this, this document is intended to give you a taste of how this
architecture works. It still assumes the basic knowledge of React, Redux and "react-router".
**If you are completely new on React, refer to https://github.com/petehunt/react-howto instead!** This architetcture is ready for
production and as such optimized for all modern browsers. It's easy also for nobies. It includes tools to help you manage the performance,
asynchrony, style and everything you need to create a _real_ application. Before we get your hands dirty with the source code, we would like
you to examine a checklist that will help you determine whether or not you are ready to use this architecture. It's not because we're goods
than you, (maybe a little :) ) but rather because we really want to save you from frustration.
If you're in trouble, you can open an issue, and the team's give you all the necessary attention, but please make it a point to read the
[docs](https://github.com/barthachijuu/FeReactArk/tree/master/docs) the [contribution instructions](https://github.com/barthachijuu/FeReactArk/tree/master/CONTRIBUTING.md)
and the [best pratctices](https://github.com/barthachijuu/FeReactArk/tree/master/BEST_PRACTICES.md) before you do. The issues section is
specifically used for pointing out defects and suggesting enhancements. If you have a question about one of the tools please refer to
StackOverflow instead.

## 🛠 Tech Stack

Here is a short curated list of bookstores you should know before starting your fantastic project. However, the best way to get a complete
view of the dependencies is to check [package.json](https://github.com/barthachijuu/FeReactArk/tree/master/package.json).

### 💽 Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [ ] [Reselect](https://github.com/reactjs/reselect)
- [ ] [Immer](https://github.com/mweststrate/immer)
- [ ] [JSS](https://cssinjs.org)

### 📊 Unit Testing

- [ ] [Jest](http://facebook.github.io/jest/)
- [ ] [Enzyme](https://enzymejs.github.io/enzyme/)

### 📃 Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)
- [ ] [stylelint](https://stylelint.io/)

`FeReactArk` includes a lot of features, and you can find instructions in the docs folder.

## Project Structure

- You will write your app in the `app` folder. This is the folder you will spend most, if not all, of your time in.
- Configuration, generators and templates are in the `internals` and `generators` folders.
- The `server` folder contains development and production server configuration files.

### `app/`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/`
contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for
data. **Container components care about how things work, while components care about how things look.**
We've found that for many applications treating single pages (e.g. the LoginPage, the HomePage, etc.) as containers and their small parts
(e.g. the Login form, the Navigation bar) as components works well, but there are no rigid rules.
**Bend the architecture to the needs of your app, nothing is set in stone!**

### `internals/`

You can call this area the "engine" of your app. Your source code cannot be executed as-is in the web browser. It needs to pass through webpack to
get converted into a version of Javascript that web browsers understand. While it's certainly helpful to understand what's happening here, for real
world usage, you won't have to mess around with this folder much.

- `webpack`: You'll most probably use ECMAScript 6 or ECMAScript 7 to write the source code of your app. webpack takes care of making it compatible
  with a majority of browsers.

> ([ECMAScript](http://stackoverflow.com/a/33748400/5241520) is the standard for JavaScript. Most people are still using browsers which understand ECMAScript 5. So your code must be [transpiled](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) into browser-understandable code. To apply the transpiler to your source code, you will use webpack. Feeling the jitters already? [Don't worry](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.d2uasw2n6). Take a tea-break and then read on.)

- `generators`: This folder has the code to scaffold out new components, containers, routes and many more.
  Read [more about scaffolding](https://github.com/barthachijuu/FeReactArk/tree/master/docs/js/generator) in the docs.

- `internals`: This folder contains the scripts used for the creation/clean of the project, analayze it and more.

The other folders are mostly for the maintainers and/or the setup, and you should absolutely never need to touch them so we are going skip them for the
sake of brevity.

### `server/`

As the name suggests, this folder contains development and production server configuration.

## Basic Building Blocks

After you create your project scaffold, can launch the app by running `yarn start`. To fully understand its inner workings, you'll have to understand
multiple technologies and how they interact. From this point, we're going into an overdrive of implementation details. We'll simplify the technical
jargon as much as we can. Please bear with us here.

### How does the application boot up

Like any other webpage your app starts with the `app/index.html`, in this case we have an `index.ejs` file. React will render your application into `div#app` .

But how do we include all of your react components into a single HTML file? That's where webpack comes into the picture. webpack will literally pack your
application into small javascript files. These files will be injected into the `index.ejs` as `<script>` tags, and transform the `ejs` file into an `html`.

When your application is deployed on a server, browsers will load this HTML file. The Javascript files that webpack has included will be executed by the
browser, thereby booting up your React application! That's crazy, like [Dynamo](https://it.wikipedia.org/wiki/Dynamo_(illusionista)! No, not really, though
it can certainly seem that way. Let's dissect all to better know what's really going on.

### `app/main.jsx`

When you run `yarn start`, an [express server](http://expressjs.com/) will be launched in your terminal for development. Automatically a web page it's open
on [http://localhost:4200](http://localhost:4200) to access the server and see your app.

Webpack requires an entry point to your application. In this boilerplate `app/main.jsx` is that entry point. Webpack will access the entire app from this file,
transpile the application into ES5 and create small chunks of transpiled code. Only the required chunks will be loaded in the browser so that you don't have
to worry about the size of your application.

`app/main.jsx` is one of the most important files of the architecture. It contains all the global setup to make sure your app runs smoothly.
Let's analyze its contents:

- A redux `store` is instantiated, with a `history` object, which remembers all the browsing history for your app. This is used by the ConnectedRouter to know which pages your users visit.
- `ReactDOM.render()` that renders the root react component called `<MainContainer />`, of your application, that also renders other importants components like `<Provider />`, `<LanguageProvider />` and `<ConnectedRouter />`.
- Hot module replacement is set up via vanilla [Webpack HMR](https://webpack.js.org/guides/hot-module-replacement/) that makes all the reducers, injected sagas, components, and containers hot reloadable.
- Offline plugin support to make your app [offline-first](https://developers.google.com/web/fundamentals/getting-started/codelabs/offline/).
- `<Provider />` connects your app with the redux `store`.
- `<LanguageProvider />` provides language translation support to your app.

### Redux

Redux is going to play a huge role in your application. If you're new to Redux, we'd strongly suggest you to complete this checklist and then come back:

- [ ] Understand the motivation behind Redux
- [ ] Understand the three principles of Redux
- [ ] Implement Redux in a small React app of yours

The Redux `store` is the heart of your application. Check out `createStore.js` file on your project to see how we have configured the store.

The store is created with the `createStore()` factory, which accepts three parameters.

1. **Root reducer:** A master reducer combining all your reducers.
2. **Initial state:** The initial state of your app as determined by your reducers.
3. **Middleware/enhancers:** Middlewares are third party libraries which intercept each redux action dispatched to the redux store and then... do stuff. For example, if you install the [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) middleware, it will listen to all the actions being dispatched to the store and print previous and next state in the browser console. It's helpful to track what happens in your app.

In our application we are using some middleware.

1. **Router middleware:** Keeps your routes in sync with the redux `store`.
2. **Redux saga and thunkMiddleware:** Used for managing _side-effects_ such as dispatching actions asynchronously or accessing browser data.
3. **redux immutable state invariant:** Used for check if you try to mutate your state.
4. **Monitor and logger:** Used to analyze and visualize your state progression and your dispatched actions

### Reselect

Reselect is a library used for slicing your redux state and providing only the relevant sub-tree to a react component. It has three key features:

1. Computational power
2. Memoization
3. Composability

Imagine an application that shows a list of users. Its redux state tree stores an array of usernames with signatures:

`{ id: number, username: string, gender: string, age: number }`.

Let's see how the three features of reselect help.

- **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed, and subsequently cached, result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
- **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`

### Redux Saga

If your application is going to interact with some back-end application for data, we recommend using redux saga for side effect management.
Too much jargon? Let's simplify.
Imagine that your application is fetching data in json format from a back-end. For every API call, ideally you should define at least three
kinds of [action creators](http://redux.js.org/docs/basics/Actions.html):

1. `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2. `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3. `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **_one_** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage
all of them effectively? This essentially boils down to controlling the flow of your application. What if there was a background process that handles
multiple actions simultaneously, communicates with the Redux store and react containers at the same time? This is where redux-saga comes into the picture.

The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. `redux-saga` is a redux middleware,
which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application
state and it can dispatch redux actions as well.

### Linting

This architecture includes a complete static code analysis setup. It's composed of [ESLint](http://eslint.org/), [stylelint](https://stylelint.io/), and
[Prettier](https://prettier.io/).
We recommend that you install the relevant IDE extensions for each one of these tools. Once you do, every time you'll press save,
all your code will be formatted and reviewed for quality automatically. (Read more at [editor.md](./editor.md).)
We've also set up a git hook to automatically analyze and fix linting errors before your code is committed. If you'd like to disable it or modify its
behavior, take a look at the `lint-staged` section in `package.json`.
