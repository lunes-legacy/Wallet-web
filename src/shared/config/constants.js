// DEFINITION
const testnet         = 'TRUE'; 
const TESTNET         = testnet === 'TRUE' ? true : false;
const ENV             = 'development'; // AMBIENTE

// START NETWORK CONFIG
const APICONFIG 	    = TESTNET === true ? 'LNSTESTNET'  : 'LNS'; //TEMP
const LNSNETWORK      = TESTNET === true ? 'LNSTESTNET'  : 'LNS';
const BTCNETWORK      = TESTNET === true ? 'BTCTESTNET'  : 'BTC';
const LTCNETWORK      = TESTNET === true ? 'LTCTESTNET'  : 'LTC';
const NANONETWORK     = TESTNET === true ? 'NANOTESTNET' : 'NANO';
const DASHNETWORK     = TESTNET === true ? 'DASHTESTNET' : 'DASH';
const ETHNETWORK      = TESTNET === true ? 'ROPSTEN'     : 'ETH';
// END NETWORK CONFIG

// ENABLE COINS
const ENABLEDCOINS = [
	{ 'coinKey': 'lns', 'coinName':  'Lunes', 'address': '' },
	{ 'coinKey': 'btc', 'coinName':  'BTC', 'address': '' },
	// { 'coinKey': 'ltc', 'coinName':  'LTC', 'address': 'Soon...' },
	// { 'coinKey': 'eth', 'coinName':  'ETH', 'address': 'Soon...' },
	// { 'coinKey': 'nano', 'coinName':  'NANO', 'address': 'Soon...' },
	// { 'coinKey': 'dash', 'coinName':  'DASH', 'address': 'Soon...' },
]

const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre

export {
	TESTNET,
	APICONFIG,
	LNSNETWORK,
	BTCNETWORK,
	LTCNETWORK,
	DASHNETWORK,
	ETHNETWORK,
	ENABLEDCOINS,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	ENV
}
