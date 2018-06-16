require('dotenv').load();
if (!global._babelPolyfill) {
	require('babel-polyfill');
}
//the developer should put your own name in .env on MOCHA_DEVELOPER
let dev = process.env.MOCHA_DEVELOPER;
switch (dev) {
	case 'marcelo':
		console.log(`\x1b[42m ${dev.toUpperCase()}'s TESTS \x1b[0m`);
		require('./marcelo/index.js'); break;
}

const util = require('util');
