import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import CoinGraph from "./CoinGraph";
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
  padding: 1.5rem;
`;

const CoinDetailsText = styled.div`
  ${TextBase}
  width: 100%;
  font-size: 1.5rem;
  color: white;

  @media (min-width: 790px) {
    font-size: 2rem;
  }
`;

const CoinDetails = styled.div`
  padding-left: 1rem;

  @media (min-width: 480px) {
    padding-left: 2rem;
  }

  @media (min-width: 790px) {
    padding-left: 3rem;
  }
`;

const GraphContainer = styled.div`
  padding: 1rem;

  @media (min-width: 480px) {
    padding: 1rem 2rem;
  }

  @media (min-width: 790px) {
    padding: 1rem 3rem;
  }
`;

const WrapCoinPercent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem !important;
  width: 5rem !important;
  background: ${style.normalGreen};
  border-radius: 10px;

  @media (min-width: 480px) {
    margin: 1rem 0 1rem 2rem !important;
    width: 7rem !important;
  }

  @media (min-width: 790px) {
    margin: 0rem 3rem !important;
    width: 9rem !important;
  }
`;

const CoinPercent = styled.div`
  ${TextBase}
  font-size: 2rem;
  letter-space: 0.85px;
  color: white;
  height: 75%;
  text-align: center;
  padding: 10px 25px;

  @media (min-width: 790px) {
    font-size: 3rem;
  }
`;

class CoinStatus extends React.Component {
  render() {
    let { coinName, coinPrice } = this.props.wallet.panelRight || { coinName: undefined, coinPrice: undefined };

    if (!coinPrice || !coinName) {
      console.warn("if (coinPrice || coinName); ERRO");
      return null;
    }

    return (
      <StyledCoinStatus>
        <Row>
          <Col s={12} m={3} l={3}>
            <CoinDetails>
              <CoinDetailsText offSide>BitCoin</CoinDetailsText>
              <CoinDetailsText offSide>{`1 ${coinName.toUpperCase()} $${coinPrice.BRL}`}</CoinDetailsText>
            </CoinDetails>
          </Col>
          <Col s={7} m={6} l={6}>
            <GraphContainer>
              <CoinGraph width='95%' height={75} coinName={this.props.wallet.panelRight.coinName.toUpperCase()} />
            </GraphContainer>
          </Col>
          <Col s={5} m={3} l={3}>
            <WrapCoinPercent>
              <CoinPercent>35%</CoinPercent>
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
