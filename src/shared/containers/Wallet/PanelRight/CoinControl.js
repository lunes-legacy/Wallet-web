import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";
import ModalSend from "./Modal/Send/index";

let StyledCoinControl = styled.div`
  width: 100%;
  padding: 50px 25px 50px 25px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;
let WrapAmount = styled.div``;

let Amount = styled.div`
  ${TextBase} font-size: 5rem;
  color: white;
`;
let Usd = styled.div`
  ${TextBase} font-size: 2.7rem;
  color: white;
  display: inline-block;
  line-height: 50px;
`;

let Brl = styled.div`
  ${TextBase} font-size: 2.7rem;
  color: white;
  display: inline-block;
  line-height: 50px;
  margin: 0 0 0 20px;
  padding: 0 0 0 20px;
  border-left: 2px solid ${style.normalGreen};
`;

let WrapButtons = styled.div`
  display: flex;
  flex-flow: wrap;
`;
let SendCoin = styled.div`
  ${TextBase} width: 125px;
  // height: 125px;
  padding: 25px 0 25px 0;
  text-align: center;
  margin: 0 0 0 25px;
  background: ${style.normalRed};
  cursor: pointer;
  color: white;
  border-radius: 20px;
`;
let ReceiveCoin = styled.div`
  ${TextBase} width: 125px;
  // height: 125px;
  padding: 25px 0 25px 0;
  margin: 0 0 0 25px;
  text-align: center;
  background: ${style.normalGreen};
  cursor: pointer;
  color: white;
  border-radius: 20px;
`;

let SendCoinImage = styled.img`
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
        <WrapAmount>
          <Amount offSide>0.00000001</Amount>
          <Usd offSide>USD 2.00</Usd>
          <Brl offSide>BRL 6,30</Brl>
        </WrapAmount>

        <WrapButtons>
          <SendCoin>
            <SendCoinImage src="/img/app_wallet/ic_enviar.svg" />
            <br />
            Enviar
          </SendCoin>
          <ReceiveCoin>
            <SendCoinImage src="/img/app_wallet/ic_receber.svg" />
            <br />
            Receber
          </ReceiveCoin>
        </WrapButtons>
      </StyledCoinControl>
    );
  }
}

export default CoinControl;
