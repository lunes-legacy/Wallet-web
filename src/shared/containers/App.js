import React            from 'react';
import { Route }        from 'react-router';
import { connect }      from 'react-redux';
import { errorPattern } from 'Utils/functions';
import Home             from 'Components/Home';

class App extends React.Component {
	componentDidMount() {
		// console.log(this.props);
	}
	render() {
		return(
			<Route exact path={"/"} render={() => {
				return (
					<Home user={this.props.user} userLogin={this.props.userLogin}/>
				);
			}}/>
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
			let token = 
			dispatch({
				type: 'USER_LOGIN',
				payload: userLogin(email, password)
			});
		}
	}
}
const userLogin = (email, password) => {
	if (email === 'marcelo@g.c' && password === '123') {
		return Promise.resolve('132132131312');
	} else {
		return Promise.reject(errorPattern('E-mail or password isnt right!', 500, 'LOGIN_ERROR'));
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);