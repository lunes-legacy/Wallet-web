import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
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
    let obj = { fromSymbol: this.props.coinName, toSymbol: "USD", range: "RANGE_1M" };
    let wallet = await new WalletClass().getTransactionHistory(obj);
    let walletFormatted = await this.convertTimestampToDate(wallet.data);

    this.setState(() => {
      return {
        history_time_price: walletFormatted
      };
    });
  };

  convertTimestampToDate = async data => {
    data.map(timeStamp => {
      let date = new Date(timeStamp.time * 1000);
      let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

      timeStamp.time = date.getDate() + "/" + months[date.getMonth()] + "/" + date.getFullYear();
    });

    return await data;
  };

  render() {
    const fontStyle = {
      fontSize: "10pt",
      color: "#4cd566",
      fontWeight: "bold"
    };

    const styleWrapper = {
      backgroundColor: "#3B1878"
    };

    return (
      <div>
        <ResponsiveContainer width={350} height={100}>
          <LineChart data={this.state.history_time_price}>
            <XAxis hide dataKey="time" />
            <YAxis hide domain={["dataMin", "dataMax"]} />
            <Tooltip wrapperStyle={styleWrapper} labelStyle={fontStyle} itemStyle={fontStyle} separator={": $"} />
            <Line dataKey="close" dot={false} stroke="#4cd566" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default CoinGraph;
