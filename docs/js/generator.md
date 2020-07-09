# Generators

## Table of Contents

- [Generators](#generators)
  - [Table of Contents](#table-of-contents)
  - [Project Explanation](#project-explanation)
  - [Geneator Type](#geneator-type)
  - [Basic command](#basic-command)
  - [Type specific command](#type-specific-command)
    - [Scaffolding](#scaffolding)
    - [Actions](#actions)
    - [Api](#api)
    - [Component](#component)
    - [Mock](#mock)
    - [Route](#route)
    - [Saga](#saga)
    - [Subroute](#subroute)

---

## Project Explanation

This guide was writter to explein how the generators work.
We have choosen [plop](https://plopjs.com/) for create the generators.

## Geneator Type

With this tool, you can generate:

  1. Initial Scaffolding
  2. Actions
  3. Api
  4. Component
  5. Mock
  6. Route
  7. Saga
  8. Subroute

The options [2, 3, 5, 7] will be available when one or more routes will be creted.

## Basic command

You can run the basic command using this sintax:
```yarn generate```

After few seconds, a menu is show to you, and you can select one of the listed voices. When select one, you will be asked a bunch of questions you can answer in order to customize the file you want to make.

Otherwise, you can launch a specific command to generate a specific file.
```yarn generate api```

Before you launch or select any command different from boostrap, make sure you have created the scaffolding, to prevent any error on console.

## Type specific command

### Scaffolding

Launch it with the syntax:
```yarn generate bootstrap```

You can bypass the first question, by append a container name, and the generator will create for you, all the scaffolding files for starting the project

This command generates the scaffolding for the project with a name passed

```yarn generate boostrap fe-architecture```

### Actions

Launch it with the syntax:
```yarn generate action```

After you launch the command you will have to answer some questions before you can create the action
You will have to enter:

- If the action is global or for a specific route.
- Select an existing file to add the actions, create a new file;
- name of the action;
- if is a request;

When you create a new action global file, automatically, a reducer file is also created with rhe initial scaffolding

This is an example of generated code

```js
import { createRequestTypes, createAction } from './index';

export const actionTypes = {
  GET_DATA: 'GET_DATA',
  // @generator action:type
  ...createRequestTypes('GET_USER_DATA'),
  // @generator action:type:request
};

// ------------------------------------
// Actions
// ------------------------------------

// @generator action:request
export const getUserData = {
  request: request => createAction(actionTypes.GET_USER_DATA_REQUEST, { request }),
  success: (response, payload) => createAction(actionTypes.GET_USER_DATA_SUCCESS, { response, payload }),
  failure: (response, payload) => createAction(actionTypes.GET_USER_DATA_FAILURE, { response, payload }),
};
// @generator action
export function doGetData() {
  return {
    type: actionTypes.GET_DATA,
    payload: {},
  };
}

```

### Api

Launch it with the syntax:
```yarn generate api```

After you launch the command you can choose an api file, where the method will be included.
This generator has only three answers. The method name, the url of the REST service and the method type.
If you don't know the REST url, leave blank, and add it after.
This generator, generate also the correspondent mocks file on the mocks folder.

This is an example of generated code

``` js
export async function getName(params) {
  let data;

  try {
    data = await axios({
      method: '',
      baseURL: `${API_REST_BE}/`,
      url: ``,
      data: { ...params },
      headers: { ...defaultHeaders },
    });
    return { response: data.data };
  } catch (error) {
    console.error(error);
    return { error: error.response.data };
  }
}
```

### Component

Launch it with the syntax:
```yarn generate component```

After you launch the command you will have to answer some questions before you can create the component
You will have to enter:

- If will be a statefull or stateless component. If you don't know the difference, follow this link. [react-component](https://reactjs.org/docs/react-component.html)
- the name of the component;
- if will have a container;
- if will have a SCSS module;
- if will have propTypes;
- if will handle the text;
When the component will be created, also a markdown files and an initial unit test it will be. The markdown will be used for [styleguidist](https://react-styleguidist.js.org/)

This is an example of generated code

```js
/**
 *
 * Box
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Box.scss';

class Box extends React.PureComponent {
  render() {
    return (
      <></>
    );
  }
}

Box.propTypes = {
  // Add here some propTypes
};

Box.defaultProps = {
  // Add here some default propTypes values
};

export default Box;
```

### Mock

Launch it with the syntax:
```yarn generate mock```

After you launch the command you can choose an api file, where the mock method will be included.
This generator has only three answers. The api where the mock will be injected, the url of the REST service will be mocked,
the method type and the resposnse status.

This is an example of generated code

``` js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// MOCK ADMIN
mock.onPost('/my_mock_api').reply(200, {
  ...mySpreadObject,
});

// @generator mock:method

export default mock;
```

### Route

Launch it with the syntax:
```yarn generate route```

After you launch the command you will have to answer some questions before you can create the route
You will have to enter:

- The route name;
- If you want the exact path. Fore more info click on this link
  [exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)
- If you want the route is loading in lazy mode;
- If the route need an authentication to be accissible;
- If the route need to access to history;
- If the route will have your own actions, sagas and reducer.

### Saga

Launch it with the syntax:
```yarn generate saga```

After you launch the command you will have to answer some questions before you can create the saga
You will have to enter:

- If the saga is global or for a specific route.
- Select an existing file to add the saga, create a new file;
- name of the saga;

This is an example of generated code

```js
import { all, put, takeEvery, fork } from 'redux-saga/effects';

const delay = ms => new Promise(res => setTimeout(res, ms));


function* getUser() {

}
// @generator saga


// @generator saga:watch
function* watchGetUser() {

}

  yield all([
  fork(watchGetUser),
    // @generator saga:fork
  ]);
```

### Subroute

Launch it with the syntax:
```yarn generate subroute```

After you launch the command you will have to answer some questions before you can create the route
You will have to enter:

- In which route the subroute will be placed;
- The subroute name;
- If you want the exact path. Fore more info click on this link
  [exact](https://reacttraining.com/react-router/web/api/Route/exact-bool)
- If you want the route is loading in lazy mode;
- If the route need an authentication to be accissible;
- If the route need to access to history;
- If the route will have your own actions, sagas and reducer.
