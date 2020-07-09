# Styling (CSS)

- [Styling (CSS)](#styling-css)
  - [Next Generation CSS](#next-generation-css)
    - [Linting](#linting)
  - [CSS Support](#css-support)
  - [jss](#jss)
  - [Stylesheet](#stylesheet)

## Next Generation CSS

This boilerplate uses [`jss`](https://cssinjs.org/?v=v10.3.0) with `react-jss` for styling react components.
`jss` allows you to write actual CSS inside your JavaScript.
There are many ways to style react applications, but we choose `jss` , before migrate to `styled-components`

### Linting

To complement `jss`, this architecture also has a CSS linting setup. It uses `stylelint` which will help you stay
consistent with modern CSS standards. Read about it [here](linting.md).

## CSS Support

We support and recommend the use of `jss`. We also support the use of CSS [stylesheets](#stylesheet).

There are many ways to style web applications, unfortunately, we cannot support them all.

## jss

Below creates a react components (`<Button>` and renders them as children of the `<App>` component:

```jsx
import React from 'react';
import {createUseStyles} from 'react-jss'


const useStyles = createUseStyles({
  myButton: {
    color: 'green',
    margin: {
      // jss-plugin-expand gives more readable syntax
      top: 5, // jss-plugin-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': {
      // jss-plugin-nested applies this to a child span
      fontWeight: 'bold' // jss-plugin-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
})

const Button = ({children}) => {
  const classes = useStyles()
  return (
    <button className={classes.myButton}>
      <span className={classes.myLabel}>{children}</span>
    </button>
  )
}

const App = () => <Button>Submit</Button>

render(<App />, document.getElementById('root'))
```

> For more information about `react-jss` see https://cssinjs.org/react-jss

## Stylesheet

[Webpack](https://webpack.js.org/) allows you to import more than JavaScript.
Using the [`css-loader`](https://webpack.js.org/loaders/css-loader/) you can import CSS into a JavaScript:

**`Button.css`**

```css
.danger {
  background-color: #c30000;
}
```

**`Button.js`**

```js
import React from 'react';
import './Button.css'; // Tell Webpack that Button.js uses these styles

function Button() {
  // You can use them as regular CSS styles
  return <button className="danger">Click me</button>;
}
```

> For more information about Stylesheets and the `css-loader` see https://github.com/webpack-contrib/css-loader
