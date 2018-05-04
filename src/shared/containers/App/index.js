require('dotenv').load();
import React, { PropTypes } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect }          from 'react-redux';
import { errorPattern }     from 'Utils/functions';
import styled               from 'styled-components';
import { users }            from 'lunes-lib';
import { createBrowserHistory } from 'history';

//COMPONENTS
import Login            from 'Containers/User/Login/index';
import Portfolio        from 'Containers/Portfolio/index';
import Wallet           from 'Containers/Wallet/index';
import Ticket           from 'Containers/Ticket/index';
import Recharge         from 'Containers/Recharge/index';
//SUB-COMPONENTS
import { Link }         from 'Components/Link';
import { TextBase }     from 'Components/TextBase';
import { Text }         from 'Components/Text';
import Header           from './Header';
import PanelLeft        from './PanelLeft';
import PanelRight       from './PanelRight';
import { AuthRoute }    from 'Components/AuthRoute';
// import { checkAuth }    from 'Auth/index';

let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-flow: wrap;

	@media (min-width: 768px) {
		flex-flow: nowrap;
	}
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
	padding: 0 50px 0 50px;
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
	componentDidMount() {
	}
	componentDidUpdate() {
	}
	render() {
		return(
			<WrapApp>
				<Header>
					<WrapLogo>
						<Logo src={'/img/logo.svg'}/>
					</WrapLogo>
					<WrapBalance>
						<Balance>
							<Text clWhite txLight txInline >Balance: </Text>
							<Text clNormalGreen txBold txInline >LNS </Text> 
							<Text clWhite txBold txInline >1,300.00</Text>
						</Balance>
						<Text clNormalGreen txBold txRight size={'1.6rem'}>$ 130.00</Text>
					</WrapBalance>
				</Header>
				<Panels>
					<PanelLeft/>
					
					<PanelRight>
						<Switch>
							<Route exact path={"/app/"} component={Portfolio}/>
							<Route exact path={"/app/portfolio/"} component={Portfolio}/>
							<Route exact path={"/app/wallet/"} component={Wallet}/>
							<Route exact path={"/app/recharge/"} component={Recharge}/>
							<Route exact path={"/app/ticket/"} component={Ticket}/>
						</Switch>
					</PanelRight>
				</Panels>
			</WrapApp>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		userLogin: (email, password) => {
			dispatch({
				type: 'USER_LOGIN',
				payload: userLogin(email, password)
			});
		}
	}
}
const userLogin = (email, password) => {
	return users.login({email, password});
}

export default connect(mapStateToProps, mapDispatchToProps)(App);