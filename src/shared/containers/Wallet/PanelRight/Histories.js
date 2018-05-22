import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import { timestampDiff } from "Utils/functions";
import { Col, Row } from 'Components/index';

import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";

const StyledHistories = styled.div`
  padding-top: 20px;
`;

const History = styled.div`
  width: 100%;
  border-bottom: 1px solid #432678;
  position: relative;
`;

const HistoryHead = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px 0;
  &:hover + .js-history-content {
    height: 100%;
    transform: scaleY(1);
  }
  width: 100%;
`;

const HistoryHeadStatus = styled.div`
  float: right;
  margin-right: 1rem;

  @media (${style.media.tablet2}) {
    float: center;
  }
`;

const HeadStatusIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  margin: 2px auto;
`;

const HeadStatusDate = styled.div`
  ${TextBase}
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

const HistoryHeadText = styled.div`
  ${TextBase}
  display: flex;
  align-items: center;
  color: white;
  font-size: 1.2rem;
  margin: 1.5rem 0 0 1rem;

  @media (${style.media.mobile2}) {
    margin: 2.4rem 0 0 1rem;
  }

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
    margin: 1rem 0 0 1rem;
  }
`;

const HistoryHeadAmount = styled.div`
  ${TextBase}
  display: flex;
  color: white;
  flex-flow: nowrap;
  margin: 1rem;
  justify-content: center;

  @media (${style.media.tablet2}) {
    justify-content: flex-end;
  }
`;

const HeadAmountCoin = styled.div`
  ${TextBase}
  color: white;
  padding-right: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  ${props => {
    if (props.type === "SPENT") {
      return `color: #ff1c38;`;
    } else if (props.type === "RECEIVED") {
      return `color: #4cd566;`;
    } else {
      return `background: ${style.normalLilac};`;
    }
  }};

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

const HeadAmountMoney = styled.div`
  ${TextBase}
  font-size: 1.2rem;
  color: white;
  padding-left: 1rem;

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
    margin-right: 1rem;
  }
`;

const HistoryContent = styled.div.attrs({
  className: "js-history-content"
})`
  display: flex;
  background: ${style.lightLilac};
  flex-flow: nowrap;
  height: 0;
  left: 0px;
  padding: 1rem 30% 1rem 3rem;
  top: 100%;
  width: 100%;
  word-wrap: break-word;

  transform-origin: top;
  transform: scaleY(0);

  transition: .2s linear;

  @media (${style.media.tablet2}) {
    padding: 1rem 2rem;
  }
`;

const HistoryContentItem = styled.div`
  ${TextBase}
  width: 100%;
  padding-bottom: 5px;
`;

const StatusStyle = styled.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
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

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

class Histories extends React.Component {
  timeToText = (txTime, type) => {
    const hoursDiff = timestampDiff({ first: txTime });
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
        weekDay = "Segunda-feira";
        break;
      case 1:
        weekDay = "Terça-feira";
        break;
      case 2:
        weekDay = "Quarta-feira";
        break;
      case 3:
        weekDay = "Quinta-feira";
        break;
      case 4:
        weekDay = "Sexta-feira";
        break;
      case 5:
        weekDay = "Sabado";
        break;
      case 6:
        weekDay = "Domingo";
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
                <Row>
                  <Col s={6} m={2} l={2}>
                    <HistoryHeadStatus>
                      <HeadStatusIcon type={tx.type} src={this.renderIcon(tx.type)} />
                      <HeadStatusDate>25/05/2018</HeadStatusDate>
                    </HistoryHeadStatus>
                  </Col>
                  <Col s={6} m={4} l={5}>
                    <HistoryHeadText>
                      <StatusStyle type={tx.type}>{this.icoStatusToText(tx.type)}</StatusStyle>
                      {this.timeToText(tx.time)}
                    </HistoryHeadText>
                  </Col>
                  <Col s={12} m={6} l={5}>
                    <HistoryHeadAmount>
                      <HeadAmountCoin type={tx.type}>
                        {this.SignalControl(tx.type)}
                        {tx.value}
                      </HeadAmountCoin>
                      <HeadAmountMoney>
                        {monetaryValue(coinPrice.BRL * parseFloat(tx.value), {style: 'currency',  currency: 'BRL'})}
                      </HeadAmountMoney>
                    </HistoryHeadAmount>
                  </Col>
                </Row>
              </HistoryHead>
              <HistoryContent>
                <Row>
                  <Col m={6} l={6}>
                    <HistoryContentItem clWhite>
                      <Text size={"1.4rem"}>Enviado: </Text>
                      <Text size={"1.4rem"} txBold>
                        {`${tx.value} ${coinName.toUpperCase()}`} ($ {monetaryValue(coinPrice.USD * parseFloat(tx.value), {style: 'decimal'})})
                      </Text>
                    </HistoryContentItem>
                  </Col>
                  <Col  m={6} l={6}>
                    <HistoryContentItem clWhite>
                      <Text size={"1.4rem"}>Transaction ID:</Text>
                      <Text size={"1.4rem"} txBold>
                        {tx.txid}
                      </Text>
                    </HistoryContentItem>
                  </Col>
                  <Col>
                    <HistoryContentItem clWhite>
                      <Text size={"1.4rem"}>Data: </Text>
                      <Text size={"1.4rem"} txBold>
                        {this.parseTimestampToDate(tx.time)}
                      </Text>
                    </HistoryContentItem>
                  </Col>
                </Row>
              </HistoryContent>
            </History>
          ); //return
        })}
      </StyledHistories>
    );
  }
}

const monetaryValue = (value, options) => {
  return parseFloat(value.toFixed(2)).toLocaleString('pt-BR', options);
};

const mapStateToProps = state => {
  return {
    wallet: state.wallet
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
