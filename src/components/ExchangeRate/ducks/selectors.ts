import { ExchangeRatesState } from "./state";
import { State } from "../../../ducks/state";

export const selectExchangeRates = (state: State): ExchangeRatesState => state.exchangeRates;
