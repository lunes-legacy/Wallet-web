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

import {numeral} from 'Utils/numeral';

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
  font-size: 2.3rem;
  color: white;
  text-align: left;
  font-weight: 300;
  @media (${style.media.laptop}) {
    font-size: 	3.0rem;
  }
`;

const TextValue = styled.div`
  ${TextBase}
  width: 100%;
  font-size: 2.3rem;
  color: white;
  text-align: left;
  font-weight: 100 !important; 
  display: inline; 


  @media (${style.media.laptop}) {
    font-size: 	3.0rem;
  }
`;

const CoinDetails = styled.div`
  margin-top: 3rem;
  padding-left: 1rem;

  @media (${style.media.mobile2}) {
    margin-top: 2rem;
    padding-left: 2rem;
  }

  @media (${style.media.tablet2}) {
    padding-left: 3rem;
  }

  @media (${style.media.laptop}) {
    text-align: center;
  }
`;

const GraphContainer = styled.div`
  padding: 1rem;

  @media (${style.media.mobile2}) {
    padding: 1rem 2rem;
  }

  @media (${style.media.tablet2}) {
    padding: 1rem 3rem;
  }

  @media (${style.media.laptop}) {
    padding: 1rem 20%;
  }
`;

const WrapCoinPercent = styled.div`
  margin-left: 20%;
  display: flex;
  align-items: center;
  background: ${style.normalGreen};
  border-radius: 10px;
  height: 45px; // Mesma altura da div do gráfico
  justify-content: center;
  margin-top: 3rem !important;
  width: 4rem !important;

  @media (${style.media.mobile2}) {
    margin-top: 40px !important;
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
  background-color: #ff1c38;  
  color: white;
  text-align: center;
  padding: 15px 25px 25px 25px;
  

 
  @media (${style.media.tablet2}) {
    font-size: 2rem;
  }
`;

class CoinStatus extends React.Component {
  constructor(props) {
    super(props);

    numeral.locale(this.props.currencies.locale);
    this.state = {
      coin_porcentage_price: []
    };
  }
  componentWillMount() {
    this.calcCoinPorcent();
  }

  calcCoinPorcent = async () => {
    let obj = { fromSymbol: this.props.wallet.currentNetwork.toUpperCase(), toSymbol: "USD", range: "RANGE_1D" };
    let wallet = await new WalletClass().getCoinHistory(obj);
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
    let { currentNetwork } = this.props.wallet;
    let { price } = this.props.cryptocurrencies;
    let { balance } = this.props;
    console.log(price)
    if (!price) {
      return null;
    }

    return (
      <StyledCoinStatus>
        <Row>
          <Col s={12} m={3} l={3}>
            <CoinDetails>
              <CoinDetailsText offSide>{balance[currentNetwork.toUpperCase()].coinName}</CoinDetailsText>
              {/* <CoinDetailsText offSide>{`1 ${currentNetwork.toUpperCase()} R$${'31.000,00'}`}</CoinDetailsText> */}
              <CoinDetailsText >{`1 ${currentNetwork.toUpperCase()} ${numeral(31000.15).format('$0,0.00')}`}</CoinDetailsText>
              
            </CoinDetails>
          </Col>
          <Col s={8} m={6} l={7}>
            <GraphContainer>
              <CoinGraph width='95%' height={80} currentNetwork={currentNetwork.toUpperCase()} />
            </GraphContainer>
          </Col>
          <Col s={4} m={3} l={2}>
            <WrapCoinPercent style={this.state.coin_porcentage_price < 0 ? { background: 'indianred' } : { background: 'lightgreen' }}>
              <CoinPercent>{this.state.coin_porcentage_price}%</CoinPercent>
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
    wallet: state.component.wallet,
    cryptocurrencies: state.cryptocurrencies,
    currencies: state.currencies,
    balance:    state.balance
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CoinStatus);
