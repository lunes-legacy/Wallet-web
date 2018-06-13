import React from 'react'
import styled from "styled-components"
import style from "Shared/style-variables"
import {TextBase, H1, Col, Row} from "Components"

const Ct = styled.div`
    ${TextBase}
    display: inline-block;
    margin-top:5px;
    margin-bottom:10px;
`;

const L = styled.hr`
    background-color: ${style.lightPurple};
    border-bottom :dashed 1px ${style.lightPurple};
    margin:20px 0 20px 0;
`;

class Account extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <Ct clWhite size={'1.6rem'} width={'100%'}>Definições regionais</Ct>
                <Ct clNormalGreen size={'1.2rem'} width={'100%'}>O idioma selecionado ...</Ct>

                <Row>
                    <Col s={12} m={4} l={4} className={'panel-left'}> 
                        <Ct clWhite size={'1.2rem'}>Idioma de interface</Ct>
                    </Col>
                    <Col s={12} m={4} l={4} className={'panel-left'}> 
                        <Ct clWhite size={'1.2rem'}>Fuso horário</Ct>
                    </Col>
                    <Col s={12} m={4} l={4} className={'panel-left'}> 
                        <Ct clWhite size={'1.2rem'}>Moeda de visualização</Ct>
                    </Col>
                </Row>
                <L />
                
                <Ct clWhite size={'1.6rem'} width={'100%'}>Endereço de e-mail <Ct clNormalGreen size={'1.6rem'}>dvs040404@gmail.com</Ct></Ct>
                <Ct clWhite size={'1.6rem'} width={'100%'}>Você não pode alterar o endereço de e-mail associado à sua conta</Ct>

                <L />

                <Ct clWhite size={'1.6rem'} width={'100%'}>Encerramento de <Ct clNormalGreen size={'1.6rem'}>conta</Ct></Ct>
                <Ct clWhite size={'1.6rem'} width={'100%'}>Você pode encerrar manualmente sua conta.<br/>
                Depois de encerrar sua conta, você não terá como iniciar uma sessão ou fazer transações.</Ct>
                
            </div>
        )
    }
}

export default Account