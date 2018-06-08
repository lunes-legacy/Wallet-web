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
    DivNumber,
    DivButton,
    DivText,
    TextLeft,
    LineText,
    Textphrase,
    TextFee
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
                            <CoinValue offside>250000.0054248</CoinValue>

                            <Rectangle>
                                <Row>
                                    <div>
                                        <TextCenter clWhite>Quantidade</TextCenter>
                                    </div>
                                </Row>
                                <Row>
                                    <QuantityAmount >50.000000</QuantityAmount>
                                </Row>
                            </Rectangle>
                        </Row>

                        <Row>
                            <DivNumber>
                                <NumberPorcent clNormalGreen marginRight={"35%"}>25%</NumberPorcent>
                                <NumberPorcent clMostard marginRight={"28%"}>50%</NumberPorcent>
                                <NumberPorcent clNormalRed>100%</NumberPorcent>
                                <Line />
                            </DivNumber>
                        </Row>
                        <Row>
                            <DivText>
                                <TextLeft clWhite>Destinatario</TextLeft>
                                <Textphrase clWhite>3P2HNUd5VUPLMQkJmctTPEeeHumiPN2GkTb</Textphrase>
                                <LineText />
                            </DivText>
                        </Row>

                        <Row>
                            <DivText inline>
                                <TextLeft clWhite>Fee
                                    <TextFee>0.000900</TextFee>
                                </TextLeft>

                                <LineText />
                            </DivText>
                        </Row>
                        <Row>
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