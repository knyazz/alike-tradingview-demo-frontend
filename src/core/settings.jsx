export const SUCCESS_SUFFIX = '_SUCCESS';
export const ERROR_SUFFIX = '_FAIL';

export const LOAD_STATUSES = {
  INIT: 0,
  LOADING: 11,
  LOADED: 111
}

export const config = {
  api: {
    host: 'http://127.0.0.1:22222'
  }
};

export const getInitialState = () => {
  return {
    product: {
      results: [],
      selected: null
    },
    routing: { locationBeforeTransitions: null },
  };
};

export const initialState = getInitialState();