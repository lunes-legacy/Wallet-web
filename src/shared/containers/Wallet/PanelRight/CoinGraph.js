import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { WalletClass } from "Classes/Wallet";
class CoinGraph extends React.Component {
  constructor() {
    super();

    this.state = {
      history_time_price: []
    };
  }

  componentWillMount() {
    this.coinHistory();
  }

  coinHistory = async () => {
    let wallet = new WalletClass();
    let obj = { fromSymbol: "BTC", toSymbol: "USD", range: "RANGE_1M" };
    let dataHistory = await wallet.getTransactionHistory(obj);

    this.setState(() => {
      return {
        history_time_price: dataHistory.data
      };
    });
  };

  render() {
    return (
      <div>
        <LineChart width={500} height={175} data={this.state.history_time_price}>
          <XAxis hide dataKey="time" />
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Tooltip />
          <Line dataKey="close" stroke="#4cd566" />
        </LineChart>
      </div>
    );
  }
}

export default CoinGraph;
