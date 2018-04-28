import { WalletLib } from 'Containers/Wallet/functions.js';
// require('babel-core/register');
require('babel-polyfill');
console.log('_________________________________');
console.log('-Precisamos corrigir a matemática, que talvez esteja errada');
console.log('-Use laços for para async/await');
console.log('-Wallet para esta classe vai dar conflito');
console.log('-Wallet.getBalance() está usando apenas o BITCOIN <<');

async function init() {
	let user        = JSON.parse('{"_id":"5adf356ef262940da0647c45","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGYzNTZlZjI2Mjk0MGRhMDY0N2M0NSIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjQ3NTAwNTEsImV4cCI6MTUyNDc1NzI1MX0.ONXUF-aaaO17xCf1L3EXwzZ1oWZ_2EMdQw-0uPvJyHo","email":"marcelosmtp@gmail.com","fullname":"Marcelo Rafael","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","pinIsValidated":false,"phoneIsValidated":false,"wallet":{"hash":"own deny own field install notice agree loud still what pool expire","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"1AXNNHc4wZib9Zjq2spx4AG2cmqCK2DLZW","createdAt":"2018-04-24T13:47:26.530Z"}],"createdAt":"2018-04-24T13:47:26.530Z"}]}}');
	// "coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"1AXNNHc4wZib9Zjq2spx4AG2cmqCK2DLZW"
	let address     = user.wallet.coins[0].addresses[0].address;
	let accessToken = user.accessToken;
	let wallet      = new WalletLib;
	// let tmp    = await wallet.getBalance(user);
	let tmp = await wallet.getHistory({address: '1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD'}, accessToken);
	console.log(tmp);
}
init();