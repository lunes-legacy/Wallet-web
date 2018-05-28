import React from 'react';
import style from 'Shared/style-variables';
import styled from 'styled-components';
import { errorPattern } from 'Utils/functions';
import { connect } from 'react-redux';
import { WalletClass } from 'Classes/Wallet';
//REDUX
import { setTxHistory } from 'Redux/actions';
//COMPONENTS
import { TextBase } from 'Components/TextBase';
import { Text } from 'Components/Text';
import { H1 } from 'Components/H1';
import { Col, Row } from 'Components/index';
//PRIVATE COMPONENTS
import Histories from './Histories';
import CoinControl from './CoinControl';
import CoinStatus from './CoinStatus';
import Default from './Default';

const TextBold = Text.extend`
	${TextBase}
	font-weight: bold;
	display: inline-block;
`;

const StyledPanelRight = styled.div`
	position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
  overflow-x: auto;
`;

class PanelRight extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tmpCount: 1
		}
	}
	handleToggleHistory = (event) => {
		let historyEl        = event.currentTarget.parentElement;
		let historyContentEl = historyEl.querySelector(':nth-child(2)');
		toggleScaleY({
			element: historyContentEl,
			visible: '1',
			hidden: '0'
		});
	}
	componentDidMount = async() => {
		this.props.setTxHistory({network: 'btc'});
	}
	render() {
		return (
			<StyledPanelRight>
				<CoinStatus/>

				<CoinControl/>

				<Histories/>
			</StyledPanelRight>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		wallet: state.component.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setTxHistory: (data) => {
			dispatch(setTxHistory(data));
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(PanelRight);
