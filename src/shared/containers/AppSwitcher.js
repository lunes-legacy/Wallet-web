import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App      from 'Containers/App/index';
import Login    from 'Containers/User/Login/index';
import Registry from 'Containers/User/Registry/index';
import Reset    from 'Containers/User/Reset/index';

class AppSwitcher extends React.Component {
	render()
	{
		let pathname = this.props.pathname;
		console.log(pathname);
		if (pathname !== '/login' && pathname !== '/registry' && pathname !== '/reset') {
			//App has your own routes
			return <App/>;
		} else {
			return (
				<Switch>
					<Route exact path={'/login'} component={Login}/>
					<Route exact path={'/registry'} component={Registry}/>
					<Route exact path={'/reset'} component={Reset}/>
				</Switch>
			);
		}
	}
}

export default AppSwitcher;