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
    let data = new CookieClass().getCookie("user").user.replace("; _ga", "");
    var address = JSON.parse(data);
    return address.wallet.coins[0].addresses[0].address;
  };

  makeQrCode = () => {
    let address = this.getPayAddress();
    let qr = qrcode(4, "L");
    qr.addData(address);
    qr.make();
    let img = qr.createSvgTag();
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
                <IconAction src={"/img/bitcoin.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss onClick={() => this.copyPaymentAddress()}>
                <IconAction src={"/img/bitcoin.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss onClick={() => this.copyPaymentAddress()}>
                <IconAction src={"/img/bitcoin.svg"} />
              </ReceiveButtonModalCss>
              <ReceiveButtonModalCss onClick={() => this.copyPaymentAddress()}>
                <IconAction src={"/img/bitcoin.svg"} />
              </ReceiveButtonModalCss>
            </Row>
          </Foot>
        </ReceiveStyleModalCss>
      </Background>
    );
  }
}
export default ModalReceive;
