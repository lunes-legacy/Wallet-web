import { coins } from 'lunes-lib';
import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export default class Currency {
  getPrices = async (req, res, next) => {
    // let r = await coins.getPrice({fromSymbol:fromSymbol,toSymbol:toSymbol,range:'RANGE_1D'});

    let { fromSymbol, toSymbol } = req.body;
    let r = await Wallet.getCoinsPrice({
        USD:  { fromSymbol: 'USD', toSymbol:'BRL,EUR' },
        EUR:  { fromSymbol: 'EUR', toSymbol:'BRL,USD' },
        BRL:  { fromSymbol: 'BRL', toSymbol:'EUR,USD' }
    });
    res.send(r);
  }
  getPrice = async (req, res, next) => {
    let { fromSymbol, toSymbol } = req.body;
    let r = await coins.getPrice({fromSymbol, toSymbol});
    res.send(r);
  }
}
