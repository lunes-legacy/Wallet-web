let testnet           = 'TRUE'; //it should comes from .env, well... maybe
const ENV             = 'development'; //|| 'production'
const TESTNET         = testnet === 'TRUE' ? true : false;
const LUNES_LIB_ENV   = 'staging'; //'staging' || 'development' || 'production'
const LUNES_LIB_LOGIN = 'auto'//| 'auto' || 'manual', isso serve para fazer login automático para nao ficar apertando o botão de login sempre
export {
	TESTNET,
	LUNES_LIB_ENV,
	LUNES_LIB_LOGIN,
	ENV
}
