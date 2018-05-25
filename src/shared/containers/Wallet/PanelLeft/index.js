import React from 'react';
import { toggleWidth } from 'Utils/ui';
import styled from 'styled-components';
import style from 'Shared/style-variables';

//PRIVATE COMPONENTS
import Coins from './Coins';

let StyledPanelLeft = styled.div.attrs({
	state: 'visible'
})`
	background: ${style.normalLilac};
  box-shadow: 30px 0 40px rgba(0,0,0,.2);
  color: #fff;
	height: 100%;
	max-width: 280px;
  min-width: 130px;
	position: relative;
  width: 30%;
	z-index: 2;

	transform-origin: left;
	transform: scaleX(1);
	opacity: 1;

	// transition: transform 0.3s, opacity 0.5s;
	transition: width .3s, max-width .5s;
`;
let TogglePanelLeft = styled.div`
	position: absolute;
	right: -25px;
	bottom: 50%;
	width: 25px;
	height: 25px;
	background: white;
	cursor: pointer;
	visibility: visible !important;
`;

class PanelLeft extends React.Component {
	handleTogglePanelLeft = (event) => {
		let panelLeftEl = event.currentTarget.parentElement;
		toggleWidth({
			element: panelLeftEl,
			visible: '30%',
			hidden: '0px'
		});
	}
	render(){
		return(
			<StyledPanelLeft>
				<TogglePanelLeft onClick={this.handleTogglePanelLeft}/>
				<Coins/>
			</StyledPanelLeft>
		);
	}
}

export default PanelLeft;
