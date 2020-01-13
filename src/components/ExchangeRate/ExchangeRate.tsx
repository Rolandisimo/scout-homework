import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import { ExchangeRatesState } from "./ducks/state";
import { selectExchangeRates } from "./ducks/selectors";
import { State } from "../../ducks/state";
import { Loader } from "../Loader/Loader";
import { ExchangeRateTable } from "./ExchangeRateTable";
import { Modal } from "../Modal/Modal";

import styles from "./ExchangeRate.module.scss";

export interface ExchangeRateStateProps {
  exchangeRates: ExchangeRatesState;
}
export type ExchangeRateProps = ExchangeRateStateProps;

export const ExchangeRate: React.FC<ExchangeRateProps> = ({ exchangeRates }) => {
  const { data, error, isLoading } = exchangeRates;

  if (isLoading) {
    return <Loader />
  }

  return <>
    <div className={styles.container}>
      {data && <>
        <h2>{moment(data.date).format("DD/MM/YYYY")}</h2>
        <p>Base Currency: <strong>{data.base}</strong></p>
        {isLoading
          ? <Loader />
          : <ExchangeRateTable rates={data.rates} />
        }
      </>}
    </div>

    {error && <Modal title="Requesting data has failed" body={error} />}
  </>;
}


export const mapStateToProps = (state: State): ExchangeRateStateProps => ({
  exchangeRates: selectExchangeRates(state),
});

export const ExchangeRateConnected = connect(mapStateToProps)(ExchangeRate);
export default ExchangeRateConnected;
