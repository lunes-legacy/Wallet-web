import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "Components/index";

import {
    Background,
    Amount,
    LeasingStyleModalCss,
    Close,
    ReceiveContentCss,
    Rectangle,
    TextCenter
} from "./css";

class LeasingModal extends Component {
    render() {
        return (
            <Background>
                <LeasingStyleModalCss>
                    <Col defaultAlign={"center"} s={12} m={12} l={12}>
                        <Row>
                            <Close>x</Close>
                        </Row>
                    </Col>
                    <Row>
                        <Rectangle>
                            
                            <TextCenter>Quantidade</TextCenter>
                            <Amount>50.000000</Amount>
                        </Rectangle>
                    </Row>

                </LeasingStyleModalCss>
            </Background>
        );
    }
}
export default LeasingModal;