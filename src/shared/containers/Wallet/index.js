import React           from 'react';
import ReactDOM        from 'react-dom';
import styled          from 'styled-components';
import style           from 'Shared/style-variables';
import { connect }     from 'react-redux';
import CookieClass     from 'Classes/Cookie';
import { WalletClass } from 'Classes/Wallet';
import UserClass       from 'Classes/User';
import { ENV } from 'Config/constants';
//REDUX
import { 
	setBalance, 
	togglePanelLeft, 
	setCryptoPrice } from 'Redux/actions';

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
		let Cookies = new CookieClass;
		let User    = new UserClass;
		let user;
	    let cookie = Cookies.get('user');
	    try {
	    	if (!cookie)
	    		throw errorPattern('WALLET ERROR',500,'WALELT ERROR');
	    	user = JSON.parse(cookie.user.toString());
	    } catch(err) {
			user    = await User.login();
			console.error(err, "WALLET_ERROR");
	    }
		// if (typeof user == 'object' && Object.keys(user).length < 1) {
		// }
		console.warn(user, "__WALLET USER__");

		if (!user) { return; }

		let wallet     = new WalletClass;
		let balance    = await wallet.getBalance(user);
		let coinsPrice = await wallet.getCoinsPrice();
		
		if (ENV !== 'development') {
			this.props.setBalance(balance);
			this.props.setCryptoPrice(coinsPrice);
		}
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
		setBalance: (data) => {
			dispatch(setBalance(data));
		},
		setCryptoPrice: (data) => {
			dispatch(setCryptoPrice(data));
		},
		togglePanelLeft: () => {
			dispatch(togglePanelLeft());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
