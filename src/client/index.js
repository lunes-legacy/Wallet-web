import React                    from 'react';
import { hydrate }              from 'react-dom';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import { createBrowserHistory } from 'history';

import App from 'Containers/App';

import { store } from 'Stores/store';

const history = createBrowserHistory({
	basename: '/'
});

hydrate(
	<Provider store={store}>
		<Router history={history}>
			<App/>
		</Router>
	</Provider>, document.querySelector(".root"));