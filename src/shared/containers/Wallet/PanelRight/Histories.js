import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import style from "Shared/style-variables";
import { timestampDiff } from "Utils/functions";
import { Col, Row } from 'Components/index';
import { WalletClass } from 'Classes/Wallet';
import sb from 'satoshi-bitcoin';
//REDUX
import { setTxHistory } from 'Redux/actions';

import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";
import { Loading } from 'Components/Loading';

import CookieClass from 'Classes/Cookie';

import {numeral} from 'Utils/numeral';

const StyledHistories = styled.div`
  padding-top: 20px;
  height: 75vh;
  overflow: auto;
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
  width: 100%;
`;

const HistoryHeadStatus = styled.div`
  float: left;
    
  @media (${style.media.desktop2}) {
  margin-left: -3rem;      
  }
`;

const HeadStatusIcon = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  margin: 2px auto;
`;

const TextSend = styled.div`
  margin-left: 20px;
  font-weight: bold;
`

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

  @media (${style.media.desktop2}) {   
    margin-left: -5rem;
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

const HistoryContent = styled.div`
  display: flex;
  background: ${style.normalLilac};
  flex-flow: nowrap;
  top: 100%;
  width: 100%;
  word-wrap: break-word;

  transition: all .3s;

  @media (${style.media.tablet2}) {
    padding: 1rem 2rem;
  }

  @media (${style.media.laptop}) {
    padding: 1rem 32px 20px 45px; //top right bottom left
  }

  &.js-history-content {
    height: 0;
    max-height: 0;
  }
  &.js-history-content-active {
    height: 100%;
    max-height: 300px;
    box-shadow: 0 5px 7px inset rgba(0,0,0,.08);
  }
`;

const HistoryContentItem = styled.div`
  ${TextBase}
  width: 100%;
  padding-bottom: 5px; 

  @media (${style.media.tablet}) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
`;

const TransactionId = styled.div`
  text-decoration: underline;
  font-weight: bold;
  margin-top: 10px;
`;

const StatusStyle = styled.div`
  color: white;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 5px;
  ${props => {
    if (props.type === "SPENT") {
      return `color: ${style.normalRed};`;
    } else if (props.type === "RECEIVED") {
      return `color: ${style.normalGreen};`;
    } else {
      return `background: ${style.normalLilac};`;
    }
  }};

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
  }
`;

class Histories extends React.Component {
  constructor(props) {
    props = {
      ...props,
      txHistory: []
    }
    super(props);
    this.state = {
      activeIndex: null
    }
    this.handleToggleHistory = this.handleToggleHistory.bind(this);
    numeral.locale(this.props.currencies.locale);
  }

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

  // action click history
  handleToggleHistory = item => {
    if(this.state.activeIndex===item){
      this.setState({...this.state, activeIndex: null});
    }else{
      this.setState({...this.state, activeIndex: item });
    }
  };

  componentDidMount = async () => {
    // 'n4VQ5YdHf7hLQ2gWQYYrcxoE5B7nWuDFNF';
    // txHistory = await new WalletClass().getTxHistory({coin: currentNetwork, address: 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH'});
    // txHistory = await new WalletClass().getTxHistory({network: currentNetwork});
    let { currentNetwork, price } = this.props.component_wallet;
    let Cookie = new CookieClass();
    let user = JSON.parse(Cookie.get('user').user);
    console.warn("_USER_", user);
    let address = user.wallet.coins[0].addresses[0].address;
    this.props.setTxHistory({ network: 'BTCTESTNET', address });
  }
  _renderHistories = () => {
    let { currentNetwork, currentTxHistory } = this.props.component_wallet;
    let { price } = this.props.cryptocurrencies;
    console.warn(currentTxHistory.length, "__PRICE__");
    if (currentTxHistory.length < 1) {
      return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
    }
    return currentTxHistory.map((tx, key) => {
      return (
        <History key={key}>
          <HistoryHead onClick={() => this.handleToggleHistory(key)}>
            <Row>
              <Col s={4} m={6} l={1}>
                <HistoryHeadStatus>
                  <HeadStatusIcon type={tx.type} src={this.renderIcon(tx.type)} />
                  <HeadStatusDate>12/Mar</HeadStatusDate>
                </HistoryHeadStatus>
              </Col>
              <Col s={6} m={4} l={5}>
                <HistoryHeadText>
                  <StatusStyle type={tx.type}>{this.icoStatusToText(tx.type)}</StatusStyle>
                  {/*this.timeToText(tx.time)*/}
                  90 dias atrás
                </HistoryHeadText>
              </Col>
              <Col s={12} m={6} l={5}>
                <HistoryHeadAmount>
                  <HeadAmountCoin type={tx.type}>
                    {this.SignalControl(tx.type)}
                    {tx.value}
                  </HeadAmountCoin>
                  <HeadAmountMoney>
                    {/* {monetaryValue(price.USD * parseFloat(tx.value), { style: 'currency', currency: 'USD' })} */}
                    ${numeral(price.BTC.USD * tx.value).format('0,0.00')}
                  </HeadAmountMoney>
                </HistoryHeadAmount>
              </Col>
            </Row>
          </HistoryHead>

          <HistoryContent className={this.state.activeIndex === key ? 'js-history-content-active' : 'js-history-content'}>
            <Row>
              <Col s={12} m={6} l={6}>
                <HistoryContentItem clWhite >
                  <Text size={"1.4rem"}> </Text>
                  <Text size={"1.4rem"} txBold>
                  {/* <span> Enviado: </span> {`${tx.value + " BTC"} ${currentNetwork.toUpperCase()}`} ($ {monetaryValue(price.USD * parseFloat(tx.value), { style: 'decimal' })}) */}
                  <span> Enviado: </span> {`${tx.value + " BTC"} ${currentNetwork.toUpperCase()}`} (${numeral(price.BTC.USD * tx.value).format('0,0.00')})
                  </Text>
                  <Text size={"1.4rem"} txBold margin={"1rem 0 0 0"} >
                    <span>Data:  </span> {"Segunda-Feira, Abril, 04, 2018 - 10:32 AM"}
                    {/* Quarta-feira 23/05/2018 */}
                  </Text>
                </HistoryContentItem>
              </Col>
              <Col m={6} l={6}>
                <HistoryContentItem clWhite>
                  <Text size={"1.4rem"}>Transaction ID</Text>
                  <Text size={"1.4rem"} txBold>
                    <TransactionId > {tx.txid} </TransactionId>
                  </Text>
                </HistoryContentItem>
              </Col>             
            </Row>
          </HistoryContent>
        </History>
      ); //return
    })
  }
  _shouldRender = () => {
    let { currentNetwork, currentTxHistory } = this.props.component_wallet;
    if (!currentTxHistory || currentTxHistory.length < 1)
      return false;
    // if (!price || !currentNetwork)
    //   return false;

    return true;
  }

  render() {
    // if (!this._shouldRender()) return null;
    try {
      return (
        <StyledHistories>

          {this._renderHistories()}

        </StyledHistories>
      );
    } catch (e) {
      console.error(e);
      return <h1>Aconteceu um erro</h1>
    }
  }
}

const monetaryValue = (value, options) => {
  return parseFloat(value.toFixed(2)).toLocaleString('pt-BR', options);
};

const mapStateToProps = state => {
  return {
    component_wallet: state.component.wallet,
    cryptocurrencies: state.cryptocurrencies, 
    currencies: state.currencies
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTxHistory: (data) => {
      dispatch(setTxHistory(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
