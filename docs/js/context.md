# How to avoid the prop-drilling problem in react, with Context

In addition to inserting react memo and loadable, last but not least, we have
adopted the use of Context to prevent the drilling-prop problem.

In order to use it, you can create manually a context (we reccomended to use the Context folder) e.g.

```JSX
//Context/Context
import React from 'react';

const Context = React.createContext(null);

export default Context;
```

The initial value is optional.

After you should set a Component Provider:

```JSX
//Components/A
import React from 'react';
import Context from 'Context/Context';

const A = () => (
  <Context.Provider value="green">
    <D />
  </Context.Provider>
);
```

The Provider in this case, show only the D compnent, without passing any props.

Finally you can create the Consumer component, and consume the context.

```JSX
//Components/C
import React from 'react';
import Context from 'Context/Context';

const C = () => (
  <Context.Consumer>
    {value => (
      <p style={{ color: value }}>
        Hello World
      </p>
    )}
  </Context.Consumer>
);
```

You can learn more, by read this [Context](https://www.robinwieruch.de/react-context) article, by Robin Wieruch
