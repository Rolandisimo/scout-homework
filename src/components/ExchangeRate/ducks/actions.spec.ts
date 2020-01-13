import {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
} from "./actions";
import { SET_EXCHANGE_RATES_ATTEMPT, SET_EXCHANGE_RATES_FAILED, SET_EXCHANGE_RATES_SUCCESS } from "./consts";
import { ExchangeRates } from "./state";

describe("ExchangeRate", () => {
  describe("ducks", () => {
    describe("actions", () => {
      it("should return action for creating exchange rate attempt", () => {
        expect(setExchangeAttemptRates()).toEqual({
          type: SET_EXCHANGE_RATES_ATTEMPT,
        })
      });
      it("should return action for creating exchange rate fail", () => {
        expect(setExchangeFailedRates("error message")).toEqual({
          type: SET_EXCHANGE_RATES_FAILED,
          payload: "error message"
        })
      });
      it("should return action for setting exchange rate attempt", () => {
        const payload: ExchangeRates = {
          base: "eur",
          date: "today",
          rates: {},
        };
        expect(setExchangeSuccessRates(payload)).toEqual({
          type: SET_EXCHANGE_RATES_SUCCESS,
          payload,
        })
      });
    });
  });
});
