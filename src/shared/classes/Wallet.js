import { errorPattern } from "Utils/functions";
import { coins, services, networks } from "lunes-lib";
import sb from "satoshi-bitcoin";
import { TESTNET, APICONFIG } from "Config/constants";
import isCoinAvaliable from "Config/isCoinAvaliable";

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
  getAddressesBalance(addresses) {
    try {
      let balances = [];
      for (const coin in addresses) {
        balances[coin] = coins.services.balance({ network: coin, address: addresses[coin], testnet: TESTNET });
      }

      return balances;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  getBalance = async user => {
    try {
      if (typeof user === "string") {
        user = JSON.parse(user);
      }
      // let coinsPrice = await this.getCoinsPrice([
      //   { fromSymbol: "BTC", toSymbol: "BRL,USD" },
      //   { fromSymbol: "LTC", toSymbol: "BRL,USD" },
      //   { fromSymbol: "ETH", toSymbol: "BRL,USD" }
      // ]);
      // this.coinsPrice = coinsPrice;
      let addresses = this.getUserAddresses(user);
      let balance = {};
      //coin = 'btc' (example)
      for (let coin in addresses) {
        coin = coin.toUpperCase();
        //addressKey = 1 (example)
        let i = 0;
        for (let addressKey in addresses[coin]) {
          //we need to upper case it because of our pattern on redux
          let ucCoin = coin.toUpperCase();
          if (isCoinAvaliable(coin) === false) continue;
          //it gets the current addres of the iteration
          let address = addresses[coin][addressKey];
          //it returns a response object
          let response = await coins.services.balance({ network: coin, address, testnet: TESTNET });
          if (response.data) {
            //se não temos nada no objeto
            //então colocamos valores iniciais
            if (!balance[ucCoin]) {
              balance[ucCoin] = {};
              balance[ucCoin]["total_confirmed"] = sb.toSatoshi(0);
              balance[ucCoin]["total_unconfirmed"] = sb.toSatoshi(0);
              balance[ucCoin]["total_amount"] = 0;
            }
            //new total_(un)confirmed
            let confirmed = response.data.confirmed ? response.data.confirmed : 0;
            let unconfirmed = response.data.unconfirmed ? response.data.unconfirmed : 0;
            //it sums the old total_confirmed with the new
            balance[ucCoin]["total_confirmed"] += confirmed;
            balance[ucCoin]["total_unconfirmed"] += unconfirmed;
            //it converts total_(un)confirmed to bitcoin
            balance[ucCoin]["total_unconfirmed"] = sb.toBitcoin(balance[ucCoin]["total_unconfirmed"]);
            balance[ucCoin]["total_confirmed"] = sb.toBitcoin(balance[ucCoin]["total_confirmed"]);

            balance[ucCoin]["total_amount"] = balance[ucCoin]["total_confirmed"] + balance[ucCoin]["total_unconfirmed"];
          }
        }
      }
      return balance;
    } catch (err) {
      throw errorPattern("Error on get balance", 500, "WALLET_GETBALANCE_ERROR", err);
    }
  };
  //"1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD"
  getTxHistory = async ({ network = undefined, address = undefined }) => {
    console.warn(network, address, "NETWORK | ADDRESS");
    if (!network)
      throw errorPattern("getHistory error, you should pass through a network name", 500, "WALLET_GETHISTORY_ERROR");
    // if (!address)
    //   throw errorPattern("getHistory error, you should pass through an address", 500, "WALLET_GETHISTORY_ERROR");

    try {
      return coins.services.history({ network, address, testnet: TESTNET });
    } catch (err) {
      throw console.error(errorPattern("Error on get history", 500, "WALLET_GETHISTORY_ERROR", err));
    }
  };

  getCoinHistory = async object => {
    return await coins.getHistory(object);
  };

  validateAddress = async (address, accessToken) => {
    return await services.wallet.lns.validateAddress(address, accessToken);
  };

  getNewAddress(seed) {
    try {
      return services.wallet.lns.wallet.newAddress(seed, networks[APICONFIG]);
    } catch (error) {
      console.log(error);
    }
  }
}
