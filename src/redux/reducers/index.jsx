import { SET_PRODUCT, GET_PRODUCTS } from 'redux/actions';
import { SUCCESS_SUFFIX } from 'core/settings';

const product = (state = null, action) => {
  switch (action.type) {
    case SET_PRODUCT + SUCCESS_SUFFIX:
      return state;
    case GET_PRODUCTS + SUCCESS_SUFFIX:
      return {
        ...state,
        results: action.payload.data
      };
    default:
      return state;
  }
};

export {
  product,
};