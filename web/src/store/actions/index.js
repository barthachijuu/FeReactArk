const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export function createRequestTypes(base) {
  return [
    `${base}_${REQUEST}`,
    `${base}_${SUCCESS}`,
    `${base}_${FAILURE}`,
  ].reduce((acc, type) => {
    acc[type] = type;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return { type, ...payload };
}
