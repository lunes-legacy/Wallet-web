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

// TO ENABLE OTHER COINS, SERACH IN "SHIFT + CRTL + F" FOR: "ENABLE COINS"
// ENABLE COINS
const ENABLEDCOINS = [
	{ 'coinKey': 'lns', 'coinName':  'Lunes', 'address': '' },
	{ 'coinKey': 'btc', 'coinName':  'BTC', 'address': '' },
	{ 'coinKey': 'eth', 'coinName':  'ETH', 'address': '' },
	{ 'coinKey': 'ltc', 'coinName':  'LTC', 'address': '' },
	// { 'coinKey': 'nano', 'coinName':  'NANO', 'address': 'Soon...' },
	// { 'coinKey': 'dash', 'coinName':  'DASH', 'address': 'Soon...' },
]

// URLs para o blockexplorer de cada moeda de acordo com a rede utilizada
const BLOCK_EXPLORERS = {
  lns: TESTNET ? 'https://blockexplorer-testnet.lunes.io/' : 'https://blockexplorer.lunes.io/',
  lunes: TESTNET ? 'https://blockexplorer-testnet.lunes.io/' : 'https://blockexplorer.lunes.io/',
  btc: 'https://www.chain.so/',
  ltc: 'https://www.chain.so/',
  nano: 'https://www.chain.so/',
  dash: 'https://www.chain.so/',
  eth: TESTNET ? 'https://ropsten.etherscan.io/' : 'https://etherscan.io'
}

const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre
const LUNES_LEASING_FEE = 0.001;
const LUNES_TRANSACTION_FEE = 0.001;

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
	LUNES_LEASING_FEE,
	ENV,
	BLOCK_EXPLORERS,
	LUNES_TRANSACTION_FEE
}
