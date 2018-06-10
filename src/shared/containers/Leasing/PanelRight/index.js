import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
import {connect} from 'react-redux'
import { TextBase, H1 } from "Components";
//import {ButtonGreen} from "Components/Buttons";
import { Col, Row } from 'Components/index';

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

const CancelText = styled.div`
    ${TextBase}
    font-size: 1.2rem;
    display:block;
    cursor: pointer;

    &:hover {
        color: ${style.normalRed};
    }

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

const BoxLineLeasing = Row.extend`
    margin-bottom:20px; 
    border-bottom: solid 1px ${style.normalLilac3};
    padding-top:20px;
    padding-bottom:20px;

    &:last-child {
        border-bottom: none;
    }
`;

// const RowCardText = styled.div`
//   ${TextBase}
  
//   display:block;
//   font-size:1rem;

//   @media (${style.media.mobile}) {
//     width:100%
//     text-align:left;
//   }
  
//   @media (${style.media.tablet}) {
    
//   }

//   @media (${style.media.laptop}) {
//     width:50%;

//     ${props => {
//       if(props.alignRight){
//         return `text-align: right`;
//       }else{
//         return `text-align: default;`;
//       }
//     }};
//   }

// `;

class PanelRight extends React.Component {
    constructor(props){
        super(props)
    }

    // retornando o botao de cancelar, com condicional de status
    _buttonCancel = status => {
        if(status){
            return (
                <CancelText clNormalGreen txCenter status={status} onClick={()=>{}}>
                    <Icon src={'/img/leasing_panel_right/icon-power.svg'} /><br/>
                    CANCELAR
                </CancelText>
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
        let leasings = [{status:true},{status:true},{status:false},{status:false},{status:true},{status:true},{status:false}];

        return leasings.map((obj, key) => {
            return (
                <BoxLineLeasing key={key} >
                    <Col s={12} m={6} l={6}>
                        <DateText clWhite status={obj.status}>16:23, 12 dec 2018</DateText>
                        <HashText clWhite txBold status={obj.status}>1PRj85hu9RXPZTzxtko9stfs6nRo1vyrQB</HashText>
                    </Col>
                    <Col s={12} m={4} l={4}>
                        <GreenText clNormalGreen txBold txCenter status={obj.status}>300000.00000000 LNS</GreenText>
                    </Col>
                    <Col s={12} m={2} l={2}>
                        {this._buttonCancel(obj.status)} 
                    </Col>
                </BoxLineLeasing>
            );
        });
    }

    // o componente
    render() {
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