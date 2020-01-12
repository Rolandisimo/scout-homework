import { FetchedData } from "../../../types";

export interface ExchangeRates {
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export type ExchangeRatesState = FetchedData & {
  data: ExchangeRates | null
};

export const exchangeRatesInitialState: ExchangeRatesState = {
  isLoading: false,
  error: null,
  data: null,
}
