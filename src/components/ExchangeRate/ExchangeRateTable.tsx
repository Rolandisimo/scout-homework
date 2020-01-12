import React from "react";
import { ExchangeRates } from "./ducks/state";

export type ExchangeRateTableProps = {
  rates: ExchangeRates["rates"];
};

export const ExchangeRateTable: React.FC<ExchangeRateTableProps> = ({ rates }) => {
  return (
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
  );
}
