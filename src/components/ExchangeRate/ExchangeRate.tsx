import React, { useCallback, useState } from "react";
import { connect } from "react-redux";
import { ExchangeRatesState } from "./ducks/state";
import { selectExchangeRates } from "./ducks/selectors";
import { State } from "../../ducks/state";
import { Loader } from "../Loader/Loader";
import { ExchangeRateTable } from "./ExchangeRateTable";
import { Modal } from "../Modal/Modal";
import { Button, ButtonSize } from "../Button/Button";

import styles from "./ExchangeRate.module.scss";
import moment from "moment";

export interface ExchangeRateStateProps {
  exchangeRates: ExchangeRatesState;
}
export interface ExchangeRateOwnProps {
  requestExchangeRates: (date?: string) => void;
}
export type ExchangeRateProps = ExchangeRateStateProps & ExchangeRateOwnProps;

export const ExchangeRate: React.FC<ExchangeRateProps> = ({ exchangeRates, requestExchangeRates }) => {
  const { data, error, isLoading } = exchangeRates;
  const [daysBackward, setDaysBackward] = useState(1);
  const [daysForward, setDaysForward] = useState(1);

  const requestNumberOfDaysBack = useCallback(() => (
    requestExchangeRates(moment(data?.date).subtract(daysBackward, "days").format("YYYY-MM-DD"))
  ), [data, requestExchangeRates, daysBackward]);
  const requestNumberOfDaysForward = useCallback(() => (
    requestExchangeRates(moment(data?.date).add(daysForward, "days").format("YYYY-MM-DD"))
  ), [data, requestExchangeRates, daysForward]);

  if (!data) {
    return null;
  }

  const successfulBody = !error && isLoading
    ? <Loader />
    : <ExchangeRateTable rates={data.rates} />;

  const body = error
    ? <Modal title="Requesting data has failed" body={error} />
    : successfulBody

  return (
    <div className={styles.container}>
      <div className={styles.dateContainer}>
        <Button label="<" onClick={requestNumberOfDaysBack} type={ButtonSize.Small} />
        <h2>{moment(data.date).format("DD/MM/YYYY")}</h2>
        <Button label=">" onClick={requestNumberOfDaysForward} type={ButtonSize.Small} />
      </div>
      <p>Base Currency: <strong>{data.base}</strong></p>
      <div className={styles.tableContainer}>
        {body}
      </div>
    </div>
  );
}


export const mapStateToProps = (state: State): ExchangeRateStateProps => ({
  exchangeRates: selectExchangeRates(state),
});

export const ExchangeRateConnected = connect(mapStateToProps)(ExchangeRate);
export default ExchangeRateConnected;
