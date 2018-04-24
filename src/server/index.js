import React              from 'react';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider }       from 'react-redux';
import { StaticRouter, Router } from 'react-router';
import express            from 'express';
import { ServerStyleSheet } from 'styled-components'

import { errorPattern } from 'Utils/functions';
import { store }        from 'Stores/store';
import App              from 'Containers/App/index';
import AppSwitcher      from 'Containers/AppSwitcher';

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
	let sheet = new ServerStyleSheet();
	try {
		let html = renderToString(sheet.collectStyles(
			<Provider store={store}>
				<StaticRouter location={req.url} context={{}}>
					<AppSwitcher/>
				</StaticRouter>
			</Provider>
		));
		let styleTags = sheet.getStyleTags();
		res.send(render(html, styleTags));
	} catch(err) {
		console.log(errorPattern(err));
	}
});
app.listen(3000, () => {
	console.log('Server is running on port 3000');
});

const render = (html, styleTags) => {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="/css/style.css"/>
				${styleTags}
			</head>
			<body>
				<div class="root">${html}</div>
				<script src="/bundle.js" refer></script>
			</body>
		</html>
	`;
}
