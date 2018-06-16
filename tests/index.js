import { format } from 'money-formatter';

//essa classe existe para caso esse
//pacote 'money-formatter' nao seja confiável
//podemos trocar mais fácil
class MoneyLib {
	constructor() {
		console.log(format);
	}
	convertCoinPrice = ({price, amount, currency = 'USD', fractionSize=2, useAlphaCode=false}) => {
		if (currency !== 'USD' && currency !== 'EUR' && currency !== 'BRL') {
			return {message:'The currency passed through parameter does not match',status:500,statusKey:'MONEY_LIB_ERROR'}; }
		amount = parseFloat(amount) * parseFloat(price);
		return format(currency, amount, fractionSize, useAlphaCode)
	}
}
// import { WalletLib } from 'Containers/Wallet/functions.js';
// import { coins } from 'lunes-lib';
// require('babel-core/register');
// require('babel-polyfill');
// console.log('_________________________________');
// console.log('-Precisamos corrigir a matemática, que talvez esteja errada');
// console.log('-Use laços for para async/await');
// console.log('-Wallet para esta classe vai dar conflito');
// console.log('-Wallet.getBalance() está usando apenas o BITCOIN <<');

async function init() {
	let money = new MoneyLib();
	let converted = money.convertCoinPrice({
		price: '1.5',
		amount: '10'
	});
	console.log(converted);
	// money;
	// let user        = JSON.parse('{"_id":"5adf356ef262940da0647c45","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGYzNTZlZjI2Mjk0MGRhMDY0N2M0NSIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjQ3NTAwNTEsImV4cCI6MTUyNDc1NzI1MX0.ONXUF-aaaO17xCf1L3EXwzZ1oWZ_2EMdQw-0uPvJyHo","email":"marcelosmtp@gmail.com","fullname":"Marcelo Rafael","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","pinIsValidated":false,"phoneIsValidated":false,"wallet":{"hash":"own deny own field install notice agree loud still what pool expire","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"1AXNNHc4wZib9Zjq2spx4AG2cmqCK2DLZW","createdAt":"2018-04-24T13:47:26.530Z"}],"createdAt":"2018-04-24T13:47:26.530Z"}]}}');
	// // "coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"1AXNNHc4wZib9Zjq2spx4AG2cmqCK2DLZW"
	// let address     = user.wallet.coins[0].addresses[0].address;
	// let accessToken = user.accessToken;
	// let wallet      = new WalletLib;
	// // let tmp    = await wallet.getBalance(user);
	// let tmp = await wallet.getHistory({address: '1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD'}, accessToken);
	// console.log(tmp);

	// console.log(coins);
	// console.log(await coins.getFees());
}
init();