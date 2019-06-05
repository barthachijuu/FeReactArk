# Frequently Asked Questions

- [Frequently Asked Questions](#frequently-asked-questions)
  - [Where are Babel, Prettier and ESLint configured?](#where-are-babel-prettier-and-eslint-configured)
  - [Where are the files coming from when I run `yarn start`?](#where-are-the-files-coming-from-when-i-run-yarn-start)
  - [How do I fix `Error: listen EADDRINUSE 127.0.0.1:4000`?](#how-do-i-fix-error-listen-eaddrinuse-1270014000)
    - [OS X / Linux:](#os-x--linux)
    - [Windows](#windows)
  - [Issue with local caching when running in production mode (F5 / ctrl+F5 / cmd+r weird behavior)](#issue-with-local-caching-when-running-in-production-mode-f5--ctrlf5--cmdr-weird-behavior)
      - [Quick fix on your local browser:](#quick-fix-on-your-local-browser)
  - [Non-route containers](#non-route-containers)
  - [How to keep my project up-to-date with `fe-react-ark`?](#how-to-keep-my-project-up-to-date-with-fe-react-ark)
  - [How to turn off Webpack performance warnings after production build?](#how-to-turn-off-webpack-performance-warnings-after-production-build)
  - [Have another question?](#have-another-question)

## Where are Babel, Prettier and ESLint configured?

ESLint, Babel and Prettier all have their own config files in the root of the project. Same for Jest and stylelint.

## Where are the files coming from when I run `yarn start`?

In development Webpack compiles your application runs it in-memory. Only when
you run `yarn compile` will it write to disk and preserve your bundled
application across computer restarts.

## How do I fix `Error: listen EADDRINUSE 127.0.0.1:4000`?

This simply means that there's another process already listening on port 3000.
The fix is to kill the process and rerun `yarn start`.

### OS X / Linux:

1.  Find the process id (PID):

    ```Shell
    ps aux | grep node
    ```

    > This will return the PID as the value following your username:
    >
    > ```Shell
    > janedoe    29811  49.1  2.1  3394936 356956 s004  S+    4:45pm   2:40.07 node server
    > ```
    >
    > Note: If nothing is listed, you can try `lsof -i tcp:3000`

2.  Then run
    ```Shell
    kill -9 YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `29811`, hence
    > that would mean you would run `kill -9 29811`

### Windows

1.  Find the process id (PID):

    ```Shell
    netstat -a -o -n
    ```

    > This will return a list of running processes and the ports they're
    > listening on:
    >
    > ```
    > Proto     Local Address     Foreign Address   State       PID
    > TCP       0.0.0.0:25        0.0.0.0:0         Listening   4196
    > ...
    > TCP       0.0.0.0:3000      0.0.0.0:0         Listening   28344
    > ```

    ```

    ```

1.  Then run
    ```Shell
    taskkill /F /PID YOUR_PID
    ```
    > e.g. given the output from the example above, `YOUR_PID` is `28344`, hence
    > that would mean you would run `taskkill /F /PID 28344`

## Issue with local caching when running in production mode (F5 / ctrl+F5 / cmd+r weird behavior)

Your production site isn't working? You update the code and nothing changes? It drives you insane?

#### Quick fix on your local browser:

To fix it on your local browser, just do the following. (Suited when you're testing the production mode locally)

`Chrome dev tools > Application > Clear Storage > Clear site data` _(Chrome)_

## Non-route containers

> Note: Container will always be nested somewhere below a route. Even if there's dozens of components
> in between, somewhere up the tree will be route. (maybe only "/", but still a route)

## How to keep my project up-to-date with `fe-react-ark`?

While it's possible to keep your project up-to-date or "in sync" with `FeReactArk`, it's usually
very difficult and is therefore **_at your own risk_** and not recommended. You should not need to do it either, as
every version you use will be amazing! There is a long term goal to make this much easier but no ETA at the moment.

## How to turn off Webpack performance warnings after production build?

Webpack recommends having those performance hints turned off in development but to keep them on in production. If you still want to disable them, add the next lines to the config in `webpack.prod.babel.js`:

```js
performance: {
  hints: false;
}
```

You can find more information about the `performance` option (how to change maximum allowed size of a generated file, how to exclude some files from being checked and so on) in the [Webpack documentation](https://webpack.js.org/configuration/performance/).

## Have another question?

Submit an [issue](https://github.com/barthachijuu/FeReactArk/issues)