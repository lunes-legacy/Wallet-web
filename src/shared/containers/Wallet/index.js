import React           from 'react';
import ReactDOM        from 'react-dom';
import styled          from 'styled-components';
import style           from 'Shared/style-variables';
import sb              from 'satoshi-bitcoin';
import { connect }     from 'react-redux';
import { coins }       from 'lunes-lib';
import CookieClass     from 'Classes/Cookie';
import { toggleScaleX, toggleWidth } from 'Utils/ui';
import { WalletClass } from 'Classes/Wallet';
import UserClass       from 'Classes/User';


//COMPONENTS
import { TextBase }    from 'Components/TextBase';
import { Text }        from 'Components/Text';
import { Loading }     from 'Components/Loading';
//PRIVATE COMPONENTS
import PanelRight      from './PanelRight/index';
import Coins           from './Coins/index';


//______INDEX
let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;
let PanelLeft = styled.div.attrs({
	state: 'visible'
})`
	background: ${style.normalLilac};
	max-width: 90%;
	height: 100%;
	box-shadow: 30px 0 40px rgba(0,0,0,.2);
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
	visibility: visible!important;
`;



class Wallet extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: undefined,
			myCoins: undefined,
			coinsPrice: undefined
		};
	}
	setBalance = () => {

	}
	componentDidMount = async () => {
		let cookies = new CookieClass;
		let user    = cookies.getCookie('user').user;
		// let userObj = new UserClass;
		// let user    = await userObj.login({email: '', password: ''});
		if (!user) {
			return;
		}
		let wallet     = new WalletClass;
		let balance;
		try {
			balance = await wallet.getBalance(user);
		} catch(e) {
			console.log(e);
			return;
		}
		let coinsPrice = wallet.coinsPrice;

		this.props.setBalance({balance, coinsPrice});
	}
	handleTogglePanelLeft = (event) => {
		let panelLeftEl = event.currentTarget.parentElement;
		toggleWidth({
			element: panelLeftEl,
			visible: '31.6666%',
			hidden: '0px'
		});
	}

	render() {
		let { coinsPrice, balance, status } = this.props.wallet.panelLeft;
		return(
			<Panels>
				<PanelLeft>
					<TogglePanelLeft onClick={this.handleTogglePanelLeft}/>
					<Coins balance={balance} coinsPrice={coinsPrice}/>
				</PanelLeft>

				{/*<div className={"wrap-right-panel"}></div>*/}
				<PanelRight/>
			</Panels>
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
		setBalance: ({ balance, coinsPrice }) => {
			dispatch({
				type: 'WALLET_SET_BALANCE',
				payload: { balance, coinsPrice }
			});
		},
		togglePanelLeft: ({status}) => {
			dispatch({
				type: 'WALLET_TOGGLE_PANEL_LEFT',
				payload: status
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
