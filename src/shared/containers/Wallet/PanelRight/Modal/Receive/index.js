import React from "react";
import ReactDOM from "react-dom";
import styled, { css } from "styled-components";
import style from "Shared/style-variables";
import { connect } from "react-redux";
import qrcode from "qrcode-generator";
import { Col, Row, Button } from "Components/index";

//PRIVATE COMPONENTS
import Background from "../Background";
import Close from "../Close";
import Content from "../Content";
import Foot from "../Foot";
import Head from "../Head";
import Hr from "../Hr";
import StyledModal from "../StyledModal";
import {
  ReceiveStyleModalCss,
  ReceiveButtonQrCodeCss,
  ReceiveContentCss,
  ReceiveCircleButtonCss,
  ReceiveLabelCss,
  ReceiveButtonModalCss,
  IconAction,
  ReceiveLabelTextCss
} from "./css";
import CookieClass from "../../../../../classes/Cookie";

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

  getPayAddress = () => {
    // let data = new CookieClass().get("user").user.replace("; _ga", "");
    let data = '{"_id":"5afc4dd1eb40bcbca23f92ad","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0ZGQxZWI0MGJjYmNhMjNmOTJhZCIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjcwMDAwNTAsImV4cCI6MTUyNzAwNzI1MH0.uDQQ-pdKDhg0ebagDFVUjwiFei_QyVhlygc7uubsKyo","email":"wandyer1@lunes.io","fullname":"Wandyer Silva","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","confirmIcoTerm":false,"ownCoupon":"5SLBR768","coupon":"","whitelist":false,"pinIsValidated":false,"phoneIsValidated":false,"twofaEnabled":false,"wallet":{"hash":"skull ticket hidden split couch orient season tooth valley learn edge truck","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"ltc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"dash","currentIndex":0,"addresses":[{"index":0,"address":"yUBEQnE5Xz62qCBFFy3CsqMNSggLL2VJGQ","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"eth","currentIndex":0,"addresses":[{"index":0,"address":"0x4E3f5C5DEBf6cF3B6468407fD2D8379EB6725197","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"}]},"depositWallet":{}}';
    var address = JSON.parse(data);
    return address.wallet.coins[0].addresses[0].address;
  };

  makeQrCode = () => {
    let address = this.getPayAddress();
    let qr = qrcode(4, "L");
    qr.addData(address);
    qr.make();
    let img = qr.createSvgTag();
    if (!this.wrapperQr) return; //precisa tirar
    this.wrapperQr.innerHTML = img;
    let imgEl = this.wrapperQr.children[0];
    imgEl.style.width = "90%";
    imgEl.style.height = "auto";
  };

  copyPaymentAddress = () => {
    const element = document.createElement("textarea");
    element.value = this.getPayAddress();
    document.body.appendChild(element);
    element.select();
    document.execCommand("copy");
    document.body.removeChild(element);
    alert("Copiado com sucesso!");
  };

  toggleModalReceived = isShow => {
    this.setState({ isOpenModalReceived: !isShow });
  };

  render() {
    if (!this.state.isOpenModalReceived) return null;

    return (
      <Background>
        <ReceiveStyleModalCss>
          <Close onClick={() => this.toggleModalReceived(this.props.isShow)}>
            <strong>X</strong>
          </Close>
          <ReceiveContentCss>
            <Col defaultAlign={"center"} s={12} m={12} l={12}>
              <Row>
                <ReceiveButtonQrCodeCss innerRef={this.ref.wrapperQr} blockCenter clWhite bgWhite>
                  QR Code
                </ReceiveButtonQrCodeCss>
              </Row>
            </Col>
          </ReceiveContentCss>
          <Foot>
            <Row>
              <ReceiveLabelCss> {this.getPayAddress()}</ReceiveLabelCss>
            </Row>
            <Row>
              <ReceiveLabelTextCss>COPY THIS ADDRESS</ReceiveLabelTextCss>
            </Row>
            <Row>
              <ReceiveButtonModalCss onClick={() => this.copyPaymentAddress()}>
                <IconAction src={"/img/app_wallet/modal_receive/ic_copy.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss>
                <IconAction src={"/img/app_wallet/modal_receive/ic_print.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss>
                <IconAction src={"/img/app_wallet/modal_receive/ic_email.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss>
                <IconAction src={"/img/app_wallet/modal_receive/ic_link.svg"} />
              </ReceiveButtonModalCss>
            </Row>
          </Foot>
        </ReceiveStyleModalCss>
      </Background>
    );
  }
}
export default ModalReceive;
