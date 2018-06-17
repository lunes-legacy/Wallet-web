import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";
import { TESTNET } from 'Config/constants';
import { timestampDiff } from "Utils/functions";
import { connect } from "react-redux";
import { setTxHistory } from 'Redux/actions';
import { Col, Row } from 'Components/index';
import { TextBase } from "Components/TextBase";
import { Text } from "Components/Text";
import { Loading } from 'Components/Loading';
import { numeral } from 'Utils/numeral';

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

const TextT = styled.div`
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

const TransactionId = styled.a`
  color: #fff;
  font-weight: bold;
  margin-top: 10px;
  text-decoration: none;

  &:visited  {
    color: #fff;
  }

  &:hover {
    color: #eee;
  }
`;

const Span = styled.div`
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

const ErrorMessage = styled.div`
  ${TextBase};
  color: #FFFFFF;
  text-align: center;
`;

class Histories extends React.Component {
  constructor() {
    super();

    this.state = {
      network: '',
      activeIndex: null
    }

    this.handleToggleHistory = this.handleToggleHistory.bind(this);
  }

  componentDidMount() {
    numeral.locale(this.props.currencies.locale);
  }

  setHistory(currentNetwork) {
    return this.props.setTxHistory({ network: currentNetwork.toUpperCase(), address: this.props.walletInfo.addresses[currentNetwork.toUpperCase()] });
  }

  timeToText = (timestamp) => {
    timestamp = timestamp.toString();

    if (timestamp.length <= 10) {
      timestamp = timestamp + "000";
    }

    timestamp = parseInt(timestamp);

    const hoursDiff = timestampDiff({ first: timestamp });

    if (hoursDiff < 48) {
      return `${hoursDiff} hours ago`;
    } else {
      return Math.round(hoursDiff / 24) + " days ago";
    }
  };

  icoStatusToText = type => {
    if (type === "RECEIVED") return "Received";

    return "Sent";
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
        weekDay = "Sunday";
        break;
      case 1:
        weekDay = "Monday";
        break;
      case 2:
        weekDay = "Tuesday";
        break;
      case 3:
        weekDay = "Wednesday";
        break;
      case 4:
        weekDay = "Thursday";
        break;
      case 5:
        weekDay = "Friday";
        break;
      case 6:
        weekDay = "Saturday";
        break;
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();


    return `${weekDay} ${day}/${month < 10 ? "0" + month : month}/${year}`;
  };

  parseTimeStampToDayAndMonth = timestamp => {

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
        yearMonth = "Feb";
        break;
      case 2:
        yearMonth = "Mar";
        break;
      case 3:
        yearMonth = "Apr";
        break;
      case 4:
        yearMonth = "May";
        break;
      case 5:
        yearMonth = "Jun";
        break;
      case 6:
        yearMonth = "Jul";
        break;
      case 7:
        yearMonth = "Aug";
        break;
      case 8:
        yearMonth = "Sep";
        break;
      case 9:
        yearMonth = "Oct";
        break;
      case 10:
        yearMonth = "Nov";
        break;
      case 11:
        yearMonth = "Dec";
        break;
    }
    let day = date.getDate();
    if (day < 10) {
      return "0" + day + "/" + yearMonth;
    }
    else {
      return day + "/" + yearMonth;
    }
  };

  renderIcon = type => {
    if (type === "SPENT") return `/img/app_wallet/ic_enviado_.svg`;
    if (type === "RECEIVED") return `/img/app_wallet/ic_receber_.svg`;

    return;
  };

  // action click history
  handleToggleHistory = item => {
    if (this.state.activeIndex === item) {
      this.setState({ ...this.state, activeIndex: null });
    } else {
      this.setState({ ...this.state, activeIndex: item });
    }
  };

  _renderHistories() {
    let { currentNetwork, currentTxHistory } = this.props.componentWallet;
    let { crypto } = this.props.currencies;
    let currentCurrencies = crypto[currentNetwork.toUpperCase()].USD

    if (currentTxHistory.length < 1) {
      return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
    } else if (currentTxHistory.data.history.length < 1) {
      return <ErrorMessage> No transactions </ErrorMessage>;
    }


    const blockexplorerUrl = TESTNET ? 'https://blockexplorer-testnet.lunes.io/tx/' : 'https://blockexplorer.lunes.io/tx/';

    return currentTxHistory.data.history.map((transaction, key) => {
      if (transaction.otherParams.type !== 4) return null;
      let amount = numeral(transaction.nativeAmount / 100000000).format('0,0.00000000');
      let usdAmount = numeral((transaction.nativeAmount / 100000000) * currentCurrencies).format('$0,0.00')

      return (
        <History key={key}>
          <HistoryHead onClick={() => this.handleToggleHistory(key)}>
            <Row>
              <Col s={6} m={6} l={6}>
                <HistoryHeadStatus>
                  <HeadStatusIcon type={transaction.type} src={this.renderIcon(transaction.type)} />
                  <HeadStatusDate>{this.parseTimeStampToDayAndMonth(transaction.date)}</HeadStatusDate>
                </HistoryHeadStatus>
                <HistoryHeadText>
                  <StatusStyle type={transaction.type}>
                    {this.icoStatusToText(transaction.type)}
                  </StatusStyle>
                  {this.timeToText(transaction.date)}
                </HistoryHeadText>
              </Col>

              <Col s={6} m={6} l={6}>
                <HistoryHeadAmount>
                  <HeadAmountCoin type={transaction.type}>
                    {this.SignalControl(transaction.type)}
                    {amount}
                  </HeadAmountCoin>
                  <HeadAmountMoney>
                    ({usdAmount})
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
                      {this.icoStatusToText(transaction.type)}:
                    </Span>
                    <TextT>
                      {amount}
                      {currentNetwork.toUpperCase()}
                      ({usdAmount})
                    </TextT>
                  </Text>
                  <Text size={"1.4rem"} txBold margin={"1.5rem 0 0 0"}>
                    <span>Date: </span>
                    <TextT>
                      {this.parseTimestampToDate(transaction.date)}
                    </TextT>
                  </Text>
                </HistoryContentItem>
              </Col>
              <Col m={6} l={6}>
                <HistoryContentItem clWhite>
                  <Text size={"1.4rem"} margin={"2.5rem 0 0 0"}>Transaction ID:</Text>
                  <Text size={"1.4rem"} txBold>
                    <TransactionId href={blockexplorerUrl + transaction.txid} target="_blank"> {transaction.txid} </TransactionId>
                  </Text>
                </HistoryContentItem>
              </Col>
            </Row>
          </HistoryContent>
        </History>
      );
    })
  }

  render() {
    try {
      return (
        <StyledHistories>
          {this._renderHistories()}
        </StyledHistories>
      );
    } catch (e) {
      console.error(e);
      return <ErrorMessage> Error: {e} </ErrorMessage>;
    }
  }
}

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Histories);
