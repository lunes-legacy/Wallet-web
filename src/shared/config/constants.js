let testnet           = 'TRUE'; //it should comes from .env, well... maybe
const ENV             = 'development'; //|| 'production'
const TESTNET         = testnet === 'FALSE' ? true : false;
const APICONFIG 	      = TESTNET === true ? 'LNSTESTNET' : 'LNS'; //Uso na geração de seed/endereços
const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'manual'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre

export {
	TESTNET,
	APICONFIG,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	ENV
}
