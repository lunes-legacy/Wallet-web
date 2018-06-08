import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "Components/index";
import { ButtonGreen } from "Components/Buttons";

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
    DivNumber,
    DivButton
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

                        <Row>
                            <DivNumber>
                                <NumberPorcent roboto clNormalGreen marginRight={"36%"}>25%</NumberPorcent>
                                <NumberPorcent roboto clMostard marginRight={"30%"}>50%</NumberPorcent>
                                <NumberPorcent roboto clNormalRed left>100%</NumberPorcent>
                                <Line />
                            </DivNumber>
                            <DivButton>
                                <ButtonGreen>INICIAR LEASING</ButtonGreen>
                            </DivButton>
                        </Row>
                    </Col>
                </LeasingStyleModalCss>
            </Background>
        );
    }
}
export default LeasingModal;