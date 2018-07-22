import { coins } from 'lunes-lib';
import { errorPattern } from 'Utils/functions';

export class MoneyClass {
  conevertCoin = (to, amount) => {
    if (!to) {
      console.error(`We've got ${to} value from variable 'to'`,500,'MONEY_CONVERTCOIN_ERROR');
      return;
    }

    if (amount === 0)
      return amount;

    if (!amount) {
      console.error(errorPattern(`Error on trying to convert ${to}, got ${amount} value from 'amount' variable`,500,'MONEY_CONVERTCOIN_ERROR'));
      return;
    }
    // if (to === 'btc' || to === 'lns' || to === 'lunes' || to === 'ltc') {
    if (to.search(/(btc)|(lns)|(lunes)|(ltc)|(dash)|(bch)/i) !== -1) {
      return this.convertToBtc(amount);
    } else if (to.search(/(satoshi)/i) !== -1) {
      return this.convertToSatoshi(amount);
    } else if (to.search(/(eth)/i) !== -1) {
      return this.convertToEth(amount);
    } else if (to.search(/(wei)/i) !== -1) {
      return this.convertToWei(amount);
    }
  }
  convertCoin = (to, amount) => {
    return this.conevertCoin(to, amount);
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

