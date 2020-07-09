const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const createAction = (type, payload = {}) => ({ type, ...payload });

export class MakeRequest {
  constructor(action) {
    this.request = request => createAction(`${action}_request`, { request });
    this.success = (response, payload) => createAction(`${action}_success`, { response, payload });
    this.failure = (error, payload) => createAction(`${action}_failure`, { error, payload });
  }
}


const createRequestTypes = (base, action) => ([`${action}_${REQUEST}`, `${action}_${SUCCESS}`, `${action}_${FAILURE}`]
  .reduce((acc, type) => { acc[type] = `${base}/${type.toLowerCase()}`; return acc; }, {}));


export {
  createAction,
  createRequestTypes,
};
