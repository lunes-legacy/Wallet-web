import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;
let PanelLeft = styled.div`
	background: ${style.lightLilac};
	width: 30%;
	height: 100%;
	box-shadow: 30px 0 40px rgba(0,0,0,.2);
	z-index: 2;
`;
let PanelRight = styled.div`
	width: 70%;
	height: 100%;
	background: dodgerblue;
	z-index: 1;
`;

export default class Wallet extends React.Component {
	render() {
		return(
			<Panels>
				<PanelLeft></PanelLeft>
				<PanelRight></PanelRight>
			</Panels>
		);
	}
}