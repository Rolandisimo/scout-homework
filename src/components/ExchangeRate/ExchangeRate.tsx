import React from "react";
import { connect } from "react-redux";
import { ExchangeRatesState } from "./ducks/state";
import { selectExchangeRates } from "./ducks/selectors";

import { Modal } from "../Modal/Modal";
import { State } from "../../ducks/state";
import { Loader } from "../Loader/Loader";
import { ExchangeRateTable } from "./ExchangeRateTable";


export interface ExchangeRateStateProps {
  exchangeRates: ExchangeRatesState;
}
export type ExchangeRateProps = ExchangeRateStateProps;

export const ExchangeRate: React.FC<ExchangeRateProps> = ({ exchangeRates }) => {
  const { data, error, isLoading } = exchangeRates;

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return (
      <Modal
        title="Requesting data has failed"
        body={error}
      />
    );
  }

  console.log(exchangeRates)
  if (!data) {
    return null;
  }

  return <ExchangeRateTable {...data} />;
}


export const mapStateToProps = (state: State): ExchangeRateStateProps => ({
  exchangeRates: selectExchangeRates(state),
});

export const ExchangeRateConnected = connect(mapStateToProps)(ExchangeRate);
export default ExchangeRateConnected;
