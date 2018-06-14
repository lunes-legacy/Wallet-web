import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "Components/index";
import { TextBase } from 'Components/TextBase';
import { ButtonGreen } from "Components/Buttons";
import { numeral } from 'Utils/numeral';
import { InputText } from 'Components/forms/input-text';

// REDUX
import { connect } from 'react-redux';

import {
    Background,
    QuantityAmount,
    LeasingStyleModalCss,
    Close,
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
import styled from "styled-components";

class LeasingModal extends Component {

    constructor() {
        super();

        this.state = {
            valuePorcent: 0
        }
    }

    handleModal = () => {
        let modalClass = document.querySelector(".modal-status");
        return modalClass.style.display = "none";
    }

    leasingPorcentCalculator(value) {
        this.setState({
            valuePorcent: (this.props.balance.LNS.total_confirmed * value)/ 100
        })
    }

    setInputValue(value) {
        this.setState({
            valuePorcent: value
        })
    }

    render() {
        return (
            <Background className={"modal-status"}>
                <LeasingStyleModalCss>
                    <Col defaultAlign={"center"} s={12} m={12} l={12}>
                        <Row>
                            <Close onClick={this.handleModal}>x</Close>

                            <Image src="/img/coins/lns.svg" />
                            <CoinValue offSide>{numeral(this.props.balance.LNS.total_confirmed).format('0,0.00000000')}</CoinValue>

                            <Rectangle>
                                <Row>
                                    <div>
                                        <TextCenter clWhite>Quantidade</TextCenter>
                                    </div>
                                </Row>
                                <Row>
                                    <QuantityAmount clNormalGreen>
                                        <InputText                                        
                                            type={'number'}
                                            onChange={(value) => this.setInputValue(value.target.value)}
                                            noBorder
                                            txCenter
                                            clNormalGreen
                                            placeholder={'0.00000000'}
                                            value={this.state.valuePorcent}                                            
                                            min="0" />
                                    </QuantityAmount>
                                </Row>
                            </Rectangle>
                        </Row>

                        <Row>
                            <DivNumber>
                                <NumberPorcent marginRight={"35%"} clNormalGreen onClick={() => this.leasingPorcentCalculator(25)}> 25%</NumberPorcent>
                                <NumberPorcent marginRight={"27%"} clMostard onClick={() => this.leasingPorcentCalculator(50)}>50%</NumberPorcent>
                                <NumberPorcent clNormalRed onClick={() => this.leasingPorcentCalculator(100)}>100%</NumberPorcent> 
                                <Line/>
                            </DivNumber>
                        </Row>
                        <Row>
                            <DivText>
                                <TextLeft clWhite>Destinatário</TextLeft>
                                <Textphrase>
                                    <InputText
                                        clWhite
                                        noBorder
                                        txCenter
                                        placeholder={'clWhite3P2HNUd5VUPLMQkJ...'} />
                                </Textphrase>
                                <LineText />
                            </DivText>
                        </Row>

                        <Row>
                            <DivText inline>
                                <TextLeft clWhite>Fee
                                    <TextFee>0.001</TextFee>
                                </TextLeft>

                                <LineText />
                            </DivText>
                        </Row>
                        <Row>
                            <DivButton>
                                <ButtonGreen >INICIAR LEASING</ButtonGreen>
                            </DivButton>
                        </Row>
                    </Col>
                </LeasingStyleModalCss>
            </Background>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        balance: state.balance,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LeasingModal);
