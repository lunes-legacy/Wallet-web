require('dotenv').load();
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { users, coins } from 'lunes-lib';

// REDUX
import { connect } from 'react-redux';
import { setBalance } from 'Redux/actions';

//COMPONENTS
import Home from 'Containers/Home/index';
import Portfolio from 'Containers/Portfolio/index';
import Wallet from 'Containers/Wallet/index';
import Recharge from 'Containers/Recharge/index';
import Ticket from 'Containers/Ticket/index';
import Buy from 'Containers/Buy/index';
import Leasing from 'Containers/Leasing/index'
import Configuration from 'Containers/Configuration/index';
import Privacy from 'Containers/Privacy/index';

//SUB-COMPONENTS
import { TextBase } from 'Components/TextBase';
import { Text } from 'Components/Text';
import Header from './Header';
import PanelLeft from './PanelLeft';
import PanelRight from './PanelRight';
import { AuthRoute } from 'Components/AuthRoute';
// import { checkAuth }    from 'Auth/index';

import {numeral} from 'Utils/numeral';

// numeral.register('locale', 'pt-br', {
// 	delimiters: {
// 		thousands: '.',
// 		decimal: ','
// 	},
// 	abbreviations: {
//         thousand: 'mil',
//         million: 'mi',
//         billion: 'bi',
//         trillion: 'tri'
//     },
// 	currency: {
// 		symbol: 'R$'
// 	}
// });

let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;
let WrapApp = styled.div`
	width: 100%;
	height: 100vh;
	max-height: 100vh;
	max-width: 100vw;
	overflow: hidden;
	position: relative;

	// & > * {
	// 	overflow-y: auto;
	// }
`;
let WrapLogo = styled.div`
	padding: 2.4rem;
`;
let Logo = styled.img`
	width: 100px;
`;
let WrapBalance = styled.div`
	margin-left: auto;
	padding: 0 50px 0 50px;
`;
let Balance = styled.div`
	${TextBase}
`;


class App extends React.Component {
	constructor(props){
		super(props);
		numeral.locale(this.props.currencies.locale);
	}
	
	componentDidMount() {
		this.checkAccess();
		this.props.setBalance();
	}

	componentDidUpdate() {
		this.checkAccess();
	}

	checkAccess() {
		let walletInfo = localStorage.getItem('WALLET-INFO');
		let accessToken = localStorage.getItem('ACCESS-TOKEN');
		if (!walletInfo || !accessToken) {
			this.props.history.push('/');
		}
	}
	
	render() {
		return (
			<WrapApp>
				<Header>
					<WrapLogo>
						<Logo src={'/img/logo.svg'} />
					</WrapLogo>
					<WrapBalance>
						<Balance>
						<Text clWhite txLight txInline size={'1.8rem'}> Balance: </Text>
							<Text clNormalGreen txNormal txInline offSide size={'2.3rem'} >LNS </Text>
							<Text clWhite txNormal txInline offSide size={'2.0rem'}>{numeral(this.props.balance.LNS.total_confirmed).format('0,0.0000')}</Text>
						</Balance>
						<Text clNormalGreen txBold txRight size={'1.2rem'}>{numeral(this.props.balance.LNS.total_coin_dollar).format('$0,0.0000')}</Text>
					</WrapBalance>
				</Header>
				<Panels>
					<PanelLeft history={this.props.history} />

					<PanelRight>
						<Switch>
							<Route exact path={"/app/"} component={Home} />
							<Route exact path={"/app/home/"} component={Home} />
							<Route exact path={"/app/portfolio/"} component={Portfolio} />
							<Route exact path={"/app/wallet/"} component={Wallet} />
							<Route exact path={"/app/recharge/"} component={Recharge} />
							<Route exact path={"/app/ticket/"} component={Ticket} />
							<Route exact path={"/app/buy"} component={Buy} />
							<Route exact path={"/app/leasing"} component={Leasing} />
							<Route exact path={"/app/configuration"} component={Configuration} />
							<Route exact path={"/app/privacy"} component={Privacy} />
						</Switch>
					</PanelRight>
				</Panels>
			</WrapApp>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user, 
		currencies: state.currencies,
		balance: state.balance
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		userLogin: (email, password) => {
			dispatch({
				type: 'USER_LOGIN',
				payload: userLogin(email, password)
			});
		},
		setBalance: () => {
      dispatch(setBalance());
    }
	}
}
const userLogin = (email, password) => {
	return users.login({ email, password });
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
