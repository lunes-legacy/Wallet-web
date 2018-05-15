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
import { ReceiveStyleModalCss, ReceiveButtonCss, ReceiveContentCss, ReceiveCircleButtonCss } from "./css";

class ModalReceive extends React.Component {
  constructor(props) {
    super(props);

    this.ref = {};
    this.ref.wrapperQr = React.createRef();
    this.ref.radioCoinAmount = React.createRef();
    this.ref.coinAmount = React.createRef();
    this.ref.address = React.createRef();
    this.ref.brlAmount = React.createRef();
    this.ref.usdAmount = React.createRef();
    this.ref.coinAmount = React.createRef();
    //quantity types: real, dollar, coin
  }
  componentDidMount() {
    this.wrapperQr = ReactDOM.findDOMNode(this.ref.wrapperQr.current);

    this.makeQrCode();
  }

  makeQrCode = () => {
    let qr = qrcode(4, "L");
    qr.addData("Leonardo Ribeiro da Silva");
    qr.make();
    let img = qr.createSvgTag();
    this.wrapperQr.innerHTML = img;
    let imgEl = this.wrapperQr.children[0];
    imgEl.style.width = "90%";
    imgEl.style.height = "auto";
  };

  handleSend = async () => {
    console.log(this.coinAmount.getAttribute("value"));
    let coinAmount = this.coinAmount.value;
    let address = this.address.value;
    let result = await this.props.send({ coinAmount, address });
    console.log(`%c${result}`, "font-size: 20px; color: lightgreen; background: indianred;");
  };

  render() {
    return (
      <Background>
        <ReceiveStyleModalCss>
          <Close>X</Close>

          <ReceiveContentCss>
            {/*BUTTONS COL*/}
            <Col defaultAlign={"center"} s={12} m={12} l={12}>
              <Row>
                <ReceiveButtonCss innerRef={this.ref.wrapperQr} blockCenter clWhite bgWhite>
                  QR Code
                </ReceiveButtonCss>
              </Row>
            </Col>
            <Col s={12} m={12} l={12}>
              <Row>
                <ReceiveCircleButtonCss />
              </Row>
            </Col>
          </ReceiveContentCss>
          <Foot />
        </ReceiveStyleModalCss>
      </Background>
    );
  }
}
export default ModalReceive;
