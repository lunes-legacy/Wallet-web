import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import { timestampDiff } from "Utils/functions";

import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";

let StyledHistories = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0 0 0;
  overflow-x: auto;
  display: none;
`;
let History = styled.div`
  width: 100%;
  border-bottom: 1px solid #432678;
  position: relative;
`;
let HistoryHead = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 0 10px 0;
  cursor: pointer;
  &:hover + .js-history-content {
    transform: scaleY(1);
  }
`;
let HistoryHeadStatus = styled.div`
  padding: 0 50px 0 50px;
`;
let HeadStatusIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  margin: 0 auto;
`;
let HeadStatusDate = styled.div`
  ${TextBase} color: white;
  text-align: center;
  font-size: 1.5rem;
`;
let HistoryHeadText = styled.div`
  ${TextBase} color: white;
  display: flex;
  align-items: center;
`;
let HistoryHeadAmount = styled.div`
  ${TextBase} color: white;
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-flow: nowrap;
  padding: 0 20px 0 0;
`;
let HeadAmountCoin = styled.div`
  ${TextBase} color: white;
  padding: 0 20px 0 0;
  font-weight: bold;
  font-size: 1.8rem;
  ${props => {
    if (props.type === "SPENT") {
      return `color: #ff1c38;`;
    } else if (props.type === "RECEIVED") {
      return `color: #4cd566;`;
    } else {
      return `background: ${style.normalLilac};`;
    }
  }};
`;
let HeadAmountMoney = styled.div`
  ${TextBase} color: white;
`;
let HistoryContent = styled.div.attrs({
  className: "js-history-content"
})`
  position: absolute;
  top: 100%;
  left: 0px;
  width: 100%;
  display: flex;
  flex-flow: nowrap;
  padding: 0 20px 0 20px;
  background: ${style.lightLilac};
  z-index: 2;
  overflow-x: auto;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  transform-origin: top;
  transform: scaleY(0);

  transition: transform 0.2s;

  &:hover {
    transform: scaleY(1);
  }
`;
let HistoryContentCol = styled.div`
  width: auto;
  max-width: 50%;
  min-width: 320px;
  padding: 0 10px 0 10px;
`;
let HistoryContentItem = styled.div`
  ${TextBase} width: 100%;
  padding: 0 0 5px 0;
`;

let StatusStyle = styled.div`
  color: white;
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-right: 5px;
  ${props => {
    if (props.type === "SPENT") {
      return `color: #ff1c38;`;
    } else if (props.type === "RECEIVED") {
      return `color: #4cd566;`;
    } else {
      return `background: ${style.normalLilac};`;
    }
  }};
`;

class Histories extends React.Component {
  timeToText = (txTime, type) => {
    let hoursDiff = timestampDiff({ first: txTime });
    if (hoursDiff < 48) {
      return `${hoursDiff} horas atrás`;
    } else {
      return `${Math.round(hoursDiff / 24)} dias atrás`;
    }
  };
  icoStatusToText = type => {
    if (type === "RECEIVED") return "Recebido ";

    return "Enviado ";
  };

  SignalControl = type => {
    return type == "RECEIVED" ? "+" : "-";
  };

  parseTimestampToDate = timestamp => {
    if (!timestamp) return null;
    let date = new Date(timestamp);
    let weekDay = date.getDay();
    switch (weekDay) {
      case 0:
        weekDay = "segunda-feira";
        break;
      case 1:
        weekDay = "terça-feira";
        break;
      case 2:
        weekDay = "quarta-feira";
        break;
      case 3:
        weekDay = "quinta-feira";
        break;
      case 4:
        weekDay = "sexta-feira";
        break;
      case 5:
        weekDay = "sabado-feira";
        break;
      case 6:
        weekDay = "domingo-feira";
        break;
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getYear();
    return `${weekDay} ${day}/${month}/${year}`;
  };

  renderIcon = type => {
    if (type === "SPENT") return `/img/app_wallet/ic_enviado_.svg`;
    if (type === "RECEIVED") return `/img/app_wallet/ic_receber_.svg`;

    return;
  };

  render() {
    let { coinHistory, coinPrice, coinName } = this.props.wallet.panelRight;
    if (!coinPrice || !coinHistory) {
      return null;
    }
    return (
      <StyledHistories>
        {coinHistory.map((tx, key) => {
          return (
            <History key={key}>
              <HistoryHead onClick={this.handleToggleHistory}>
                <HistoryHeadStatus>
                  <HeadStatusIcon type={tx.type} src={this.renderIcon(tx.type)} />
                  <HeadStatusDate>25/05/2018</HeadStatusDate>
                </HistoryHeadStatus>
                <HistoryHeadText>
                  <StatusStyle type={tx.type}>{this.icoStatusToText(tx.type)}</StatusStyle>
                  {this.timeToText(tx.time)}
                </HistoryHeadText>
                <HistoryHeadAmount>
                  <HeadAmountCoin type={tx.type}>
                    {this.SignalControl(tx.type)}
                    {tx.value}
                  </HeadAmountCoin>
                  <HeadAmountMoney>R$: {coinPrice.BRL * parseFloat(tx.value)}</HeadAmountMoney>
                </HistoryHeadAmount>
              </HistoryHead>
              <HistoryContent>
                <HistoryContentCol>
                  <HistoryContentItem clWhite>
                    <Text size={"1.4rem"}>Enviado: </Text>
                    <Text size={"1.4rem"} txBold>
                      {`${tx.value} ${coinName}`} ($ {coinPrice.USD * parseFloat(tx.value)})
                    </Text>
                  </HistoryContentItem>
                  <HistoryContentItem clWhite>
                    <Text size={"1.4rem"}>Data: </Text>
                    <Text size={"1.4rem"} txBold>
                      {this.parseTimestampToDate(tx.time)}
                    </Text>
                  </HistoryContentItem>
                </HistoryContentCol>
                <HistoryContentCol>
                  <HistoryContentItem clWhite>
                    <Text size={"1.4rem"}>Transaction ID:</Text>
                    <Text size={"1.4rem"} txBold>
                      {tx.txid}
                    </Text>
                  </HistoryContentItem>
                </HistoryContentCol>
              </HistoryContent>
            </History>
          ); //return
        })}
      </StyledHistories>
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
export default connect(mapStateToProps, mapDispatchToProps)(Histories);
