import React, { useCallback } from 'react';
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { Button } from "../Button/Button";
import {
  setExchangeAttemptRates as setExchangeAttemptRatesAction,
  setExchangeFailedRates as setExchangeFailedRatesAction,
  setExchangeSuccessRates as setExchangeSuccessRatesAction
} from "../ExchangeRate/ducks/actions";
import styles from "./Main.module.scss"
import { ExchangeRateConnected } from "../ExchangeRate/ExchangeRate";

export const EXCHANGE_RATE_REQUEST_TIMEOUT = 100;

export interface MainDispatchProps {
  setExchangeAttemptRates: typeof setExchangeAttemptRatesAction;
  setExchangeFailedRates: typeof setExchangeFailedRatesAction;
  setExchangeSuccessRates: typeof setExchangeSuccessRatesAction;
}
export type MainProps = MainDispatchProps;

export const Main: React.FC<MainProps> = React.memo(({
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
}) => {
  const requestExchangeRates = useCallback(debounce(async (date: string = "latest") => {
    setExchangeAttemptRates();
    try {
      const data = await (await fetch(`https://api.exchangeratesapi.io/${date}`)).json();
      if (data.error) {
        throw data.error;
      }

      setExchangeSuccessRates(data);
    } catch (error) {
      setExchangeFailedRates(error)
    }
  }, EXCHANGE_RATE_REQUEST_TIMEOUT, { trailing: false, leading: true }), []);

  const onClickCallback = useCallback(() => requestExchangeRates(), [requestExchangeRates]);

  return (
    <div className={styles.container}>
      <Button label="Load Data" onClick={onClickCallback} />
      <ExchangeRateConnected />
    </div>
  );
});


export const mapDispatchToProps = {
  setExchangeAttemptRates: setExchangeAttemptRatesAction,
  setExchangeFailedRates: setExchangeFailedRatesAction,
  setExchangeSuccessRates: setExchangeSuccessRatesAction,
}

export const MainConnected = connect(null, mapDispatchToProps)(Main);
