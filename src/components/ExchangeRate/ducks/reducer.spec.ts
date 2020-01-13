import { exchangeRatesReducer } from "./reducer";
import { ExchangeRatesState, ExchangeRates } from "./state";
import {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
} from "./actions";

describe("ExchangeRate", () => {
  describe("ducks", () => {
    describe("reducer", () => {
      it("should return current state", () => {
        const state: ExchangeRatesState = {
          error: null,
          isLoading: false,
          data: null,
        };
        const action =  { type: "unknown" as any };
        expect(exchangeRatesReducer(state, action)).toEqual(state);
      });
      it("should attempt to set exchange rates", () => {
        const state: ExchangeRatesState = {
          error: null,
          isLoading: true,
          data: null,
        };
        expect(exchangeRatesReducer(state, setExchangeAttemptRates())).toEqual(state);
      });
      it("should fail to set exchange rates", () => {
        const state: ExchangeRatesState = {
          error: "failed to set",
          isLoading: false,
          data: null,
        };
        expect(exchangeRatesReducer(state, setExchangeFailedRates("failed to set"))).toEqual(state);
      });
      it("should fail to set exchange rates with Error class", () => {
        const error = new Error("failed to set")
        const state: ExchangeRatesState = {
          error: "failed to set",
          isLoading: false,
          data: null,
        };
        expect(exchangeRatesReducer(state, setExchangeFailedRates(error))).toEqual(state);
      });
      it("should successfully set exchange rates", () => {
        const payload: ExchangeRates = {
          base: "eur",
          date: "today",
          rates: {},
        };
        const state: ExchangeRatesState = {
          error: null,
          isLoading: false,
          data: payload,
        };
        expect(exchangeRatesReducer(state, setExchangeSuccessRates(payload))).toEqual(state);
      });
    });
  });
});
