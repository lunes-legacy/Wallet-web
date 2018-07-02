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
	// { 'coinKey': 'eth', 'coinName':  'ETH', 'address': '' },
	{ 'coinKey': 'ltc', 'coinName':  'LTC', 'address': '' },
	// { 'coinKey': 'nano', 'coinName':  'NANO', 'address': 'Soon...' },
	// { 'coinKey': 'dash', 'coinName':  'DASH', 'address': 'Soon...' },
]

// URLs para o blockexplorer de cada moeda de acordo com a rede utilizada
const BLOCK_EXPLORER_URL = {
  lns: TESTNET ? 'https://blockexplorer-testnet.lunes.io/tx/' : 'https://blockexplorer.lunes.io/tx/',
  btc: TESTNET ? 'https://www.chain.so/tx/BTCTEST/' : 'https://www.chain.so/tx/BTC/',
  ltc: TESTNET ? 'https://chain.so/tx/LTCTEST/' : 'https://www.chain.so/tx/LTC/',
  nano: TESTNET ? '#' : '#',
  dash: TESTNET ? '#' : '#',
  eth: TESTNET ? '#' : '#'
}

const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre
const LUNES_LEASING_FEE = 0.001;
const LUNES_TRANSACTION_FEE = 0.001;
const BLOCK_EXPLORERS = {
	LUNES:        'https://blockexplorer.lunes.io/',
	LUNESTESTNET: 'https://blockexplorer-testnet.lunes.io/',
	BTC:          'https://chain.so/',
	BTCTESTNET:   'https://chain.so/',
	LTC:          'https://chain.so/',
	LTCTESTNET:   'https://chain.so/'
}
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
