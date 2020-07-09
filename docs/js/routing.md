# Routing via `react-router` and `connected-react-router`

`react-router` is the de-facto standard routing solution for react applications.
The thing is that with redux and a single state tree, the URL is part of that
state. `connected-react-router` takes care of synchronizing the location of our
application with the application state.

(See the [`connected-react-router` FAQ](https://github.com/supasate/connected-react-router/blob/master/FAQ.md)
for more information)

## Usage

To add a new route, you can simply use the generator, to create a new one. `yarn generate route` and then it will
added on the route list:

```JS
  routes: [
    {
      path: '/',
      exact: false,
      component: props => <LazyComponent {...props} componentName="Home" />,
    },
    // [...]
```

Top level routes are located in `index.jsx`.

If you want your route component to be loaded in lazy mode, answer on genrator route with 'hould the route be lazy loaded?'.

## Child Routes

For example, if you have a route called `about` at `/about` and want to make a child route called `team` at `/about/our-team`,
you can run the command generator `yarn generate subroute`, and it create them on components folder, and insert as Route
in RootComponent of Route.

```JS
// AboutPage/RootComponent.jsx
import { Switch, Route } from 'react-router-dom';

const AboutPaage = props => (
  <>
    <Switch>
      <Route path={`${props.match.path}/`} component={About} exact />
      <Route path={`${props.match.path}/our-teams`} component={Blog} />
    </Switch>
  </>
);
```

You can read more in [`react-router`'s documentation](https://reacttraining.com/react-router/web/api).
