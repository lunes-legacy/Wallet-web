import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import CoinGraph from "./CoinGraph";
import { WalletClass } from "Classes/Wallet";
//COMPONENTS
import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";
import { Loading } from "Components/Loading";

const StyledCoinStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${style.normalLilac3};
  padding: 25px 0 25px 0;
`;

const CoinDetailsName = styled.div`
  ${TextBase} width: 100%;
  font-size: 2.5rem;
  color: white;
`;

const CoinDetailsPrice = styled.div`
  ${TextBase} width: 100%;
  font-size: 2.5rem;
  color: white;
`;

const CoinDetails = styled.div`
  width: 33.333%;
  padding: 0 0 0 50px;
`;

const WrapCoinPercent = styled.div`
  width: 33.333%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinPercent = styled.div`
  ${TextBase} font-size: 3rem;
  letter-space: 0.85px;
  color: white;
  width: auto;
  height: 75%;
  border-radius: 10px;
  text-align: center;
  padding: 17px 20px 17px 20px;
`;

class CoinStatus extends React.Component {
  constructor() {
    super();

    this.state = {
      coin_porcentage_price: []
    };
  }
  componentWillMount() {
    this.calcCoinPorcent();
  }

  calcCoinPorcent = async () => {
    let obj = { fromSymbol: this.props.wallet.panelRight.coinName.toUpperCase(), toSymbol: "USD", range: "RANGE_1D" };
    let wallet = await new WalletClass().getTransactionHistory(obj);
    let coinPrices = wallet.data;

    let coinPriceLength = coinPrices.length;
    let lastValueCoin = coinPrices[0].close;
    let currentValueCoin = coinPrices[coinPriceLength - 1].close;

    this.setState(() => {
      return {
        coin_porcentage_price: (currentValueCoin * 100 / lastValueCoin - 100).toFixed(2)
      };
    });
  };
  render() {
    let { coinName, coinPrice } = this.props.wallet.panelRight || { coinName: undefined, coinPrice: undefined };

    if (!coinPrice || !coinName) {
      console.warn("if (coinPrice || coinName); ERRO");
      return null;
    }

    return (
      <StyledCoinStatus>
        <CoinDetails>
          <CoinDetailsName offSide>Bitcoin</CoinDetailsName>
          <CoinDetailsPrice offSide>{`1 ${coinName.toUpperCase()} $${coinPrice.BRL}`}</CoinDetailsPrice>
        </CoinDetails>
        <CoinGraph coinName={this.props.wallet.panelRight.coinName.toUpperCase()} data={[]} />
        <WrapCoinPercent>
          {this.state.coin_porcentage_price > 0 ? (
            <CoinPercent backGroundGreen txNormal>{this.state.coin_porcentage_price}%</CoinPercent>
          ) : (
            <CoinPercent backGroundRed txNormal>{this.state.coin_porcentage_price}%</CoinPercent>
          )}
        </WrapCoinPercent>
      </StyledCoinStatus>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinStatus);
