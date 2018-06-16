import { Route, Redirect } from 'react-router-dom';
import { checkAuth }    from 'Auth/index';
import React from 'react';

export const AuthRoute = ({ component: Component, ...rest }) => {
	return (
		<Route {...rest} render={(props) => {
			if (checkAuth()) {
				return (
					<Component {...props}/>
				);
			} else {
				if (typeof window !== 'undefined') {
					window.location.href = '/login';
				}
				return <Redirect to={'/login'}/>
			}
		}}/>
	);
}