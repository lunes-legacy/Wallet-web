let testnet           = 'TRUE'; //it should comes from .env, well... maybe
const ENV             = 'development'; //|| 'production'
const TESTNET         = testnet === 'TRUE' ? true : false;
const APICONFIG 	    = TESTNET === true ? 'LNSTESTNET' : 'LNS'; //Uso na geração de seed/endereços
const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre
const LUNES_LEASING_FEE = 0.001;
const EXPLORERS = {
	LNS: {
		testnet: 'https://blockexplorer-testnet.lunes.io/',
		mainnet: 'https://blockexplorer.lunes.io/',
	}
}
const BLOCK_EXPLORER = {
	get: (network) => {
		if (TESTNET === true)
			return EXPLORERS[network.toUpperCase()].testnet;
		else
			return EXPLORERS[network.toUpperCase()].mainnet;
	}
}
export {
	TESTNET,
	APICONFIG,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	ENV,
	LUNES_LEASING_FEE,
	EXPLORERS,
	BLOCK_EXPLORER
}
