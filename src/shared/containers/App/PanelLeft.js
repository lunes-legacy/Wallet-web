import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';
import { NavLink as TmpLink } from 'react-router-dom';
import { TextBase } from 'Components/TextBase';

const StyledPanelLeft = styled.div`
  width: 65px;
  min-width: 65px;
	height: 100%;
	display: block;
	background: ${styles.normalLilac2};
	z-index: 3;
  padding-left: 1.5rem;
  transition: .2s ease-in;

  @media (${styles.media.tablet2}) {
    width: 160px;
  }
`;

const WrapLink = styled.div`
  display: flex;
  flex-wrap: nowrap;
	justify-content: flex-start;
  margin: 1rem 0;
  padding: 1rem 0;
	width: 100%;
`;

const Icon = styled.img`
	width: 25px;
	height: 25px;
  transition: .2s;
`;

const CustomText = styled.div`
  ${TextBase};
  margin-left: 1rem;
  display: none;
  font-weight: 700;
  transition: .2s;

  @media (${styles.media.tablet2}) {
    display: inline-block;
  }
`;

const CustomLink = styled(TmpLink) `
	${TextBase};
  color: white;
	line-height: 25px;
  text-decoration: none;
  transition-delay: .2s;
  display: flex;
  align-items: center;
  transition: .2s;
  opacity: 0.3;
  
  &:hover {
    opacity: 1;
  }

  &.active {
    opacity: 1;
  }
`;



class ItemMenuApp extends React.Component {
  render() {
    return (
      <div>
        <WrapLink>
          <CustomLink  {...this.props}>
            <Icon src={'/img/app_panel_left/' + this.props.icon} alt={this.props.label} />
            <CustomText size={'1.4rem'} >{this.props.label}</CustomText>
          </CustomLink>
        </WrapLink>
      </div>
    )
  }
}


class PanelLeft extends React.Component {
  render() {
    return (
      <StyledPanelLeft>
        <ItemMenuApp
          label="Home"
          to="/app/home"
          icon="ic_home.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Portfólio"
          to="/app/portfolio"
          icon="ic_portfolio.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Wallet"
          to="/app/wallet"
          icon="ic_wallet.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Recargas"
          to="/app/recharge"
          icon="ic_recharge.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Boleto"
          to="/app/ticket"
          icon="ic_barcode.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Compras"
          to="/app/buy"
          icon="ic_buy.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Configuração"
          to="/app/configuration"
          icon="ic_config.svg"
          activeClassName="active" />

        <ItemMenuApp
          label="Privacidade"
          to="/app/privacy"
          icon="ic_privacy.svg"
          activeClassName="active" />
      </StyledPanelLeft>
    );
  }
}

export default PanelLeft;
