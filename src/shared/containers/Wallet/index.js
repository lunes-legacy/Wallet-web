import React           from 'react';
import ReactDOM        from 'react-dom';
import styled          from 'styled-components';
import style           from 'Shared/style-variables';
import sb              from 'satoshi-bitcoin';
import { connect }     from 'react-redux';
import { coins }       from 'lunes-lib';
import CookieClass     from 'Classes/Cookie';
import { WalletClass } from 'Classes/Wallet';
import UserClass       from 'Classes/User';

//COMPONENTS
import { TextBase }    from 'Components/TextBase';
import { Text }        from 'Components/Text';
import { Loading }     from 'Components/Loading';
//PRIVATE COMPONENTS
import PanelLeft       from './PanelLeft/index';
import PanelRight      from './PanelRight/index';

//______INDEX
let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
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
	componentDidMount = async () => {
		let cookies = new CookieClass;
	    // let user    = cookies.get('user').user.toString();
		let userObj = new UserClass;
		let user    = await userObj.login({email: '', password: ''});

		console.log(user, "containers/Wallet -> USER");
		if (!user) { return; }

		let wallet = new WalletClass;
		let balance;
		try {
			balance = await wallet.getBalance(user);
		} catch(e) {
			console.error(e, "containers/Wallet componentDidMount error");
			return;
		}
		let coinsPrice = await wallet.getCoinsPrice();
		console.log(coinsPrice, "COINS PRICE <><><><><><<><><><><><><><><><><");

		this.props.setBalance({balance, coinsPrice});
	}


	render() {
		return(
			<Panels>
				<PanelLeft/>
				
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
