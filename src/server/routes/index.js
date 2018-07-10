import { 
	Currencies as CurrenciesClass,
	Currency as CurrencyClass
} from './../controllers';

const Currencies = new CurrenciesClass();
const Currency  = new CurrencyClass();

module.exports = (app) => {
	return (() => {
		app.get('/currency/price',        Currency.getPrice);
		app.get('/currencies/price',      Currencies.getPrice);
		// app.get('/address/history',   Address.getHistory);
		// app.get('/addresses/history', Addresses.getHistory);
		// app.get('/address/balance',   Address.getBalance);
		// app.get('/addresses/balance', Addresses.getBalance);
	})()
}
