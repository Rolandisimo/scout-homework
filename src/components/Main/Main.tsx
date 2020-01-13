import React, { useCallback } from 'react';
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { Button } from "../Button/Button";
import {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates
} from "../ExchangeRate/ducks/actions";
import styles from "./Main.module.scss"
import { ExchangeRateConnected } from "../ExchangeRate/ExchangeRate";

export const EXCHANGE_RATE_REQUEST_TIMEOUT = 100;

export interface MainDispatchProps {
  setExchangeAttemptRates: typeof setExchangeAttemptRates;
  setExchangeFailedRates: typeof setExchangeFailedRates;
  setExchangeSuccessRates: typeof setExchangeSuccessRates;
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
  }, EXCHANGE_RATE_REQUEST_TIMEOUT, { trailing: false, leading: true }), [
    setExchangeAttemptRates,
    setExchangeFailedRates,
    setExchangeSuccessRates,
  ]);

  return (
    <div className={styles.container}>
      <Button label="Load Data" onClick={() => requestExchangeRates()} />
      <ExchangeRateConnected />
    </div>
  );
});


export const mapDispatchToProps = {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
}

export const MainConnected = connect(null, mapDispatchToProps)(Main);
