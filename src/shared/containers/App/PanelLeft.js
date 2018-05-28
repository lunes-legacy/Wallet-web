import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';

import { Link as TmpLink } from 'react-router-dom';
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

  opacity: .2;

  &.Active {
    opacity: 1;
  }
`;

const CustomText = styled.div`
  ${TextBase};
  margin-left: 1rem;
  display: none;
  font-weight: 700;
  transition: .2s;

  opacity: .3;

  @media (${styles.media.tablet2}) {
    display: inline-block;
  }

  &.Active {
    opacity: 1;
  }
`;

const CustomLink = styled(TmpLink)`
	${TextBase};
  color: white;
	line-height: 25px;
  text-decoration: none;
  transition-delay: .2s;
  display: flex;
  align-items: center;

  &:hover ${Icon} {
    opacity: 1;
  }

  &:hover ${CustomText} {
    opacity: 1;
  }
`;



class ItemMenuApp extends React.Component {
  render(){
    let className = '';
    if(this.props.active){
      className = 'Active'
    }
    return (
      <div>
        <WrapLink>
          <CustomLink to={this.props.to} >
            <Icon src={'/img/app_panel_left/'+this.props.icon} alt={this.props.label} className={className} />
            <CustomText size={'1.4rem'} className={className}>{this.props.label}</CustomText>
          </CustomLink>
        </WrapLink>
      </div>
    )
  }
}


class PanelLeft extends React.Component {
	render() {
		return(
      <StyledPanelLeft>

        <ItemMenuApp label="Home"           to="/app/home"            icon="ic_home.svg" />
        <ItemMenuApp label="Portfólio"      to="/app/portfolio"       icon="ic_portfolio.svg" />
        <ItemMenuApp label="Wallet"         to="/app/wallet"          icon="ic_wallet.svg" />
        <ItemMenuApp label="Recargas"       to="/app/recharge"        icon="ic_recharge.svg" />
        <ItemMenuApp label="Boleto"         to="/app/ticket"          icon="ic_barcode.svg" />
        <ItemMenuApp label="Compras"        to="/app/buy"             icon="ic_buy.svg" />
        <ItemMenuApp label="Configuração"   to="/app/configuration"   icon="ic_config.svg" />
        <ItemMenuApp label="Privacidade"    to="/app/privacy"         icon="ic_privacy.svg" />

			</StyledPanelLeft>
		);
	}
}

export default PanelLeft;
