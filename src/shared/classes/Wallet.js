import { errorPattern } from "Utils/functions";
import { coins, services, networks } from "lunes-lib";
import sb from "satoshi-bitcoin";
import isCoinAvaliable from "Config/isCoinAvaliable";

import { FeeClass } from 'Classes/crypto';
import { MoneyClass } from 'Classes/Money';

import {
  TESTNET,
  APICONFIG,
  LNSNETWORK,
  BTCNETWORK,
  LTCNETWORK,
  NANONETWORK,
  DASHNETWORK,
  ETHNETWORK
} from "Config/constants";

const money = new MoneyClass;
const Fee = new FeeClass;

export class WalletClass {
  static coinsPrice;

  //for now, we arent using this
  getCoinsPrice = async data => {
    if (!data || Object.keys(data).length < 1) {
      data = {
        BTC: { fromSymbol: "BTC", toSymbol: "USD" },
        ETH: { fromSymbol: "ETH", toSymbol: "USD" }
      };
    }

    try {
      let coinsPrice = {};
      for (let coinKey in data) {
        coinsPrice[data[coinKey].fromSymbol] = await coins.getPrice(data[coinKey]);
      }
      return coinsPrice;
    } catch (err) {
      return errorPattern(`Error on trying to get price`, 500, "COINGETPRICE_ERROR", err);
    }
  };
  /*
		@param user: typically it comes from cookies
		returns: {btc: ['address','address', ...]}
	*/
  getUserAddresses = user => {
    try {
      let addresses = {};
      //(example): @param coin = {symbol: 'btc', createdAt: [timestamp], etc..}
      user.wallet.coins.map(coin => {
        //if addresses does not have {addresses['btc'] (example)} as attribute, so:
        if (!addresses[coin.symbol]) {
          addresses[coin.symbol] = [];
        }
        //we get the ${addresses[coin.symbol]} array, and we push an address to it
        coin.addresses.map(obj => {
          addresses[coin.symbol].push(obj.address);
        });
      });
      return addresses;
    } catch (err) {
      return errorPattern("Was not possible get user addresses", 500, "WALLET_GETUSERADDRESS_ERROR", err);
    }
  };
  /*
		@param user: typically comes from cookies
		return ex:
			{
				btc: {
					total_confirmed: 0,
					total_unconfirmed: 0,
					total_amount: 0
				}
			}
  */

  getMnemonic() {
    try {
      return services.wallet.mnemonic.generateMnemonic();
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // addresses = { LNS: lunes addrees, BTC: bitcoin address... }
  getAddressesBalance = async addresses => {
    try {
      let balances = {};
      for (const coin in addresses) {
        if (!addresses[coin]) return false;
        try {
          balances[coin] = await coins.services.balance(coin, addresses[coin], TESTNET);
        } catch (e) {
          // TODO: fix this error
          console.error('Wallet.js - line 96');
          console.log(e);
          continue;
        }
      }

      return balances;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  getTxHistory = async ({ network = undefined, address = undefined }) => {
    console.warn(network, address, "NETWORK | ADDRESS");
    if (!network)
      throw errorPattern("getHistory error, you should pass through a network name", 500, "WALLET_GETHISTORY_ERROR");

    try {
      return coins.services.history({ network, address, testnet: TESTNET });
    } catch (err) {
      throw console.error(errorPattern("Error on get history", 500, "WALLET_GETHISTORY_ERROR", err));
    }
  };

  getCoinHistory = async object => {
    try {
      return await coins.getHistory(object);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  validateAddress = async (coin, address) => {
    try {
      coin = coin.toUpperCase();
      if (coin === 'LNS' || coin === 'LUNES') {
        return await services.wallet.lns.validateAddress(address, networks[LNSNETWORK]);
      } else {
        return await coins.util.validateAddress(address, coin, TESTNET);
      }
    } catch (error) {
      console.error(error)
      return false;
    }
  };

  getNewAddress(seed, coin = null) {
    try {
      switch (coin) {
        case 'lunes':
          return services.wallet.lns.wallet.newAddress(seed, networks[LNSNETWORK]);

        case 'lns':
          return services.wallet.lns.wallet.newAddress(seed, networks[LNSNETWORK]);

        case 'btc':
          return services.wallet.btc.wallet.newAddress(seed, networks[BTCNETWORK]);

        case 'eth':
          return services.wallet.eth.wallet.newAddress(seed, networks[ETHNETWORK]);

        case 'ltc':
          return services.wallet.btc.wallet.newAddress(seed, networks[LTCNETWORK]);

        case 'nano':
          return services.wallet.nano.wallet.newAddress(seed, networks[NANONETWORK]);

        case 'dash':
          return services.wallet.btc.wallet.newAddress(seed, networks[DASHNETWORK]);

        default:
          return services.wallet.lns.wallet.newAddress(seed, networks[LNSNETWORK]);
      }
    } catch (error) {
      console.error(error);
      return erro;
    }
  }

  transactionSend = async (mnemonic, coin, address, amount, fee, accessToken) => {
    // try {
      let amountConvert = amount.toString();
      let feeConvert = fee.toString();
      let transactionData;

      if (coin === "btc" || coin === "dash" || coin === "ltc") {
        amountConvert = money.conevertCoin('satoshi', amount);
        feeConvert = money.conevertCoin('satoshi', fee);
        transactionData = {
          mnemonic: mnemonic,
          network: coin,
          testnet: TESTNET,
          toAddress: address,
          amount: amountConvert,
          feePerByte: feeConvert
        };
      } else if (coin === "lns" || coin === "lunes"){
        amountConvert = money.conevertCoin('satoshi', amount);
        feeConvert = money.conevertCoin('satoshi', fee);
        transactionData = {
          mnemonic: mnemonic,
          network: coin,
          testnet: TESTNET,
          toAddress: address,
          amount: amountConvert + feeConvert,
          fee: feeConvert
        };
      } else if (coin === "eth"){
        amountConvert = money.conevertCoin('wei', amount);
        ffeeConvert = money.conevertCoin('wei', fee);
      } else {
        return 'Coin not defined';
      }

      const data = await coins.services.transaction(transactionData, accessToken);

      return data;
    // } catch (error) {
    //   console.error('Method: transactionSend', error);
    //   return error;
    //   //console.log('test');
    //   //throw errorPattern('Error on trying to do the transaction', 500, 'WALLET_TRANSACTION_ERROR', error);
    // }
  }

  // data = { 
  //   network: coin,
  //   testnet: true,
  //   fromAddress: 'mj1oZJa8pphtdjeo51LvEnzxFKHoMcmtFA',
  //   toAddress: 'mqdhezmGxxVYzMnp9TsNU63LBxHEz2RNyD',
  //   amount: 0.0000001
  // }
  getCryptoTx = async (data) => {
    try {
      // let result = await Fee.getNetworkFees({ network: coin });
      let result = await Fee.estimate(data);
      return result;
    } catch (error) {
      console.error('Method: getCryptoTx', error);
      return error;
    }
  }
}
