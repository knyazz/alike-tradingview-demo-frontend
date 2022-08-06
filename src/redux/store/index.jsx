import axios from 'axios';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import axiosMiddleware from 'redux-axios-middleware';

import { config, initialState } from 'core/settings';
import { asyncDispatchMiddleware } from 'redux/middleware/asyncMiddleware';
import * as reducers from 'redux/reducers';
import history from 'router/history';

//axios
axios.defaults.baseURL = config.api.host;
const client = axios.create({
  baseURL: config.api.host,
  responseType: 'json'
});
const errorOption = { returnRejectedPromiseOnError: true };

// local storage
const saveStateToStorage = (state) => {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantDemoState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
};

const loadStateFromStorage = () => {
  try {
    const serialisedState = localStorage.getItem("persistantDemoState");
    if (serialisedState === null) return initialState;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return initialState;
  }
};

// reducers
const rootReducer = combineReducers({ ...reducers, routing: routerReducer });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  loadStateFromStorage(),
  composeEnhancer(
    applyMiddleware(
      axiosMiddleware(client, errorOption),
      thunkMiddleware,
      routerMiddleware(history),
      asyncDispatchMiddleware
    ),
  )
);
store.subscribe(() => saveStateToStorage(store.getState()));