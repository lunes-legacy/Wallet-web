import { coins } from 'lunes-lib';

export class MoneyClass {
  convertToBtc = async (value) => (await coins.util.unitConverter.toBitcoin(value));
  convertToBtc_simple = value => { // ver esta funcao, sem a necessidade de await e funcionando
    return coins.util.unitConverter.toBitcoin(value)
  }
}
