import React from 'react'
import styled, {css} from "styled-components"
import style from "Shared/style-variables"
import {TextBase, H1, Col, Row} from "Components"

const Ct = styled.div`
    ${TextBase}
    display: inline-block;
    margin-top:5px;
    margin-bottom:10px;
`;

const L = styled.hr`
    //background-color: ${style.lightPurple};
    border-bottom :dashed 1px ${style.lightPurple};
    margin:20px 0 20px 0;
`;

// aqui nao funciona, tem que aplicar a estilizacao no select 
const CustomSelect = styled.input.attrs({
	type: 'select'
})`
    display:block;
    border: solid 1px ${style.normalGreen};
    padding: 8px;
    border-radius: 5px;
`;

class Account extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            valueLang: '',
            valueTime: '',
            valueCurr: ''
        }

        this.handleLang = this.handleLang.bind(this)
        this.handleTime = this.handleTime.bind(this)
        this.handleCurr = this.handleCurr.bind(this)
    }

    handleLang = (event) => {
        // event.target.value
        this.setState = {
            ...this.state,
            'valueLang': event.target.value
        }
    }

    handleTime = (event) => {
        this.setState = {
            ...this.state,
            'valueTime': event.target.value
        }
    }

    handleCurr = (event) => {
        this.setState = {
            ...this.state,
            'valueCurr': event.target.value
        }
    }

    render() {
        return (
            <div>
                <Ct clWhite size={'1.6rem'} width={'100%'}>Definições regionais</Ct>
                <Ct clNormalGreen size={'1.2rem'} width={'100%'}>O idioma selecionado ...</Ct>

                <Row>
                    <Col s={12} m={4} l={4}> 
                        <Ct clWhite size={'1.2rem'} width={'100%'}>Idioma de interface</Ct>
                        <select 
                            value={this.state.valueLang} 
                            onchange={this.handleLang} >
                            <option value="pt-br">PT BRASIL</option>
                            <option value="en">ENGLISH</option>
                        </select>
                    </Col>
                    <Col s={12} m={4} l={4}> 
                        <Ct clWhite size={'1.2rem'} width={'100%'}>Fuso horário</Ct>
                        <select 
                            value={this.state.value} 
                            onchange={this.handleTime} >
                            <option value="-3:00">AMERICA / BELÉM UTC -3:00</option>
                        </select>
                    </Col>
                    <Col s={12} m={4} l={4}> 
                        <Ct clWhite size={'1.2rem'} width={'100%'}>Moeda de visualização</Ct>
                        <select 
                            value={this.state.value} 
                            onchange={this.handleCurr} >
                            <option value="BRL">BRL</option>
                            <option value="USD">USD</option>
                        </select>
                    </Col>
                </Row>
                <L />
                
                <Ct clWhite size={'1.6rem'} width={'100%'}>Endereço de e-mail <Ct clNormalGreen size={'1.6rem'}>dvs040404@gmail.com</Ct></Ct>
                
                <L />

                {/* <Ct clWhite size={'1.6rem'} width={'100%'}>Encerramento de <Ct clNormalGreen size={'1.6rem'}>conta</Ct></Ct>
                <Ct clWhite size={'1.6rem'} width={'100%'}>Você pode encerrar manualmente sua conta.<br/>
                Depois de encerrar sua conta, você não terá como iniciar uma sessão ou fazer transações.</Ct> */}
                
            </div>
        )
    }
}

export default Account