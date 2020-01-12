import React, { Suspense, useCallback } from 'react';
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { Button } from "../Button/Button";
import {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates
} from "../ExchangeRate/ducks/actions";
import styles from "./Main.module.scss"

const LazyExchangeRateConnected = React.lazy(() => import("../ExchangeRate/ExchangeRate"));



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
  const requestExchangeRates = useCallback(debounce((date: string = "latest") => {
    setExchangeAttemptRates();

    fetch(`https://api.exchangeratesapi.io/${date}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        setExchangeSuccessRates(data);
      })
      .catch((error) => {
        setExchangeFailedRates(error);
      });
  }, 100, { trailing: false, leading: true }), [
    setExchangeAttemptRates,
    setExchangeFailedRates,
    setExchangeSuccessRates,
  ]);

  return (
    <div className={styles.container}>
      <Button label="Load Data" onClick={() => requestExchangeRates()} />
      <Suspense fallback={null}>
        <LazyExchangeRateConnected />
      </Suspense>
    </div>
  );
});


export const mapDispatchToProps = {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
}

export const MainConnected = connect(null, mapDispatchToProps)(Main);
