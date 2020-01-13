import React from "react";
import { shallow } from "enzyme";
import { Main, MainProps, EXCHANGE_RATE_REQUEST_TIMEOUT } from "./Main";
import { Button } from "../Button/Button";
import ExchangeRateConnected from "../ExchangeRate/ExchangeRate";

const setExchangeAttemptRatesMock = jest.fn();
const setExchangeFailedRatesMock = jest.fn();
const setExchangeSuccessRatesMock = jest.fn();

describe("Main", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  const props: MainProps = {
    setExchangeAttemptRates: setExchangeAttemptRatesMock,
    setExchangeFailedRates: setExchangeFailedRatesMock,
    setExchangeSuccessRates: setExchangeSuccessRatesMock,
  };

  it("render button and exchange rate components", () => {
    const subject = shallow(<Main {...props} />);
    expect(subject.find(Button)).toHaveLength(1);
    expect(subject.find(ExchangeRateConnected)).toHaveLength(1);
  });

  it("pass exchange rate data to dispatches", (done) => {
    jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() => Promise.resolve({ json: async () => ({ data: "1234" }) } as any));

    const subject = shallow(<Main {...props} />);
    subject.find(Button).simulate("click");

    setTimeout(() => {
      expect(setExchangeAttemptRatesMock.mock.calls).toHaveLength(1);
      expect(setExchangeSuccessRatesMock).toHaveBeenCalledWith({ data: "1234" });

      done();
    });
  });

  it("call failure dispatch for requesting exchange rates", (done) => {
    const error = new Error("failed");
    jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() => Promise.reject(error));

    const subject = shallow(<Main {...props} />);
    subject.find(Button).simulate("click");

    setTimeout(() => {
      expect(setExchangeAttemptRatesMock.mock.calls).toHaveLength(1);
      expect(setExchangeFailedRatesMock).toHaveBeenCalledWith(error);

      done();
    });
  });

  it("call failure dispatch for requesting exchange rates if api returns error", (done) => {
    jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() => Promise.resolve({ json: async () => ({ error: "failed to request" }) } as any));

    const subject = shallow(<Main {...props} />);
    subject.find(Button).simulate("click");

    setTimeout(() => {
      expect(setExchangeAttemptRatesMock.mock.calls).toHaveLength(1);
      expect(setExchangeFailedRatesMock).toHaveBeenCalledWith("failed to request");

      done();
    });
  });
});
