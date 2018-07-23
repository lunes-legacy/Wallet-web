import React from "react";
import ReactDOM from "react-dom";
import qrcode from "qrcode-generator";
import { Col, Row } from "Components/index";
import { connect } from "react-redux";
import Background from "../Background";
import Close from "../Close";
import Foot from "../Foot";
import { toggleModal } from './../ui';
import style from 'Shared/style-variables';

import {
  ReceiveStyleModalCss,
  ReceiveButtonQrCodeCss,
  ReceiveContentCss,
  ReceiveLabelCss,
  ReceiveButtonModalCss,
  IconAction,
  ReceiveLabelTextCss,
  ReceiverAddressCopiedCss
} from "./css";


class ModalReceive extends React.Component {
  constructor(props) {
    super(props);

    this.ref = {};
    this.ref.wrapperQr = React.createRef();
    this.ref.address = React.createRef();
    this.state = { isOpenModalReceived: this.props.isShow };
  }

  componentDidMount() {

    this.wrapperQr = ReactDOM.findDOMNode(this.ref.wrapperQr.current);
    this.makeQrCode();

  }

  componentDidUpdate() {
    this.wrapperQr = ReactDOM.findDOMNode(this.ref.wrapperQr.current);
    this.makeQrCode();

  }

  getCurrentAddress = () => {
    let currentNetwork = this.props.currentNetwork;
    let address = this.props.addresses;
    return address[currentNetwork];

  };

  makeQrCode = () => {
    let address = this.getCurrentAddress();
    let qr = qrcode(4, "L");
    qr.addData(address);
    qr.make();
    let img = qr.createSvgTag();
    if (!this.wrapperQr) return; //precisa tirar
    this.wrapperQr.innerHTML = img;
    let imgEl = this.wrapperQr.children[0];
    imgEl.style.width = "80%";
    imgEl.style.height = "auto";

  };

  copyPaymentAddress = () => {
    const element = document.createElement("textarea");
    element.value = this.getCurrentAddress();
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    const addressCopied = document.querySelector('#address-copied');

    // Exibe a mensagem que o endereço foi copiado para a área de transferência
    addressCopied.style.visibility = 'visible';

    // Esconde a mensagem de endereço copiado
    setTimeout(() => {
      addressCopied.style.visibility = 'hidden';
    }, 3000);
  };

  toggleModalReceived = isShow => {
    this.setState({ isOpenModalReceived: !isShow });
  };

  _handleClickClose = (event) => {
    let modal = document.querySelector('.js-modal-receive');
    //this.props.dispatch({});
    const _this = this;
    toggleModal(modal, _this);
    /*{className={'js-modal-send'}}*/
  }
  render() {
    let currentNetwork = this.props.currentNetwork;

    return (
      <Background>
        <ReceiveStyleModalCss className="js-modal-receive">
          <Close onClick={this._handleClickClose}>&times;</Close>
          <ReceiveContentCss>
            <Col defaultAlign={"center"} s={12} m={12} l={12}>
              <Row>
                <ReceiveButtonQrCodeCss innerRef={ this.ref.wrapperQr } blockCenter clWhite bgWhite>
                  QR Code
                </ReceiveButtonQrCodeCss>
              </Row>
            </Col>
          </ReceiveContentCss>
          <Foot>
            <Row>
              <ReceiveLabelCss> {this.getCurrentAddress()} </ReceiveLabelCss>
            </Row>
            <Row>
              <ReceiveLabelTextCss>COPY THIS ADDRESS</ReceiveLabelTextCss>
            </Row>
            <Row>
              <ReceiverAddressCopiedCss id="address-copied">Address copied to the clipboard</ReceiverAddressCopiedCss>
            </Row>
            <Row>
              <ReceiveButtonModalCss color={style.coinsColor[currentNetwork]} onClick={() => this.copyPaymentAddress()}>
                <IconAction src={"/img/app_wallet/modal_receive/ic_copy.svg"} />
              </ReceiveButtonModalCss>
            </Row>
          </Foot>
        </ReceiveStyleModalCss>
      </Background>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentNetwork: state.component.wallet.currentNetwork,
    addresses: state.walletInfo.addresses,
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalReceive);
