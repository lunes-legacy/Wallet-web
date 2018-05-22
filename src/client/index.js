require('dotenv').load();
import React                    from 'react';
import { hydrate }          from 'react-dom';
import { Provider }             from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from 'Containers/App';
import AppSwitcher from 'Containers/AppSwitcher';

import { store } from 'Stores/store';

const history = createBrowserHistory({
	basename: process.env.BROWSER_HISTORY_BASENAME
});
hydrate(
	<Provider store={store}>
		<Router history={history}>
			<AppSwitcher/>
		</Router>
	</Provider>, document.querySelector(".root"));
