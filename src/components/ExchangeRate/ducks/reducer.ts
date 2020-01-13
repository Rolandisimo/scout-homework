import { ExchangeRatesState, exchangeRatesInitialState } from "./state";
import {
  SetExchangeRatesAttemptAction,
  SetExchangeRatesFailedAction,
  SetExchangeRatesSuccessAction,
} from "./actions";
import {
  SET_EXCHANGE_RATES_FAILED,
  SET_EXCHANGE_RATES_ATTEMPT,
  SET_EXCHANGE_RATES_SUCCESS,
} from "./consts";

export type ReducerActions =
  | SetExchangeRatesAttemptAction
  | SetExchangeRatesFailedAction
  | SetExchangeRatesSuccessAction
;

export function exchangeRatesReducer(
  state: ExchangeRatesState = exchangeRatesInitialState,
  action: ReducerActions,
): ExchangeRatesState {
  switch (action.type) {
    case SET_EXCHANGE_RATES_ATTEMPT: {
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    }
    case SET_EXCHANGE_RATES_FAILED: {
      return {
        ...state,
        error: typeof action.payload === "string" ? action.payload : action.payload.message,
        isLoading: false,
      };
    }
    case SET_EXCHANGE_RATES_SUCCESS: {
      return {
        data: action.payload,
        error: null,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}
