import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";
import { Col, Row } from "Components/index"
// import ModalSend from "./ModalSend/index";

const StyledCoinControl = styled.div`
  width: 100%;
  padding: 30px 25px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;
const WrapAmount = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  @media (${style.media.tablet2}) {
    text-align: right;
    margin-bottom: 0;
    margin-right: 2rem;
  }

  @media (min-width: 900px) {
    margin-right: 1rem;
  }
`;

const Amount = styled.div`
  ${TextBase}
  font-size: 2rem;
  color: white;

  @media (${style.media.mobile2}) {
    font-size: 3rem;
  }
`;

const MonetaryValue = styled.div`
  ${TextBase}
  color: white;
  display: inline-block;
  font-size: 1.2rem;
  line-height: 50px;

  @media (${style.media.mobile2}) {
    font-size: 1.5rem;
  }
`;

const Usd = MonetaryValue.extend``;

const Brl = MonetaryValue.extend``;

const Divisor = styled.div`
  border-left: 1px solid ${style.normalGreen};
  display: inline-block;
  margin: 0 20px -10px 20px;
  min-height: 3rem;
`;

const CoinAction = styled.div`
  ${TextBase}
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  margin: 0 1rem 0 1.5rem;
  padding: 5px 0;
  text-align: center;
  width: 70px;

  @media (${style.media.mobile2}) {
    border-radius: 10px;
    font-size: 1.5rem;
    padding: 10px 0;
    width: 90px;
  }

  @media (${style.media.tablet2}) {
    margin: 0 1rem;
  }
`;

const SendCoin = CoinAction.extend`
  float: right;
  background: ${style.normalRed};
`;

const ReceiveCoin = CoinAction.extend`
  background: ${style.normalGreen};
`;

const SendCoinImage = styled.img`
  width: 30px;
  height: 30px;
  margin-top: 5px;
  margin-bottom: 3px;
`;

class CoinControl extends React.Component {
  handleToggleSendModal = () => {};
  render() {
    return (
      <StyledCoinControl>
        <Row>
          <Col s={12} m={6} l={8}>
            <WrapAmount>
              <Amount offSide>0.00000001</Amount>
              <Usd offSide>USD 2.00</Usd>
              <Divisor />
              <Brl offSide>BRL 6,30</Brl>
            </WrapAmount>
          </Col>
          <Col s={6} m={3} l={2}>
            <SendCoin>
              <SendCoinImage src="/img/app_wallet/ic_enviar.svg" />
              <br />
              Enviar
            </SendCoin>
          </Col>
          <Col s={6} m={3} l={2}>
            <ReceiveCoin>
              <SendCoinImage src="/img/app_wallet/ic_receber.svg" />
              <br />
              Receber
            </ReceiveCoin>
          </Col>
        </Row>
      </StyledCoinControl>
    );
  }
}

export default CoinControl;
