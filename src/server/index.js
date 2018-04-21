import React              from 'react';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider }       from 'react-redux';
import { StaticRouter, Router } from 'react-router';
import express            from 'express';

import { errorPattern } from 'Utils/functions';
import { store }        from 'Stores/store';
import App              from 'Containers/App';

const app = express();

app.use(express.static('public'));

app.use((req, res, next) => {
	console.log(
		`\x1b[32m%s\x1b[0m`, 
		`-Method: ${req.method}, URL: ${req.url}`
	);
	next();
});

app.get('*', (req, res) => {
	try {
		let html = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={{}}>
					<App/>
				</StaticRouter>
			</Provider>
		);
		res.send(render(html));
	} catch(err) {
		console.log(errorPattern(err));
	}
});
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

const render = (html) => {
	return `
		<!DOCTYPE html>
		<html>
			<head></head>
			<body>
				<div class="root">${html}</div>
				<script src="bundle.js" refer></script>
			</body>
		</html>
	`;
}
