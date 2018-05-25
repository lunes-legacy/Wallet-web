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
`;

const CustomLink = styled(TmpLink)`
	${TextBase};
  color: white;
	line-height: 25px;
  text-decoration: none;
  transition-delay: .2s;
  display: flex;
  align-items: center;
`;

const CustomText = styled.div`
  ${TextBase};
  margin-left: 1rem;
  display: none;

  @media (${styles.media.tablet2}) {
    display: inline-block;
  }
`;

class PanelLeft extends React.Component {
	render() {
		return(
      <StyledPanelLeft>
        <WrapLink>
					<CustomLink to={"/app/home"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Home"/>
            <CustomText size={'1.4rem'}>Home</CustomText>
          </CustomLink>
				</WrapLink>
				<WrapLink>
					<CustomLink to={"/app/portfolio"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Portfólio"/>
            <CustomText size={'1.4rem'}>Portfólio</CustomText>
          </CustomLink>
				</WrapLink>
				<WrapLink>
					<CustomLink to={"/app/wallet"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Wallet"/>
            <CustomText size={'1.4rem'}>Wallet</CustomText>
          </CustomLink>
				</WrapLink>
				<WrapLink>
					<CustomLink to={"/app/recharge"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Recargas"/>
            <CustomText size={'1.4rem'}>Recargas</CustomText>
          </CustomLink>
				</WrapLink>
				<WrapLink>
					<CustomLink to={"/app/ticket"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Boleto"/>
            <CustomText size={'1.4rem'}>Boleto</CustomText>
          </CustomLink>
        </WrapLink>
        <WrapLink>
					<CustomLink to={"/app/buy"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Compras"/>
            <CustomText size={'1.4rem'}>Compras</CustomText>
          </CustomLink>
        </WrapLink>
        <WrapLink>
					<CustomLink to={"/app/configuration"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Configuração"/>
            <CustomText size={'1.4rem'}>Configuração</CustomText>
          </CustomLink>
        </WrapLink>
        <WrapLink>
					<CustomLink to={"/app/privacy"}>
            <Icon src={'/img/app_panel_left/fake.png'} alt="Privacidade"/>
            <CustomText size={'1.4rem'}>Privacidade</CustomText>
          </CustomLink>
				</WrapLink>
			</StyledPanelLeft>
		);
	}
}

export default PanelLeft;
