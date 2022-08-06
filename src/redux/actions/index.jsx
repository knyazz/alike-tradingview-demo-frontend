import { makeDispatch } from 'redux/utils';

export const SET_PRODUCT = 'SET_PRODUCT';
export const GET_PRODUCTS = 'GET_PRODUCTS';


export const products = () => (dispatch, getState) => {
  return makeDispatch({
    data: null,
    dispatch,
    method: 'GET',
    params: null,
    state: getState(),
    type: GET_PRODUCTS,
    url: "api/v1/ticker/"
  });
};