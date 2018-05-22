// require('dotenv').load();
let TESTNET = 'TRUE'; //isso deve vir do process.env
const testnet = TESTNET === 'TRUE' ? true : false;
export {
	testnet
}