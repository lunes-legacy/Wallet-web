import { coins } from 'lunes-lib';

export class MoneyClass {
  // Converte o valor em satoshis para BTC
  convertToBtc = async (value) => (await coins.util.unitConverter.toBitcoin(value));

  // Converte o valor em BTC para satoshis
  convertToSatoshi = async (value) => (await coins.util.unitConverter.toSatoshi(value));
}
