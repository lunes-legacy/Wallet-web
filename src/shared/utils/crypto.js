import { BLOCK_EXPLORERS, TESTNET } from 'Config/constants';

export const getTxidLink = (network, txid) => {
	if (network.search(/lns/i) !== -1) {
		network = 'LUNES';
	}
	network      = network.toUpperCase();
	let testnet  = TESTNET ? 'TESTNET' : '';
	network      = network + testnet;
	let explorer = BLOCK_EXPLORERS[network];

	if (network.indexOf('LUNES') === -1) {
		return `${explorer}api/v2/tx/${network}/${txid}`
	}
	return `${explorer}tx/${txid}`;
}