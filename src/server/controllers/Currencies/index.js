import { coins } from 'lunes-lib';
import { WalletClass } from 'Classes/Wallet';

const Wallet = new WalletClass();

export default class Currencies {
	getPrice = async (req, res, next) => {
		// let r = await coins.getPrice({fromSymbol:'LUNES',toSymbol:'USD',range:'RANGE_1D'});
		let toSymbol = 'USD,EUR,BRL';
		let r = await Wallet.getCoinsPrice({
			LNS:  { fromSymbol:'LNS',  toSymbol },
			BTC:  { fromSymbol:'BTC',  toSymbol },
			ETH:  { fromSymbol:'ETH',  toSymbol },
			LTC:  { fromSymbol:'LTC',  toSymbol },
			DASH: { fromSymbol:'DASH', toSymbol }
		});
		res.send(r);
	}
}
