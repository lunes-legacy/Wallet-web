import React from "react";
import styled, { consolidateStreamedStyles } from "styled-components";
import style from "Shared/style-variables";

// UTILS
import { decrypt } from "Utils/crypt";
import { timestampDiff } from "Utils/functions";


//REDUX
import { connect } from "react-redux";
import { setTxHistory, setWalletInfo } from 'Redux/actions';

// Components
import { Col, Row } from 'Components/index';
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

const TextT = styled.div `
  letter-spacing: 0.2rem;
  font-weight: bold;
  display: inline;  
`;

const HistoryHead = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  padding: 1rem 0;
`;

const HistoryHeadStatus = styled.div`
  float: left;
  margin: 0 5rem 0 5rem;
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

  @media (${style.media.tablet2}) {
    font-size: 1.4rem;
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
    padding-left: 5rem;
    padding-right: 5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

const TransactionId = styled.div`
  text-decoration: underline;
  font-weight: bold;
  margin-top: 10px;
`;
 
const Span = styled.div `
  margin-top: 16%;
  display: inline;
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

const ErrorMessage = styled.div `
  ${TextBase};
  color: #FFFFFF;
  text-align: center;
`;

class Histories extends React.Component {
  constructor(props) {
    super();

    this.state = {
      activeIndex: null
    }
    this.handleToggleHistory = this.handleToggleHistory.bind(this);
  }

  componentDidMount() {
    let { currentNetwork } = this.props.componentWallet;
    numeral.locale(this.props.currencies.locale);
    this.getWalletInfo();
    this.props.setTxHistory({ network: currentNetwork.toUpperCase(), address: this.props.walletInfo.addresses[currentNetwork.toUpperCase()] });
  }

  timeToText = (timestamp) => {
    timestamp = timestamp.toString();

    if (timestamp.length <= 10) {
      timestamp = timestamp + "000";
    }
    
    timestamp = parseInt(timestamp);

    const hoursDiff = timestampDiff({ first: timestamp });

    if (hoursDiff < 48) {
      return `${hoursDiff} horas atrás`;
    } else { 
      return Math.round(hoursDiff / 24) + " dias atrás";
    }
  };

  icoStatusToText = type => {
    if (type === "RECEIVED") return "Received";

    return "Send";
  };

  SignalControl = type => {
    return type == "RECEIVED" ? "+" : "-";
  };

  parseTimestampToDate = timestamp => {
    if (!timestamp) return null;

    timestamp = timestamp.toString();

    if (timestamp.length <= 10) {
      timestamp = timestamp + "000";
    }
    
    timestamp = parseInt(timestamp);

    let date = new Date(timestamp);
    let weekDay = date.getDay();

    switch (weekDay) {
      case 0:
        weekDay = "Domingo";
        break;
      case 1:
        weekDay = "Segunda-feira";
        break;
      case 2:
        weekDay = "Terça-feira";
        break;
      case 3:
        weekDay = "Quarta-feira";
        break;
      case 4:
        weekDay = "Quinta-feira";
        break;
      case 5:
        weekDay = "Sexta-feira";
        break;
      case 6:
        weekDay = "Sabado";
        break;
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getYear();

    return weekDay + " " + day + "/" + month + "/" + year;
  };

  parseTimestampToDate2 = timestamp => {
    timestamp = 835758000;
    if (!timestamp) return null;

    timestamp = timestamp.toString();

    if (timestamp.length <= 10) {
      timestamp = timestamp + "000";
    }

    timestamp = parseInt(timestamp);

    let date = new Date(timestamp);
    let yearMonth = date.getMonth();
    switch (yearMonth) {
      case 0:
        yearMonth = "Jan";
        break;
      case 1:
        yearMonth = "Fev";
        break;
      case 2:
        yearMonth = "Mar";
        break;
      case 3:
        yearMonth = "Abr";
        break;
      case 4:
        yearMonth = "Mai";
        break;
      case 5:
        yearMonth = "Jun";
        break;
      case 6:
        yearMonth = "Jul";
        break;
      case 7:
        yearMonth = "Ago";
        break;
      case 8:
        yearMonth = "Set";
        break;
      case 9:
        yearMonth = "Out";
        break;
      case 10:
        yearMonth = "Nov";
        break;
      case 11:
        yearMonth = "Dez";
        break;
    }
    let day = date.getDate();
    return day + "/" + yearMonth;
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

  getWalletInfo() {
		let walletInfo = JSON.parse(decrypt(localStorage.getItem('WALLET-INFO')));
		if (walletInfo) {
			this.props.setWalletInfo(walletInfo.addresses);
		}
	}

  _renderHistories = () => {
    let { currentNetwork, currentTxHistory } = this.props.componentWallet;
    let { crypto } = this.props.currencies;
    let currentCurrencies = crypto[currentNetwork.toUpperCase()].USD
    
    if (currentTxHistory.length < 1) {
      return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
    } else if (currentTxHistory.data.history.length < 1) {
      return <ErrorMessage> No transactions </ErrorMessage>;
    }

    return currentTxHistory.data.history.map((transaction, key) => {
      let amount = numeral(transaction.nativeAmount / 100000000).format('0,0.00000000');
      let usdAmount = numeral( ( transaction.nativeAmount / 100000000 ) * currentCurrencies).format('$0,0.00')

      return (
        <History key={key}>
          <HistoryHead onClick={() => this.handleToggleHistory(key)}>
            <Row>
              <Col s={6} m={6} l={6}>
                <HistoryHeadStatus>
                  <HeadStatusIcon type={transaction.type} src={this.renderIcon(transaction.type)} />
                  <HeadStatusDate>{ this.parseTimestampToDate2(transaction.date) }</HeadStatusDate>
                </HistoryHeadStatus>
                <HistoryHeadText>
                  <StatusStyle type={transaction.type}>
                    { this.icoStatusToText(transaction.type) }
                  </StatusStyle>
                  { this.timeToText(transaction.date) }
                </HistoryHeadText>
              </Col>
              
              <Col s={6} m={6} l={6}>
                <HistoryHeadAmount>
                  <HeadAmountCoin type={transaction.type}>
                    {this.SignalControl(transaction.type)} 
                    { amount }
                  </HeadAmountCoin>
                  <HeadAmountMoney>
                    ({ usdAmount })
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
                  <Text size={"1.4rem"} txBold margin={"2.5rem 0 0 0"}>
                    <Span>
                      { this.icoStatusToText(transaction.type) }: 
                    </Span>
                    <TextT>
                      { amount } 
                      { currentNetwork.toUpperCase() } 
                      ({ usdAmount }) 
                    </TextT>
                  </Text>
                  <Text size={"1.4rem"} txBold margin={"1.5rem 0 0 0"}>
                    <span>Date: </span>
                    <TextT>
                      { this.parseTimestampToDate(transaction.date) } 
                    </TextT>
                  </Text>
                </HistoryContentItem>
              </Col>
              <Col m={6} l={6}>
                <HistoryContentItem clWhite>
                  <Text size={"1.4rem"} margin={"2.5rem 0 0 0"}>Transaction ID:</Text>
                  <Text size={"1.4rem"} txBold>
                    <TransactionId > { transaction.txid } </TransactionId>
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
      return <ErrorMessage> Error: { e } </ErrorMessage>;
    }
  }
}

const monetaryValue = (value, options) => {
  return parseFloat(value.toFixed(2)).toLocaleString('pt-BR', options);
};

const mapStateToProps = state => {
  return {
    walletInfo: state.walletInfo,
    currencies: state.currencies,
    componentWallet: state.component.wallet,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setTxHistory: (data) => {
      dispatch(setTxHistory(data));
    },
    setWalletInfo: (data) => {
      dispatch(setWalletInfo(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
