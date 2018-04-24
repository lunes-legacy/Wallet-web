require('dotenv').load();
import React, { PropTypes } from 'react';
import { Route, Switch, Redirect, Link }    from 'react-router-dom';
import { connect }          from 'react-redux';
import { errorPattern }     from 'Utils/functions';
import styled               from 'styled-components';
import { users }            from 'lunes-lib';
import { createBrowserHistory } from 'history';

import Login            from 'Containers/User/Login/index';
import Home             from 'Containers/Home/index';
import Header           from './Header';
import PanelLeft        from './PanelLeft';
import PanelRight       from './PanelRight';
import { AuthRoute }    from 'Components/AuthRoute';
// import { checkAuth }    from 'Auth/index';

class App extends React.Component {
	componentWillMount() {
	}
	render() {
		return(
			<div className={"app"}>
				<Header/>
				<PanelLeft>
					<Link to={"wallet"}>Wallet</Link>
					<Link to={"home"}>Home</Link>
				</PanelLeft>
				<PanelRight>
					<Switch>
						<Route exact path={"/"} component={Home}/>
						<AuthRoute exact path={"/home"} component={Home}/>
					</Switch>
				</PanelRight>
			</div>
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