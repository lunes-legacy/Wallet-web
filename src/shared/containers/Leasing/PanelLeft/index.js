import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
import {connect} from 'react-redux'
import { TextBase, H1 } from "Components";

const StyledPanelLeft = styled.div`
    background: ${style.normalLilac};
    box-shadow: 30px 0 40px rgba(0,0,0,.09);
    color: #fff;
    height: 100%;
    max-width: 280px;
    min-width: 130px;
    position: relative;
    width: 30%;
    z-index: 2;
    position: relative;
    width: 31.66666%;
`;

const LeftHeader = styled.div`
  ${TextBase}
  display: flex;
  align-items: none;
  font-size: 1rem;
  letter-spacing: 1.3px;
  height: 8rem;
  padding-top: 1.4rem;
  padding-left: 1.4rem;
  width: 100%;

  @media (${style.media.tablet2}) {
    font-size: 1.2rem;
    padding-top: 1.4rem;
    padding-left: 2rem;
  }

  @media (${style.media.laptop}) {
    align-items: center;
    border-top: none;
    padding-top: 0;
    padding-bottom: 3rem;
  }

  @media (${style.media.desktop}) {
    padding-bottom: 1.4rem;
  }
`;

const LeftHeaderBg = styled.img`
  height: 5rem;
  left: 0;
  margin: 0;
  object-fit: cover;
  padding: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;

  @media (${style.media.tablet2}) {
    object-fit: content;
    height: auto;
  }
`;

const CardLeasing = styled.div`
  box-shadow: 0px 0px 10px rgba(0,0,0,.2);
  -moz-box-shadow: 0px 0px 10px rgba(0,0,0,.2);
  -webkit-box-shadow: 0px 0px 10px rgba(0,0,0,.2);

  border-radius: 4rem;
  padding: 3rem;
  margin: 2rem;
`;

const TextBalance = styled.text`
  ${TextBase}

`;

class PanelLeft extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <StyledPanelLeft>
                <LeftHeaderBg src="/img/app_wallet/rectangle-wallet.svg" />
                <LeftHeader txLight>LEASING LUNES</LeftHeader>

                <CardLeasing>
                        <span>Seu Saldo</span>
                        <TextBalance fontSize='3rem' clNormalGreen txBold>300000.000000</TextBalance>

                </CardLeasing>
            </StyledPanelLeft>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default PanelLeft;