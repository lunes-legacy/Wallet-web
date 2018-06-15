import { coins } from 'lunes-lib';

export class MoneyClass {
  convertToBtc = async (value) => (await coins.util.unitConverter.toBitcoin(value));
}
