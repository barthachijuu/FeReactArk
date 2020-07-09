# Use memoization to improve UI performance

In order to improve the UI performance, we adopted to use the memoization feature,
React.memo().
You can use it with component generator 'Do you want the component use the momoized functionality?'
option activated.

This is the content of the file withe the option activated:

```JSX
import React from 'react';

const myComponent = () => (
  <>
    <p>Render Component</p>
  </>
);


export default React.memo(myComponent);

```

We reccomended to use the memoized functionality, only with this criteria are met:

- *Pure functional component* Your component is functional and given ever the same props
- *Render often* Your component render often
- *Re-renders with the same props* Your component is provided with the same props when re-rendering
- *Medium to big size* Your component contains a decent amount of UI elems

To get a more detailed view of rect memo, we recommend you read this article by [dmitri pavlutin](https://dmitripavlutin.com/use-react-memo-wisely/)
