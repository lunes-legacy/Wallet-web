import React from 'react';
import { toggleWidth } from 'Utils/ui';
import styled from 'styled-components';
import style from 'Shared/style-variables';

import {connect} from "react-redux";
import {togglePanelLeft} from 'Redux/actions';

//PRIVATE COMPONENTS
import Coins from './Coins';

let StyledPanelLeft = styled.div.attrs({
	state: 'visible'
})`
	background: ${style.normalLilac};
  	box-shadow: 30px 0 40px rgba(0,0,0,.09);
  	color: #fff;
	max-width: 280px;
  	min-width: 130px;
	position: relative;
  	width: 30%;
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
	}

	componentDidMount = () => {
		if(this.props.wallet.panelLeft.status==="closed"){
			this._showPanel();
		}
	}
	
	componentWillUpdate = () => {
		// use condition storage or function toggleWidth ?
		this._showPanel();
	}

	render(){
		return(
			<StyledPanelLeft id="myPanelLeft">
				<TogglePanelLeft onClick={()=>this.props.togglePanelLeft()} />
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
