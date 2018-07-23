import { coins } from 'lunes-lib';
import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export default class Cryptocurrency {
  getPrices = async (req, res, next) => {
    // let r = await coins.getPrice({fromSymbol:'LUNES',toSymbol:'USD',range:'RANGE_1D'});

    // let { fromSymbol, toSymbol } = req.body;
    let toSymbol = 'USD,EUR,BRL';
    //ENABLE COIN
    let r = await Wallet.getCoinsPrice({
        LNS:  { fromSymbol: 'LNS',  toSymbol },
        BTC:  { fromSymbol: 'BTC',  toSymbol },
        BCH:  { fromSymbol: 'BCH',  toSymbol },
        ETH:  { fromSymbol: 'ETH',  toSymbol },
        LTC:  { fromSymbol: 'LTC',  toSymbol },
        DASH: { fromSymbol: 'DASH', toSymbol },
        TETHER: { fromSymbol: 'TETHER', toSymbol }
    });
    res.send(r);
  }
  getPrice = async (req, res, next) => {
    let { fromSymbol, toSymbol } = req.body;
    let r = await coins.getPrice({fromSymbol, toSymbol});
    res.send(r);
  }
}
