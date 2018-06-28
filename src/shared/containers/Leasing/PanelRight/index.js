import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
// import { coins } from 'lunes-lib';
import { TextBase, H1 } from "Components";
//import {ButtonGreen} from "Components/Buttons";
import { Col, Row, Modal } from 'Components/index';
import { Loading } from 'Components/Loading';
import { timestampToDate } from 'Utils/date';
import { encrypt, decrypt } from '../../../utils/crypt';
// import { LeasingClass } from 'Classes/Leasing'; // refatorar para usar a classe

// REDUX
import { connect } from 'react-redux';
import {
    getLeasingHistory,
    cancelLeasing
} from 'Redux/actions';

// CLASSES
import { MoneyClass } from 'Classes/Money';

// LIBS
import { numeral } from 'Utils/numeral';


const StyledPanelRight = styled.div`
  position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
  overflow-x: auto;
  letter-spacing: .3px;
`;

const LabelBalance = styled.text`
  ${TextBase}
  display:block;
  text-align:right;
  margin-bottom:3rem;
`;

const ContentList = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  border-radius: 1.5rem;
  padding: 1.5rem;
  margin: 1.5rem;
  margin-bottom: 180px;
`;

const HeaderRow = Row.extend`
  ${TextBase}
  padding: 3rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

const DateText = styled.div`
  ${TextBase}
  font-size: 1rem;
  display:block;

  ${props => {
    if (!props.status) {
      return `color: ${style.lightPurple}`;
    }
  }};
`;

const HashText = styled.div`
  ${TextBase}
  font-size: 1.2rem;
  display:block;
  margin-top: .5rem;

  ${props => {
    if (!props.status) {
      return `color: ${style.lightPurple}`;
    }
  }};
`;

const GreenText = styled.div`
  ${TextBase}
  font-size: 1.2rem;
  display:block;

  ${props => {
  if (!props.status) {
    return `color: ${style.lightPurple}`;
  }
  }};
`;

const Noleasingtext = styled.div`
  ${TextBase}
  font-size: 1.2rem;
  display:block;
  color: white;
`;

const CancelBox = styled.div`
  &:hover {
    filter: hue-rotate(260deg) saturate(8);
    -webkit-filter: hue-rotate(260deg) saturate(8);
  }
`;

const CancelText = styled.div`
  ${TextBase}
  font-size: 1.2rem;
  display:block;
  cursor: pointer;

  ${props => {
    if (!props.status) {
      return `color: ${style.lightPurple}`;
    }
  }};
`;

const Icon = styled.img`
	width: 25px;
  height: 25px;
`;

const IconActive = styled.div`
  background-image: url(/img/leasing_panel_right/icon-power.svg);
  backrgound-repeat: no-repeat;
  background-size: cover;

	width: 25px;
  height: 25px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom:-10px;

  -webkit-animation: rotation 5s infinite linear;
  -moz-animation: rotation 5s infinite linear;
  animation: rotation 5s infinite linear;

  @-webkit-keyframes rotation {
      from { -webkit-transform: rotate(0deg); }
      to {-webkit-transform: rotate(359deg); }
  }

  @-moz-keyframes rotation {
      from { -moz-transform: rotate(0deg); }
      to { -moz-transform: rotate(359deg); }
  }

  @keyframes rotation {
      from { transform: rotate(0deg); }
      to { transform: rotate(359deg); }
  }

`;

const BoxLineLeasing = Row.extend`
  margin-bottom:20px;
  border-bottom: solid 1px ${style.normalLilac3};
  padding-top:20px;
  padding-bottom:20px;

  &:last-child {
    border-bottom: none;
  }
`;

const money = new MoneyClass;

class PanelRight extends React.Component {
  constructor(props) {
    super(props)
    let wallet_info = {}

    this.state = {
      openConfirmModal: false,
      canceledTxId: ''
    }

    this.cancelLeasing = this.cancelLeasing.bind(this);
  }

  toggleConfirmModal = () => {
    this.setState(prevState => ({
      openConfirmModal: !prevState.openConfirmModal
    }));
  }

  // consulta de leasing
  searchLeasing = () => {
    this.props.getLeasingHistory(this.wallet_info);
    // console.log(this.props.listLeasing);
  }

  componentDidMount = () => {
    // bloco de teste ************
    // ++ adicione aqui
    // bloco de teste ************

    this.wallet_info = localStorage.getItem('WALLET-INFO');

    this.searchLeasing();
  }

  componentWillMount = () => {

  }

