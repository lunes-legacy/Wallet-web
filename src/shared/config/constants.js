// DEFINITION
const testnet         = 'FALSE';
const TESTNET         = testnet === 'TRUE' ? true : false;
const ENV             = 'development'; // AMBIENTE

const EXRATES_API = 'https://exrates.me/public/coinmarketcap/ticker';

let host;
if (typeof window !== 'undefined')
  host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
else
  host = 'http://localhost:3010';
const HOST = host;

// START NETWORK CONFIG
const APICONFIG 	    = TESTNET === true ? 'LNSTESTNET'  : 'LNS'; //TEMP
const LNSNETWORK      = TESTNET === true ? 'LNSTESTNET'  : 'LNS';
const BTCNETWORK      = TESTNET === true ? 'BTCTESTNET'  : 'BTC';
const BCHNETWORK      = TESTNET === true ? 'BCHTESTNET'  : 'BCH';
const LTCNETWORK      = TESTNET === true ? 'LTCTESTNET'  : 'LTC';
const NANONETWORK     = TESTNET === true ? 'NANOTESTNET' : 'NANO';
const USDTNETWORK     = TESTNET === true ? 'USDTTESTNET' : 'USDT';
const DASHNETWORK     = TESTNET === true ? 'DASHTESTNET' : 'DASH';
const ETHNETWORK      = TESTNET === true ? 'ROPSTEN'     : 'ETH';
// END NETWORK CONFIG

// TO ENABLE OTHER COINS, SERACH IN "SHIFT + CRTL + F" FOR: "ENABLE COINS"
// ENABLE COINS
// ENABLE COINS IN src/server/controllers/Currencies/Crypto <<<<<
const ENABLEDCOINS = [
	{ 'coinKey': 'lns', 'coinName':  'Lunes', 'address': '' },
	{ 'coinKey': 'btc', 'coinName':  'BTC', 'address': '' },
	{ 'coinKey': 'bch', 'coinName':  'BCH', 'address': '' },
	{ 'coinKey': 'eth', 'coinName':  'ETH', 'address': '' },
	{ 'coinKey': 'ltc', 'coinName':  'LTC', 'address': '' },
  // { 'coinKey': 'nano', 'coinName':  'NANO', 'address': 'Soon...' },
	{ 'coinKey': 'usdt', 'coinName':  'USDT', 'address': '' },
	{ 'coinKey': 'dash', 'coinName':  'DASH', 'address': '' },
]

// URLs para o blockexplorer de cada moeda de acordo com a rede utilizada
const BLOCK_EXPLORERS = {
  lns: TESTNET ? 'https://blockexplorer-testnet.lunes.io/' : 'https://blockexplorer.lunes.io/',
  lunes: TESTNET ? 'https://blockexplorer-testnet.lunes.io/' : 'https://blockexplorer.lunes.io/',
	btc: 'https://www.chain.so/',
	bch: 'https://explorer.bitcoin.com/bch/',
  ltc: 'https://www.chain.so/',
  nano: 'https://www.chain.so/',
  dash: 'https://www.chain.so/',
  usdt: 'https://omniexplorer.info/',
  eth: TESTNET ? 'https://ropsten.etherscan.io/' : 'https://etherscan.io/'
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
	BCHNETWORK,
	LTCNETWORK,
	DASHNETWORK,
	ETHNETWORK,
  USDTNETWORK,
	ENABLEDCOINS,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	LUNES_LEASING_FEE,
	ENV,
	BLOCK_EXPLORERS,
	LUNES_TRANSACTION_FEE,
  HOST,
  EXRATES_API
}
