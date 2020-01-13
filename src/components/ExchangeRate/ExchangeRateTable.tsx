import React from "react";
import { ExchangeRates } from "./ducks/state";
import styles from "./ExchangeRateTable.module.scss";

export interface ExchangeRateTableProps {
  rates: ExchangeRates["rates"]
};

export const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({ rates }) => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate], i) => (
            <tr key={i}>
              <td>{currency}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
