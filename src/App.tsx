import React, { Suspense, useCallback } from 'react';
import { connect } from "react-redux";
import { Button } from "./components/Button/Button";
import styles from './App.module.scss';
import {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates
} from "./components/ExchangeRate/ducks/actions";

const LazyExchangeRateConnected = React.lazy(() => import("./components/ExchangeRate/ExchangeRate"));

export interface AppDispatchProps {
  setExchangeAttemptRates: typeof setExchangeAttemptRates;
  setExchangeFailedRates: typeof setExchangeFailedRates;
  setExchangeSuccessRates: typeof setExchangeSuccessRates;
}
export type AppProps = AppDispatchProps;

export const App: React.FC<AppProps> = ({
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
}) => {
  const requestExchangeRates = useCallback(() => {
    setExchangeAttemptRates();

    fetch("https://api.exchangeratesapi.io/latest")
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
  }, [
    setExchangeAttemptRates,
    setExchangeFailedRates,
    setExchangeSuccessRates,
  ]);

  return (
    <div className={styles.container}>
      <Button label="Load Data" onClick={requestExchangeRates} />
      <Suspense fallback={null}>
        <LazyExchangeRateConnected />
      </Suspense>
    </div>
  );
}


export const mapDispatchToProps = {
  setExchangeAttemptRates,
  setExchangeFailedRates,
  setExchangeSuccessRates,
}

export const AppConnected = connect(null, mapDispatchToProps)(App);

