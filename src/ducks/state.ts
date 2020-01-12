import { ExchangeRatesState, exchangeRatesInitialState } from "../components/ExchangeRate/ducks/state";

export interface State {
  exchangeRates: ExchangeRatesState;
};

export const initialState: State = {
  exchangeRates: exchangeRatesInitialState
};
