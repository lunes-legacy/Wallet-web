import {
	Cryptocurrency as CryptoController,
	Currency as CurrencyController
} from './../controllers';

const Crypto    = new CryptoController;
const Currency  = new CurrencyController;

module.exports = (app) => {
	return (() => {
    app.post('/currencies/price', Currency.getPrices);
		app.post('/currency/price',   Currency.getPrice);
    app.post('/crypto/price',     Crypto.getPrice);
		app.post('/cryptos/price',    Crypto.getPrices);
		// app.get('/address/history',   Address.getHistory);
		// app.get('/addresses/history', Addresses.getHistory);
		// app.get('/address/balance',   Address.getBalance);
		// app.get('/addresses/balance', Addresses.getBalance);
	})()
}
