import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
import {connect} from 'react-redux'
import { TextBase, H1 } from "Components";
//import {ButtonGreen} from "Components/Buttons";
import { Col, Row } from 'Components/index';

import { encrypt } from '../../../utils/crypt';
// import { LeasingClass } from 'Classes/LeasingClass'; // refatorar para usar a classe
import { coins } from 'lunes-lib';

const StyledPanelRight = styled.div`
    position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
    overflow-x: auto;
    letter-spacing: .3px;
`;

const LabelBalance = styled.text`
  ${TextBase}
  display:block;
  text-align:right;
  margin-bottom:3rem;
`;

const ContentList = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  border-radius: 1.5rem;
  padding: 1.5rem;
  margin: 1.5rem;
  margin-bottom: 180px;
`;

const HeaderRow = Row.extend`
    ${TextBase}
    padding: 3rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
`;

const DateText = styled.div`
    ${TextBase}
    font-size: 1rem;
    display:block;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const HashText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;
    margin-top: .5rem;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const GreenText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const CancelBox = styled.div`
    &:hover {
        filter: hue-rotate(260deg) saturate(8);
        -webkit-filter: hue-rotate(260deg) saturate(8);
    }
`;

const CancelText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;
    cursor: pointer;

    ${props => {
        if(!props.status){
            return `color: ${style.lightPurple}`;
        }
    }};
`;

const Icon = styled.img`
	width: 25px;
    height: 25px;
`;

const IconActive = styled.div`
    background-image: url(/img/leasing_panel_right/icon-power.svg);
    backrgound-repeat: no-repeat;
    background-size: cover;

	width: 25px;
    height: 25px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:-10px;

    -webkit-animation: rotation 5s infinite linear;
    -moz-animation: rotation 5s infinite linear;
    animation: rotation 5s infinite linear;

    @-webkit-keyframes rotation {
        from { -webkit-transform: rotate(0deg); }
        to {-webkit-transform: rotate(359deg); }
    }

    @-moz-keyframes rotation {
        from { -moz-transform: rotate(0deg); }
        to { -moz-transform: rotate(359deg); }
    }

    @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(359deg); }
    }

`;

const BoxLineLeasing = Row.extend`
    margin-bottom:20px;
    border-bottom: solid 1px ${style.normalLilac3};
    padding-top:20px;
    padding-bottom:20px;

    &:last-child {
        border-bottom: none;
    }
`;

class PanelRight extends React.Component {
    constructor(props){
        super(props)
        this.listLeasing = []
    }

    // consulta de leasing
    componentDidMount = async () => {
        // fazer a chamada da classe Leasing
        // let leasing = new LeasingClass()
        // let retorno = leasing.getLeaseHistory() // chamada para teste
        let Leasing = await coins.services.leaseHistory({
            address: '37aF3eL4tsZ6YpqViXpYAmRQAi7ehtDdBmG',
            network: 'LNS',
            testnet: true
        }).then((e)=>{
            this.listLeasing = e
        }); 
        // passar os dados criptografados (verificar em privacy/rescue.js)

        // validar se voltou alguma coisa


        // se voltou iterar

        // se nao voltou mostrar mensagem de vazio
    }

    // normalizar status do leasing, que hoje é 8 ou 9
    _normalizeStatus = status => {
        if(status===8){
            return true
        }else{
            return false
        }
    }

    // retornando o botao de cancelar, com condicional de status
    _buttonCancel = status => {
        if(status){
            return (
                <CancelBox>
                    <CancelText clNormalGreen txCenter status={status} onClick={()=>{}}>
                        <IconActive /><br/>
                        CANCELAR
                    </CancelText>
                </CancelBox>
            );
        }else{
            return (
                <CancelText clNormalRed txCenter status={status} onClick={()=>{}}>
                    <Icon src={'/img/leasing_panel_right/icon-power-off.svg'} /><br/>
                    CANCELADO
                </CancelText>
            );
        }
    }

    // retornando os itens, de acordo com os dados no storage
    _renderLeasings = () => {
        // aqui, crio um vetor de objs pra ilustrar os dados carregados
        // usando status apenas para diferenciar o estado de um registro
        //let leasings = [{status:true},{status:false},{status:true},{status:true},{status:true},{status:true},{status:true}];

        return this.listLeasing.map((obj, key) => {
            return (
                <BoxLineLeasing key={obj.txid} >
                    <Col s={12} m={6} l={6}>
                        <DateText clWhite status={this._normalizeStatus(obj.otherParams.type)}> {Date.parse(obj.date)} </DateText>
                        <HashText clWhite txBold status={this._normalizeStatus(obj.otherParams.type)}> {obj.txid} </HashText>
                    </Col>
                    <Col s={12} m={4} l={4}>
                        <GreenText clNormalGreen txBold txCenter status={this._normalizeStatus(obj.otherParams.type)}> {obj.networkAmount} LNS</GreenText>
                    </Col>
                    <Col s={12} m={2} l={2}>
                        {this._buttonCancel(this._normalizeStatus(obj.otherParams.type))}
                    </Col>
                </BoxLineLeasing>
            );
        });
    }

    // o componente
    render() {
        console.log(this.listLeasing);
        return (
            <StyledPanelRight>
                {/* header da tabela */}
                <HeaderRow>
                    <Col s={12} m={6} l={6}>
                        Leasing Transactions
                    </Col>
                    <Col s={12} m={4} l={4} css={`text-align:center;`}>
                        Emprestado
                    </Col>
                    <Col s={12} m={2} l={2} css={`text-align:center;`}>
                        Status
                    </Col>
                </HeaderRow>

                {/* content da tabela */}
                <ContentList>
                    {this._renderLeasings()}
                </ContentList>
            </StyledPanelRight>
        );
    }
}

// aplicar redux

export default PanelRight;
