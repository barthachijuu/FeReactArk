# JavaScript

## State management

This boilerplate manages application state using [Redux](redux.md)
and keeps access performant via [`reselect`](reselect.md).

For managing asynchronous flows (e.g. logging in) we use [`redux-saga`](redux-saga.md).

For routing, we use [`react-router`](routing.md).

We include a generator for components, api, sagas, routes and selectors.
Run `yarn generate` to choose from the available generators, and automatically
add new parts of your application!

> Note: If you want to skip the generator selection process,
> `yarn generate <generator>` also works. (e.g. `yarn generate route`)

### Learn more

- [Redux]()
- [reselect](reselect.md)
- [redux-saga](redux-saga.md)
- [routing](routing.md)
- [Asynchronously loaded components]()

## Architecture: `components` and `containers`

We adopted a split between stateless, reusable components called (wait for it...)
`components` and stateful parent components called `containers`.

### Learn more

See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
by Dan Abramov for a great introduction to this approach.