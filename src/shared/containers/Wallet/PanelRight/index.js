import React from 'react';
import style from 'Shared/style-variables';
import styled from 'styled-components';
import { errorPattern } from 'Utils/functions';
import { connect } from 'react-redux';
import { WalletClass } from 'Classes/Wallet';
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
			coinHistory: undefined,
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
	getTransactionHistory  = async (coinName) => {
		let wallet      = new WalletClass;
		let coinHistory = await wallet.getHistory({coin: coinName, address: 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH'});
		if (coinHistory) {
			this.props.setCoinHistory(coinHistory);
		}
	}
	componentDidMount = async() => {
	}
	render() {
		if (!this.props.wallet.panelRight.coinName) {
			console.warn("components/Wallet -> this.props.wallet.panelRight.coinName não existe ou está undefined");
			return <Default/>;
		}
		this.getTransactionHistory(this.props.wallet.panelRight.coinName);
		/*
			coinPrice: {BRL: '31.000,00', USD: '7.600,00'}
			coiName: 'btc' || 'ltc' || 'eth'
			status: 'open' || 'closed' (status of this panel, hidden or visible)
		*/
		// let { coinPrice, coinName, status } = this.props.wallet.panelRight;
		// // if (!coinPrice || !coinName || status !== 'open')
		// if (!coinPrice || !coinName)
		// 	console.warn("Variaveis existem mas alguma está undefined");
		// 	return <Default/>;

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
		wallet: state.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setCoinHistory: (coinHistory) => {
			dispatch({
				type: 'WALLET_SET_COIN_HISTORY',
				payload: coinHistory
			});
		}
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(PanelRight);
