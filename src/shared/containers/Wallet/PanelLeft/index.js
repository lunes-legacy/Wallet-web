import React from 'react';
import { toggleWidth, toggleArrowIcon } from 'Utils/ui';
import styled from 'styled-components';
import style from 'Shared/style-variables';

import { connect } from "react-redux";
import { togglePanelLeft } from 'Redux/actions';
import { ErrorBoundary } from 'Components';
//PRIVATE COMPONENTS
import Coins from './Coins';

let StyledPanelLeft = styled.div.attrs({
	state: 'visible'
})`
background: ${style.normalLilac};
box-shadow: 30px 0 40px rgba(0,0,0,.09);
color: #fff;
height: 100%;
max-width: 280px;
min-width: 130px;
position: relative;
width: 30%;
height: 100vh;
z-index: 2;
position: relative;
width: 31.66666%;

transform-origin: left;
transform: scaleX(1);
opacity: 1;

// transition: transform 0.3s, opacity 0.5s;
transition: width .3s, max-width .5s;
`;

let TogglePanelLeft = styled.div`
background-color: ${style.normalLilac};
border-top-right-radius: 10px;
border-bottom-right-radius: 10px;
bottom: calc(50% - 30px);
box-shadow: 5px 0px 5px 0px rgba(51,51,51,0.3);
cursor: pointer;
height: 50px;
position: absolute;
right: -20px;
transition: .3s ease;
visibility: visible !important;
width: 20px;
`;

let Icon = styled.div.attrs({
	direction: 'right'
})`
border-left: 2px solid #fff;
border-top: 2px solid #fff;
height: 10px;
left: 5px;
position: relative;
top: calc(50% - 7px);
transform: rotate(-45deg);
transition: .1s linear;
width: 10px;
`;

class PanelLeft extends React.Component {
	constructor(props){
		super(props);
	}

	_showPanel = () => {
		let panelLeftEl = document.getElementById("myPanelLeft");

		toggleWidth({
			element: panelLeftEl,
			visible: '30%',
			hidden: '0px'
		});

	    // this._toggleIcon();
	}

	_toggleIcon = () => {
		const icon = document.querySelector('#arrowIcon');

		toggleArrowIcon({
			element: icon
		});
	}

	componentDidMount = () => {
		if (this.props.wallet.panelLeft.status === "closed") {
			this._showPanel();
			this._toggleIcon();
		}
	}

	componentWillUpdate = () => {
		// use condition storage or function toggleWidth ?
		this._showPanel();
		this._toggleIcon();
	}

	render() {
		return (
			<StyledPanelLeft id="myPanelLeft">
				<TogglePanelLeft>
					<Icon id="arrowIcon"/>
				</TogglePanelLeft>
				<Coins/>
			</StyledPanelLeft>
		);
	}
}

const mapStateToProps = state => {
	return {
		wallet: state.wallet
	}
}

const mapDispatchToProps = dispatch => {
	return {
		togglePanelLeft: () => {
			dispatch(togglePanelLeft());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PanelLeft);
//export default PanelLeft;
