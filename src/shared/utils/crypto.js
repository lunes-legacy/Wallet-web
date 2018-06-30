import { BLOCK_EXPLORERS, TESTNET } from 'Config/constants';

export const getTxidLink = (network, txid) => {
	if (network.search(/lns/i) !== -1) {
		network = 'LUNES';
	}
	let networkConstant      = network.toUpperCase();
	let testnetConstant  = TESTNET ? 'TESTNET' : '';
	networkConstant      = networkConstant + testnetConstant;
	let explorer = BLOCK_EXPLORERS[networkConstant];

	let networkBlockExplorer      = network.toUpperCase();
	let testnetBlockExplorer  = TESTNET ? 'TEST' : '';
	networkBlockExplorer      = networkBlockExplorer + testnetBlockExplorer;

	if (network.indexOf('LUNES') === -1) {
		return `${explorer}tx/${networkBlockExplorer}/${txid}`
	}
	return `${explorer}tx/${txid}`;
}