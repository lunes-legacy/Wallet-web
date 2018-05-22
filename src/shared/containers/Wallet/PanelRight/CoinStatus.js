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
  padding: 1.5rem 1rem;
`;

const CoinDetailsText = styled.div`
  ${TextBase}
  width: 100%;
  font-size: 1.5rem;
  color: white;

  @media (${style.media.laptop}) {
    font-size: 2rem;
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
  font-size: 1.5rem;
  letter-space: 0.85px;
  color: white;
  text-align: center;
  padding: 10px 25px;

  @media (${style.media.tablet2}) {
    font-size: 2rem;
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
              <CoinDetailsText offSide>{`1 ${coinName.toUpperCase()} R$${coinPrice.BRL}`}</CoinDetailsText>
            </CoinDetails>
          </Col>
          <Col s={8} m={6} l={6}>
            <GraphContainer>
              <CoinGraph width='95%' height={75} coinName={this.props.wallet.panelRight.coinName.toUpperCase()} />
            </GraphContainer>
          </Col>
          <Col s={4} m={3} l={3}>
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
