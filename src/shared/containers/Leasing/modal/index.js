import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "Components/index";

import {
    Background,
    QuantityAmount,
    LeasingStyleModalCss,
    Close,
    ReceiveContentCss,
    Rectangle,
    TextCenter,
    Image,
    CoinValue,
    Line,
    NumberPorcent,
    Div,
    DivNumber
} from "./css";

import Hr from "../../Wallet/PanelRight/Modal/Hr";

class LeasingModal extends Component {
    render() {
        return (
            <Background>
                <LeasingStyleModalCss>
                    <Col defaultAlign={"center"} s={12} m={12} l={12}>
                        <Row>
                            <Close>x</Close>

                            <Image src="/img/coins/lns.svg" />
                            <CoinValue>250000.0054248</CoinValue>

                            <Rectangle>
                                <Row>
                                    <TextCenter clWhite>Quantidade</TextCenter>
                                </Row>
                                <Row>
                                    <QuantityAmount roboto>50.000000</QuantityAmount>
                                </Row>
                            </Rectangle>
                        </Row>


                        <Div>
                            <DivNumber>
                                <NumberPorcent roboto clNormalGreen>25%</NumberPorcent>
                                <NumberPorcent roboto clMostard>50%</NumberPorcent>
                                <NumberPorcent roboto clNormalRed>100%</NumberPorcent>
                            </DivNumber>
                            <Line />

                        </Div>
                    </Col>
                </LeasingStyleModalCss>
            </Background>
        );
    }
}
export default LeasingModal;