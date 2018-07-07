import { BLOCK_EXPLORERS, TESTNET } from 'Config/constants';

export const getTxidLink = (network, txid) => {
	if (network.search(/lns/i) !== -1) {
		network = 'lunes';
	}

	const networkConstant = TESTNET ? network.toUpperCase() + 'TEST' : network.toUpperCase();
  const explorer = BLOCK_EXPLORERS[network];
  console.log('network:' + networkConstant);
  // Se for Lunes ou Ethereum utiliza um formato diferente de url para o block explorer
  if (['lunes', 'eth'].filter(net => net === network)) {
    return `${explorer}tx/${txid}`;
  }

  return `${explorer}tx/${networkConstant}/${txid}`
}
