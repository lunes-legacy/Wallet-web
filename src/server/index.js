import React              from 'react';
import { createStore, combineReducers } from 'redux';
import { renderToString } from 'react-dom/server';
import { Provider }       from 'react-redux';
import { StaticRouter, Router } from 'react-router';
import express            from 'express';
import { ServerStyleSheet } from 'styled-components'
import CookieClass        from 'Classes/Cookie';
import { users }          from 'lunes-lib';

import { errorPattern } from 'Utils/functions';
import { store }        from 'Stores/store';
import App              from 'Containers/App/index';
import AppSwitcher      from 'Containers/AppSwitcher';

const app = express();

app.use(express.static('public'));

app.use(async (req, res, next) => {
	//preciso aplicar apenas na rota /app
	//preciso verificar se tem token, se nao redireciona
	//preciso verificar se o token é valido, se nao redirect,
	// let u = await users.login({email:'wandyer1@lunes.io', password:'Lunes123#@!'});
	// console.log(u, "UUU"); return;
	next();
	return;
	const checkCookies = () => {
		let user = req.cookies && req.cookies.user;
		if (!user) {
			if (req.url.indexOf('/login') !== -1) {
				next();
				return;
			}
			res.redirect('/login');
			return;
		}
		next();
	}
	if (req.url.indexOf('/app') !== -1) {
		checkCookies();
		res.redirect('/login');
		return;
	} else {
		checkCookies();
	}
});


app.use((req, res, next) => {
	console.log(
		`\x1b[32m%s\x1b[0m`, 
		`-Method: ${req.method}, URL: ${req.url}`
	);
	next();
});
global.window = {};
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
app.listen(3002, () => {
	console.log('Server is running on port 3002');
});

const render = (html, styleTags) => {
	return `
		<!DOCTYPE html>
		<html>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="/css/style.css"/>
				${styleTags}
				<!-- Import Google Icon Font -->
                <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
                <!-- Import materialize.css -->
                <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css" rel="stylesheet">
			</head>
			<body>
				<div class="root">${html}</div>

				<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
			    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
				<script src="/bundle.js" refer></script>
			</body>
		</html>
	`;
}
