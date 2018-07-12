import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// CLASSES
import { WalletClass } from "Classes/Wallet";

// LIBS
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// REDUX
import {connect} from "react-redux";

// COMPONENTS
import { Col, Row } from 'Components/index';
import { TextBase } from "Components/TextBase";

const WrapCoinPercent = styled.div`
  margin-left: 20%;
  display: flex;
  align-items: center;
  background: ${style.normalGreen};
  border-radius: 10px;
  justify-content: center;
  margin-top: 1.5rem;
  width: 4rem;

  @media (${style.media.mobile2}) {
    width: 7rem !important;
  }

  @media (${style.media.tablet2}) {
    width: 9rem !important;
  }
`;

const CoinPercent = styled.div`
  ${TextBase}

  width: 130px;
  height: 52px;
  border-radius: 10px;
  color: white;
  text-align: center;
  padding: 15px 25px 25px 25px;

  @media (${style.media.tablet2}) {
    font-size: 2rem;
  }
`;

// const Chart = styled.div`
//   margin-right: 10%;
//   height: 80;
//   width: 100%;
// `;

const fontStyle = {
  fontSize: "10pt",
  color: style.normalGreen,
  fontWeight: "bold"
}

const styleWrapper = {
  backgroundColor: style.darkLilac
}

const overflow = {
  overflow: 'hidden'
}


class CoinGraph extends React.Component {
  constructor() {
    super();
    this.state = {
      lastNetwork: undefined,
      history_time_price: []
    };
  }

  componentDidMount() {
    this.coinGraphHistory(this.props.wallet.currentNetwork);
  }
  componentDidUpdate() {
    let { lastNetwork }    = this.state;
    let { currentNetwork } = this.props.wallet;
    console.warn('LAST AND CURR', lastNetwork, currentNetwork);
    if (typeof lastNetwork === 'undefined') {
      lastNetwork = '';
    }
    if (lastNetwork.toUpperCase() !== currentNetwork.toUpperCase()) {
      this.coinGraphHistory(currentNetwork);
      this.setState({
        lastNetwork: currentNetwork
      });
    }
  }

  coinGraphHistory = async (currentNetwork) => {
    try {
      //for now, we dont have any lunes history
      if (this.props.wallet.currentNetwork.search(/(lns)|(lunes)/i) !== -1) {
        return;
      }
      this.setState({
        ...this.state,
        currentNetwork: currentNetwork,
      });


      console.warn(`Attempting to get ${currentNetwork} history`);
      // GRAPH
      let graphData = { fromSymbol: currentNetwork.toUpperCase(), toSymbol: "USD", range: "RANGE_1D" };
      let res       = await new WalletClass().getCoinHistory(graphData)
      // PERCENT
      let coinPrices      = this.convertTimestampToDate(res.data)
      let coinPriceLength = coinPrices.length;
      if (!coinPrices[0])
        return;
      let firstValueCoin  = coinPrices[0].close;
      // let firstValueCoin   = 0;
      let currentValueCoin = coinPrices[coinPriceLength - 1].close;

      this.setState( () => {
        return {
          ...this.state,
          history_time_price: coinPrices,
          coin_percent: (currentValueCoin * 100 / firstValueCoin - 100).toFixed(2)
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  convertTimestampToDate = data => {
    data.map(timeStamp => {
      let date = new Date(timeStamp.time * 1000);

      let months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

      timeStamp.time = `${date.getDate()} / ${months[date.getMonth()]} / ${date.getFullYear()}
      ${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${(date.getMinutes() < 10 ? "0" : "") +
        date.getMinutes()}`;
    });

    return data;
  };

  render() {
    let currentNetwork = this.props.wallet.currentNetwork.toUpperCase();

    // if (!this.state.isGraphBeingSettled) {
    //   this.coinGraphHistory(currentNetwork);
    // }

    if (currentNetwork.search(/(lns)|(lunes)/i) !== -1) {
      return null;
    }

    return (
      <Row>
        <Col s={8} m={6} l={7} style={overflow}>
          <ResponsiveContainer width={'90%'} height={90}>
            <LineChart data={this.state.history_time_price}
              margin={{ right: 0, left: 0, }}>
              <CartesianGrid stroke={style.normalLilac} vertical={false} strokeWidth={3}/>
              <XAxis hide dataKey="time" />
              <YAxis hide domain={["dataMin", "dataMax"]} />
              <Tooltip wrapperStyle={styleWrapper} labelStyle={fontStyle} itemStyle={fontStyle} separator={": $"} />
              <Line dataKey="close" dot={false} stroke={style.normalGreen} strokeWidth={3}/>
            </LineChart>
          </ResponsiveContainer>
        </Col>

        <Col s={4} m={4} l={3}>
          <WrapCoinPercent style={this.state.coin_percent < 0 ? { background: style.normalRed } : { background: style.lightgreen }}>
            <CoinPercent>{this.state.coin_percent}%</CoinPercent>
          </WrapCoinPercent>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.component.wallet,
  };
};
const mapDispatchToProps = dispatch => {
  return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinGraph);
