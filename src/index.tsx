import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ReducersMapObject, combineReducers, Store, createStore } from "redux";

import { AppConnected } from './App';
import { State } from "./ducks/state";
import { exchangeRatesReducer } from "./components/ExchangeRate/ducks/reducer";

import * as serviceWorker from './serviceWorker';
import './index.css';

const reducersMapObject: ReducersMapObject<State, any> = {
  exchangeRates: exchangeRatesReducer,
};

const reducers = combineReducers<State>(reducersMapObject);
const store: Store<State> = createStore(
  reducers,
);

ReactDOM.render(
  <Provider store={store}>
    <AppConnected />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
