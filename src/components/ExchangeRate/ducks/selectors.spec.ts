import { selectExchangeRates } from "./selectors";
import { ExchangeRatesState } from "./state";

describe("ExchangeRate", () => {
  describe("ducks", () => {
    describe("selectors", () => {
      const state: ExchangeRatesState = {
        data: { base: "eur", rates: {}, date: "today" },
        error: null,
        isLoading: false,
      };

      it("should select rates", () => {
        expect(selectExchangeRates({ exchangeRates: state })).toEqual({
          data: { base: "eur", rates: {}, date: "today" },
          error: null,
          isLoading: false,
        })
      });
    });
  });
});
