import { errorPattern } from "Utils/functions";
import { coins }        from "lunes-lib";
import sb               from "satoshi-bitcoin";
import { testnet }      from 'Config/constants';
import isCoinAvaliable  from 'Config/isCoinAvaliable';
// console.log(testnet, "TESTNET <<<<");
export class WalletClass {
  static coinsPrice;

  //for now, we arent using this
  getCoinsPrice = async (data = {
    btc: {fromSymbol: 'BTC', toSymbol:'USD'},
    eth: {fromSymbol: 'ETH', toSymbol:'USD'}
  }) => {
    try {
      let coinsPrice = {};
      for (let coinKey in data) {
        coinsPrice[data[coinKey].fromSymbol.toLowerCase()] = await coins.getPrice(data[coinKey]);
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
      let addresses   = this.getUserAddresses(user);
      let balance     = {};
      //coin = 'btc' (example)
      for (let coin in addresses) {
        //addressKey = 1 (example)
        let i = 0;
        for (let addressKey in addresses[coin]) {
          if (isCoinAvaliable(coin) === false) continue;
          //it gets the current addres of the iteration
          let address = addresses[coin][addressKey];
          //it returns a response object
          let response = await coins.services.balance({ network: coin, address, testnet });
          if (response.data) {
            //se não temos nada no objeto
            //então colocamos valores iniciais
            if (!balance[coin]) {
              balance[coin] = {};
              balance[coin]["total_confirmed"]   = sb.toSatoshi(0);
              balance[coin]["total_unconfirmed"] = sb.toSatoshi(0);
              balance[coin]["total_amount"]      = 0;
            }
            //new total_(un)confirmed
            let confirmed   = response.data.confirmed  ? response.data.confirmed : 0;
            let unconfirmed = response.data.unconfirmed ? response.data.unconfirmed : 0;
            //it sums the old total_confirmed with the new
            balance[coin]["total_confirmed"]   += confirmed;
            balance[coin]["total_unconfirmed"] += unconfirmed;
            //it converts total_(un)confirmed to bitcoin
            balance[coin]["total_unconfirmed"] = sb.toBitcoin(balance[coin]["total_unconfirmed"]);
            balance[coin]["total_confirmed"]   = sb.toBitcoin(balance[coin]["total_confirmed"]);

            balance[coin]["total_amount"]      = balance[coin]["total_confirmed"] + balance[coin]["total_unconfirmed"];
          }
        }
      }
      return balance;
    } catch (err) {
      throw errorPattern("Error on get balance", 500, "WALLET_GETBALANCE_ERROR", err);
    }
  };
  //"1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD"
  getHistory = async ({
    coin = undefined,
    address = undefined
  }) => {
    if (!coin) 
      throw errorPattern("getHistory error, you should pass through a coin name", 500, "WALLET_GETHISTORY_ERROR");
    if (!address) 
      throw errorPattern("getHistory error, you should pass through an address", 500, "WALLET_GETHISTORY_ERROR");

    try {
      return coins.services.history({ network: coin, address, testnet });
    } catch (err) {
      return errorPattern("Error on get history", 500, "WALLET_GETHISTORY_ERROR", err);
    }
  };

  getCoinHistory = async (object) => {
    return await coins.getHistory(object);
  };
}
