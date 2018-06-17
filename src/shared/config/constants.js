let testnet           = 'FALSE'; //it should comes from .env, well... maybe
const ENV             = 'development'; //|| 'production'
const TESTNET         = testnet === 'TRUE' ? true : false;
const APICONFIG				= TESTNET === true ? 'LNSTESTNET' : 'LNS'; //Uso na geração de seed/endereços
const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre
const LUNES_USD_PRICE = 0.8;
export {
	TESTNET,
	APICONFIG,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	ENV,
	LUNES_USD_PRICE
}
