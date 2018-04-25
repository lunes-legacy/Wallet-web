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
//SUB-COMPONENTS
import { Link }         from 'Components/Link';
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
`;
let CustomLink = Link.extend`
	text-align: center;
`;
class App extends React.Component {
	componentDidMount() {
		console.log(this.props, "APP");
	}
	componentDidUpdate() {
	}
	render() {
		return(
			<WrapApp>
				<Header/>
				<Panels>
					<PanelLeft>
						<CustomLink to={"/app/home"}>Home</CustomLink>
						<CustomLink to={"/app/wallet"}>Wallet</CustomLink>
					</PanelLeft>
					<PanelRight>
						<Switch>
							<Route exact path={"/app/"} component={Portfolio}/>
							<Route exact path={"/app/home"} component={Portfolio}/>
							<Route exact path={"/app/wallet"} component={Wallet}/>
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