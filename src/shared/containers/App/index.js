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
`;

class App extends React.Component {
	componentDidMount() {
		console.log(this.props, "APP");
	}
	componentDidUpdate() {
	}
	render() {
		return(
			<div className={"app"}>
				<Header/>
				<Panels>
					<PanelLeft>
						<Link to={"/app/home"}>Home</Link> <br/>
						<Link to={"/app/wallet"}>Wallet</Link>
					</PanelLeft>
					<PanelRight>
						<Switch>
							<Route exact path={"/app/"} component={Portfolio}/>
							<Route exact path={"/app/home"} component={Portfolio}/>
							<Route exact path={"/app/wallet"} component={Wallet}/>
						</Switch>
					</PanelRight>
				</Panels>
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