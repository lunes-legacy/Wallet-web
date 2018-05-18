import React from 'react';
import styled from 'styled-components';
import styles from 'Shared/style-variables';

import { Link as TmpLink } from 'react-router-dom';
import { TextBase } from 'Components/TextBase';

let StyledPanelLeft = styled.div`
	width: 160px;
	min-width: 160px;
	height: 100%;
	display: block;
	background: ${styles.normalLilac2};
	z-index: 3;
	padding: 15px 0 0 20px;
`;
let WrapLink = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 35px 0 0 0;
`;
let Icon = styled.img`
	width: 25px;
	height: 25px;
	display: block;
`;
let CustomLink = styled(TmpLink)`
	${TextBase};
	line-height: 25px;
	text-decoration: none;
	color: white;
`;

class PanelLeft extends React.Component {
	render() {
		return(
			<StyledPanelLeft>
				<WrapLink>
					<Icon src={'/img/app_panel_left/fake.png'}/>
					<CustomLink to={"/app/portfolio"} size={'1.5rem'} >Portfolio</CustomLink>
				</WrapLink>
				<WrapLink>
					<Icon src={'/img/app_panel_left/fake.png'}/>
					<CustomLink to={"/app/wallet"} size={'1.5rem'} >Wallet</CustomLink>
				</WrapLink>
				<WrapLink>
					<Icon src={'/img/app_panel_left/fake.png'}/>
					<CustomLink to={"/app/recharge"} size={'1.5rem'} >Recargas</CustomLink>
				</WrapLink>
				<WrapLink>
					<Icon src={'/img/app_panel_left/fake.png'}/>
					<CustomLink to={"/app/ticket"} size={'1.5rem'} >Boleto</CustomLink>
				</WrapLink>
			</StyledPanelLeft>
		);
	}
}

export default PanelLeft;
