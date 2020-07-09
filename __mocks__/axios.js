const axios = {
  __esModule: true,
  default: jest.fn(() => Promise.resolve({ data: 'data' })),
};
module.exports = axios;
