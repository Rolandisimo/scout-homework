import React from "react";
import moment from "moment";
import { ExchangeRates } from "./ducks/state";
import styles from "./ExchangeRateTable.module.scss";

export type ExchangeRateTableProps = ExchangeRates;

export const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({
  base,
  date,
  rates,
}) => {
  return (
    <div className={styles.container}>
      <h2>{moment(date).format("DD/MM/YYYY")}</h2>
      <p>Base Currency: <strong>{base}</strong></p>
      <table>
        <tr>
          <th>Currency</th>
          <th>Rate</th>
        </tr>
        {Object.entries(rates).map(([currency, rate], i) => (
          <tr>
            <td key={currency}>{currency}</td>
            <td key={i}>{rate}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
