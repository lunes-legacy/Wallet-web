import React from 'react'
import styled from 'styled-components'
import style from 'Shared/style-variables'
import { connect } from 'react-redux'
import { TextBase, H1 } from "Components";
import { ButtonGreen } from "Components/Buttons";
import { numeral } from 'Utils/numeral';
import ModalLeasing from "../modal/index";
import { LeasingClass } from 'Classes/Leasing';

const ModalStyle = styled.div`
   display: none;
`;

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
    letter-spacing: .3px;
`;

const LeftHeader = styled.div`
  ${TextBase}
  background-image: url('/img/app_wallet/rectangle-wallet.svg');
  background-repeat: no-repeat;
  letter-spacing: 1.3px;
  display: flex;


  @media (${style.media.mobile}) {
    font-size: 1.2rem;
    padding-top: 1.4rem;
    padding-left: 2rem;
    padding-right: 2rem;
    //background-size: 110% 100%;
    background-size: cover;
    background-position: -5px -5px;
    height: 70px;
  }

  @media (${style.media.tablet}) {
    font-size: 1.5rem;
    padding-top: 2.3rem;
    padding-left: 2.5rem;
    height: 90px;
  }

  @media (${style.media.laptop}) {
    background-size: cover;
  }
`;

const CardLeasing = styled.div`
  box-shadow: 0 2px 12px 9px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 2px 12px 9px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 2px 12px 9px rgba(0, 0, 0, 0.05);

  border-radius: 1.5rem;
  padding: 1.5rem;
  padding-bottom: 0px;
  margin: 1.5rem;
`;

const TextBalance = styled.text`
  ${TextBase}
  display: block;
  text-align:right;
  margin-top: 1.5rem;
  letter-spacing: .6px;
  font-weight: bold;
  font-size: 1.4rem;

  @media (${style.media.tablet2}) {
    font-size: 2rem;
  }

  @media (${style.media.desktop}) {
    font-size: 2.5rem;
  }
`;

const LabelBalance = styled.text`
  ${TextBase}
  display:block;
  text-align:right;
  margin-bottom:3rem;
`;

const RowCardBalance = styled.div`
  display: flex;
  flex-flow: row wrap;
  border-top: solid 1px ${style.normalLilac3};
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  margin-left:-1.5rem;
  margin-right:-1.5rem;
`;

const RowCardText = styled.div`
  ${TextBase}
  font-weight: bold;
  display:block;
  font-size:1rem;

  @media (${style.media.mobile}) {
    width:100%
    text-align:left;
  }

  @media (${style.media.tablet}) {

  }

  @media (${style.media.laptop}) {
    width:50%;

    ${props => {
    if (props.alignRight) {
      return `text-align: right`;
    } else {
      return `text-align: default;`;
    }
  }};
  }

`;

class PanelLeft extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      totalBalance: 0,
      leaseBalance: 0,
      availableBalance: 0
    }
  }

  componentDidMount() {
    const leasing = new LeasingClass();
    leasing.getLeasingValues()
      .then(balances => {
        if (balances.code) {
          throw balances;
        }

        this.setState(balances)
      }).catch(err => console.error(err));
  }

  handleModal = () => {
    let modalClass = document.querySelector(".modal-status");
    return modalClass.style.display = "block";
  }

  render() {
    return (
      <StyledPanelLeft>
        <LeftHeader txLight>LEASING LUNES</LeftHeader>
        <CardLeasing>
          <RowCardText>Available balance</RowCardText>
          <TextBalance clNormalGreen txBold>{this.state.availableBalance}</TextBalance>
          <LabelBalance fontSize='1rem' txBold>LNS</LabelBalance>

          <RowCardBalance>
            <RowCardText>Leasing balance</RowCardText>
            <RowCardText alignRight>{this.state.leaseBalance}</RowCardText>
          </RowCardBalance>
          <RowCardBalance>
            <RowCardText>Total balance</RowCardText>
            <RowCardText alignRight>{this.state.totalBalance}</RowCardText>
          </RowCardBalance>
        </CardLeasing>

        <ButtonGreen width="70%" margin={"3rem auto 0px auto"} fontSize={'1rem'} onClick={this.handleModal}>START LEASING</ButtonGreen>
        <ModalStyle className={"modal-status"}>
          <ModalLeasing />
        </ModalStyle>
      </StyledPanelLeft>
    );
  }
}

export default PanelLeft;
