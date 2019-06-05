# Introduction

The FrontEnd language ecosystem evolves at an incredible speed, and staying up to date may
seem like an unattainable goal. So instead of having to keep up with every new tool, feature
and technique to always be the center of attention, you can use this project that aims to
lighten the load by providing a reference line of the most valuable ones.

Using React Fe Ark, you can start your app quickly and easily, on what represents an optimal
development experience, best practices, more efficient tools and a cleaner project structure

- [**CLI Script**](commands.md)
- [Setting up your editor](editor.md)
- [Tool Configuration](files.md)
- [Generator](generator.md)
- [FAQ](faq.md)
- [Gotchas](gotchas.md)

# Feature overview

## Quick scaffolding

Automate the creation of actions, api, components, containers, routes, mock and sagas -
and their tests - right from the CLI!

Run `yarn generate` in your terminal and choose one of the parts you want
to generate. They'll automatically be imported in the correct places and have
everything set up correctly.

> We use [plop] to generate new components, you can find all the logic and
> templates for the generation in `generators`.

[plop]: https://github.com/amwmedia/plop

### Instant feedback

With the HMR, all the JS/CSS/HTML changes are reflected instantaneously without refreshing
the page. Preserve application state even when you update something in the underlying code!

## Predictable state management

We use Redux to manage our applications state. We have also added optional
support for the [Chrome Redux DevTools Extension] – if you have it installed,
you can see, play back and change your action history!

[chrome redux devtools extension]: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

### Next generation JavaScript

Use ESNext template strings, object destructuring, arrow functions, JSX syntax and more,
today. This is possible thanks to Babel with the `preset-env`, `airbnb` and `react presets`!

### Next generation CSS

Write composable CSS that's co-located with your components for complete modularity. Unique
generated class names keep the specificity low while eliminating style clashes. Ship only
the styles that are on the page for the best performance.

### Standard routing creation

It's natural to want to add pages (e.g. `/contact`) to your application, and routing makes
this possible. Thanks to [react-router] that's as easy as pie and the url is auto-synced to
your application state!

[react-router]: https://github.com/ReactTraining/react-router

### Static code analysis

Focus on writing new features without worrying about formatting or code quality. With the
right editor setup, your code will automatically be formatted and linted as you work.
Read more about linting in our [introduction](./introduction.md) and don't forget to setup
your by following [our instructions](./editor.md).

## Offline-first

The next frontier in performant web apps: availability without a network
connection from the instant your users load the app. This is done with the
use of Axios and Axios-mock-adapter.
> thanks to [`Axios`](https://github.com/axios/axios) and [`Axios-mock-adapter`](https://github.com/ctimmerm/axios-mock-adapter)

## Image optimization

Images often represent the majority of bytes downloaded on a web page, so image
optimization can often be a notable performance improvement. Thanks to Webpack's
[`image-loader`](https://github.com/tcoopman/image-webpack-loader), every PNG, JPEG, GIF and SVG images
is optimized.

See [`image-loader`](https://github.com/tcoopman/image-webpack-loader) to customize optimizations options.