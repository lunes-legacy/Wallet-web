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
import { Col, Row } from 'Components/index';

const StyledCoinStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${style.normalLilac3};
  padding: 1.5rem 1rem;
`;

const CoinDetailsText = styled.div`
  ${TextBase}
  width: 100%;
  font-size: 1.5rem;
  color: white;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const CoinDetails = styled.div`
  margin-top: 3rem;
  padding-left: 1rem;

  @media (min-width: 470px) {
    margin-top: 2rem;
    padding-left: 2rem;
  }

  @media (min-width: 790px) {
    padding-left: 3rem;
  }
`;

const GraphContainer = styled.div`
  padding: 1rem;

  @media (min-width: 470px) {
    padding: 1rem 2rem;
  }

  @media (min-width: 790px) {
    padding: 1rem 3rem;
  }
`;

const WrapCoinPercent = styled.div`
  display: flex;
  align-items: center;
  background: ${style.normalGreen};
  border-radius: 10px;
  height: 45px; // Mesma altura da div do gráfico
  justify-content: center;
  margin-top: 3rem !important;
  width: 4rem !important;

  @media (min-width: 470px) {
    margin-top: 40px !important;
    width: 7rem !important;
  }

  @media (min-width: 790px) {
    width: 9rem !important;
  }
`;

const CoinPercent = styled.div`
  ${TextBase}
  font-size: 1.5rem;
  letter-space: 0.85px;
  color: white;
  text-align: center;
  padding: 10px 25px;

  @media (min-width: 790px) {
    font-size: 2rem;
  }
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
    //!coinPrice || 
    if (!coinName) {
      console.warn("if (coinPrice || coinName); ERRO");
      return null;
    }

    return (
      <StyledCoinStatus>
        <Row>
          <Col s={12} m={3} l={3}>
            <CoinDetails>
              <CoinDetailsText offSide>BitCoin</CoinDetailsText>
              <CoinDetailsText offSide>{`1 ${coinName.toUpperCase()} R$${'31.000,00'}`}</CoinDetailsText>
            </CoinDetails>
          </Col>
          <Col s={8} m={6} l={6}>
            <GraphContainer>
              <CoinGraph width='95%' height={75} coinName={this.props.wallet.panelRight.coinName.toUpperCase()} />
            </GraphContainer>
          </Col>
          <Col s={4} m={3} l={3}>
           {(() => { console.log(this.state.coin_porcentage_price, "TESTOOOOOOOO"); })()}
            <WrapCoinPercent style={this.state.coin_porcentage_price < 0 ? {background: 'indianred'} : {background: 'lightgreen'} }>
              <CoinPercent>{ this.state.coin_porcentage_price }%</CoinPercent>
              {/*{this.state.coin_porcentage_price > 0 ? (
                <CoinPercent backGroundGreen txNormal>{this.state.coin_porcentage_price}%</CoinPercent>
              ) : (
                <CoinPercent backGroundRed txNormal>{this.state.coin_porcentage_price}%</CoinPercent>
              )}*/}
            </WrapCoinPercent>
          </Col>
        </Row>
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
