import { coins } from 'lunes-lib';

export class MoneyClass {
  conevertCoin = (to, amount) => {
    const _to = to.toLowerCase();

    console.warn('to: ' + _to + ' amount: ' + amount);

    if (_to === 'btc' || _to === 'lns' || _to === 'lunes' || _to === 'ltc') {
      return this.convertToBtc(amount);
    } else if (_to === 'satoshi') {
      return this.convertToSatoshi(amount);
    } else if (_to === 'eth') {
      return this.convertToEth(amount);
    } else if (_to === 'wei') {
      return this.convertToWei(amount);
    }
  }

  // Converte o valor em UNIS para LUNES
  convertToLunes = (value) => { value = value.toString(); return coins.util.unitConverter.toBitcoin(value); }

  // Converte o valor em LUNES para UNIS
  convertToUnis = (value) => { value = value.toString(); return coins.util.unitConverter.toSatoshi(value); }

  // Converte o valor em satoshis para BTC
  convertToBtc = (value) => { value = value.toString(); return coins.util.unitConverter.toBitcoin(value); }

  // Converte o valor em BTC para satoshis
  convertToSatoshi = (value) => { value = value.toString(); return coins.util.unitConverter.toSatoshi(value); }

  // Converte o valor em Wei para ETH
  convertToEth = (value) => { value = value.toString(); return coins.util.unitConverter.toEth(value); }

  // Converte o valor em ETH para Wei
  convertToWei = (value) => { value = value.toString(); return coins.util.unitConverter.toWei(value); }
}