  cancelLeasing = (key) => {
    let payload = {
      wallet_info: this.wallet_info,
      key: key
    };

    this.props.cancelLeasing(payload);

    this.setState({
      canceledTxId: key
    })

    // alert("CANCELED: " + key);
    this.toggleConfirmModal();
    this.searchLeasing();
  }

  // normalizar status do leasing, que hoje é 8 ou 9
  _normalizeStatus = status => {
    if (status === "active") {
      return true
    } else {
      return false
    }
  }

  // retornando o botao de cancelar, com condicional de status
  _buttonCancel = (status, id, type) => {
    if (type === 8) {
      if (status) {
        return (
          <CancelBox>
            <CancelText clNormalGreen txCenter status={status} onClick={() => this.cancelLeasing(id)}>
              <IconActive /><br />
              CANCEL
                        </CancelText>
          </CancelBox>
        );
      } else {
        return (
          <CancelText clNormalRed txCenter status={status} onClick={() => { }}>
            <Icon src={'/img/leasing_panel_right/icon-power-off.svg'} /><br />
            CANCELED
                    </CancelText>
        );
      }
    }
  }

    // retornando os itens, de acordo com os dados no storage
    _renderLeasings = () => {
        if (!this.props.listLeasing) {
            return <Noleasingtext txBold txCenter>NO LEASING FOUND</Noleasingtext>
        }
        if (this.props.listLeasing.length < 1) {
            return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
        } else {
            return this.props.listLeasing.map((obj, key) => {
                let nativeAmount = numeral(money.conevertCoin('btc', obj.nativeAmount)).format('0,0.00000000');
                let status = this._normalizeStatus(obj.otherParams.status);

                return (
                    <BoxLineLeasing key={obj.txid} >
                        <Col s={12} m={6} l={6}>
                            <DateText clWhite status={status}> {new Date(obj.date).toLocaleDateString()} </DateText>
                            <HashText clWhite txBold status={status}> {obj.txid} </HashText>
                        </Col>
                        <Col s={12} m={4} l={4}>
                            <GreenText clNormalGreen txBold txCenter status={status}> {nativeAmount} LUNES</GreenText>
                        </Col>
                        <Col s={12} m={2} l={2}>
                            {this._buttonCancel(status, obj.txid, obj.otherParams.type)}
                        </Col>
                    </BoxLineLeasing>
                );
            });
        }

    if (this.props.listLeasing.length < 1) {
      return <Loading className="js-loading" size={'35px'} bWidth={'7px'} />;
    } else {
      return this.props.listLeasing.map((obj, key) => {
        let nativeAmount = numeral(obj.nativeAmount / 100000000).format('0,0.00000000');
        let status = this._normalizeStatus(obj.otherParams.status);

        return (
          <BoxLineLeasing key={obj.txid} >
            <Col s={12} m={6} l={6}>
              <DateText clWhite status={status}> {new Date(obj.date).toLocaleDateString()} </DateText>
              <HashText clWhite txBold status={status}> {obj.txid} </HashText>
            </Col>
            <Col s={12} m={4} l={4}>
              <GreenText clNormalGreen txBold txCenter status={status}> {nativeAmount} LUNES</GreenText>
            </Col>
            <Col s={12} m={2} l={2}>
              {this._buttonCancel(status, obj.txid, obj.otherParams.type)}
            </Col>
          </BoxLineLeasing>
        );
      });
    }
  }

  // o componente
  render() {
    return (
      <StyledPanelRight>
        {/* header da tabela */}
        <HeaderRow>
          <Col s={12} m={6} l={6}>
            Leasing Transactions
                    </Col>
          <Col s={12} m={4} l={4} css={`text-align:center;`}>
            Amount
                    </Col>
          <Col s={12} m={2} l={2} css={`text-align:center;`}>
            Status
                    </Col>
        </HeaderRow>

        {/* content da tabela */}
        <ContentList>
          {this._renderLeasings()}
        </ContentList>
        <Modal
          isOpen={this.state.openConfirmModal}
          onClose={this.toggleConfirmModal}
          width={'400px'}
          height={'300px'}
          type={'success'}
          title={'Sucess'}
          hr
          text={<div style={{fontSize: '1.2rem'}}>The lease was canceled. <br /><br /> {this.state.canceledTxId}</div>}
        />
      </StyledPanelRight>
    );
  }
}

//aplicar redux
const mapStateToProps = state => {
  return {
    listLeasing: state.leasing.listLeasing
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLeasingHistory: (data) => {
      dispatch(getLeasingHistory(data));
    },
    cancelLeasing: (data) => {
      dispatch(cancelLeasing(data));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PanelRight);
