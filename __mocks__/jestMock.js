import { shape } from 'prop-types';

export default {
  context: {
    router: {
      history: {
        push: jest.fn(),
        replace: jest.fn(),
        createHref: jest.fn(),
      },
      route: {
        location: {
          hash: '',
          pathname: '',
          search: '',
          state: '',
        },
        match: {
          params: {},
          isExact: false,
          path: '',
          url: '',
        },
      },
    },
  },
  childContextTypes: {
    router: shape({
      route: shape({
        location: shape({}),
        match: shape({}),
      }),
      history: shape({}),
    }),
  },
};
