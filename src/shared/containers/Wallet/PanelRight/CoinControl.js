import React        from "react";
import styled       from "styled-components";
import style        from "Shared/style-variables";
import { TextBase } from "Components/TextBase";
import { Col, Row } from "Components/index"
import ModalReceive from "./Modal/Receive/index";
import ModalSend    from "./Modal/Send";
import {connect}    from "react-redux";
import {numeral}    from 'Utils/numeral';
import { toggleModal } from './Modal/ui';

const StyledCoinControl = styled.div`
  width: 100%;
  padding: 30px 0px 30px 0px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
`;

const WrapAmount = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 5px;

  @media (${style.media.tablet2}) {
    text-align: right;
    margin-bottom: 0;
    margin-right: 2rem;    
    padding-right: 10px;
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
    font-size: 4rem;
    margin-top: 1rem;
  }
`;

const MonetaryValue = styled.div`
  ${TextBase}
  color: white;
  display: inline-block;
  font-size: 1.5rem;
  line-height: 50px;
  margin-top: 1rem;

  @media (${style.media.mobile2}) {
    font-size: 1.7rem;
    margin-top: 1rem;
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
    border-radius: 24px;
    font-size: 1.5rem;
    padding: 20px 0;
    width: 108px;
    height: 100px;
  }

  @media (${style.media.tablet2}) {
    margin: 0 1rem;
  }
`;

const SendCoin = CoinAction.extend`
  float: right;
  background: ${style.normalRed};
  cursor: pointer;
`;

const ReceiveCoin = CoinAction.extend`
  background: ${style.normalGreen};
`;

const SendCoinImage = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 5px;
  margin-bottom: 3px;
`;

class CoinControl extends React.Component {
  handleToggleSendModal = () => { };

  constructor(props) {
    super(props);
    this.state = { isOpenModalReceived: false };
    numeral.locale(this.props.currencies.locale);
  }

  showModalReceived = () => {
    this.setState({
      isOpenModalReceived: !this.state.isOpenModalReceived
    });
  };
  _handleClickOpenModal = (name) => {
    let modal
    if (name === 'send') {
      modal = document.querySelector('.js-modal-send');
    } else {
      modal = document.querySelector('.js-modal-receive');
    }
    toggleModal(modal);
  }
  render() {
    let { currentNetwork }      = this.props.component.wallet;
    let { crypto, currencies }  = this.props.currencies;
    let usdCurrent = crypto[currentNetwork.toUpperCase()].USD
    let brlCurrent = crypto[currentNetwork.toUpperCase()].BRL
    let coinAmount = this.props.balance[currentNetwork.toUpperCase()].total_confirmed;
    let usdCoinAmount = numeral(usdCurrent * coinAmount).format('$0,0.00');
    let brlCoinAmount = numeral(brlCurrent * coinAmount).format('$0,0.00');

    return (
      <StyledCoinControl>
        <ModalSend/>
        <ModalReceive/>
        <Row overflowHidden>
          <Col s={12} m={6} l={8}>
            <WrapAmount>
              <Amount offSide>{ this.props.component.wallet.currentNetwork.toUpperCase() } { numeral(this.props.balance[this.props.component.wallet.currentNetwork.toUpperCase()].total_confirmed).format('0,0.0000') }</Amount>
              <Usd>USD { usdCoinAmount }</Usd>
              <Divisor />
              <Brl>BRL { brlCoinAmount }</Brl>
            </WrapAmount>
          </Col>
          <Col s={6} m={3} l={2}>
            <SendCoin onClick={() => this._handleClickOpenModal('send')}>
              <SendCoinImage src="/img/app_wallet/ic_enviar.svg" />
              <br />
              Enviar
            </SendCoin>
          </Col>
          <Col s={6} m={3} l={2}>
            <ReceiveCoin onClick={() => this._handleClickOpenModal('receive')}>
              <SendCoinImage src="/img/app_wallet/ic_receber.svg" />
              <br />
              Receber
            </ReceiveCoin>
            {/*this.state.isOpenModalReceived && <ModalReceive isShow={this.state.isOpenModalReceived} />*/}
          </Col>
        </Row>
      </StyledCoinControl>
    );
  }
}

const mapStateToProps = (state) => {
	return {
    currencies: state.currencies,
    component:  state.component,
    balance:    state.balance
	}
}
const mapDispatchToProps = (dispatch) => {
	return { }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinControl);
//export default CoinControl;
