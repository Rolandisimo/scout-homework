import {
  SET_EXCHANGE_RATES_ATTEMPT,
  SET_EXCHANGE_RATES_FAILED,
  SET_EXCHANGE_RATES_SUCCESS,
} from "./consts";
import { ExchangeRates } from "./state";

export interface SetExchangeRatesAttemptAction {
  type: typeof SET_EXCHANGE_RATES_ATTEMPT;
}
export const setExchangeAttemptRates = (): SetExchangeRatesAttemptAction => ({
  type: SET_EXCHANGE_RATES_ATTEMPT,
})

export interface SetExchangeRatesFailedAction {
  type: typeof SET_EXCHANGE_RATES_FAILED;
  payload: any;
}
export const setExchangeFailedRates = (error: any): SetExchangeRatesFailedAction => ({
  type: SET_EXCHANGE_RATES_FAILED,
  payload: error,
})

export interface SetExchangeRatesSuccessAction {
  type: typeof SET_EXCHANGE_RATES_SUCCESS;
  payload: ExchangeRates;
}
export const setExchangeSuccessRates = (payload: ExchangeRates): SetExchangeRatesSuccessAction => ({
  type: SET_EXCHANGE_RATES_SUCCESS,
  payload,
})
