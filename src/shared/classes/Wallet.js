import { errorPattern } from 'Utils/functions';
import { coins } from 'lunes-lib';
import sb from 'satoshi-bitcoin';

export class WalletClass {
	static coinsPrice;

	getCoinsPrice = async (data) => {
		// EX: data = {
		// 	{fromSymbol, toSymbol, exchange= 'CCCAGG'}
		// }
		try {
			let coinsPrice = {};
			for (let coinKey in data) {
				coinsPrice[data[coinKey].fromSymbol.toLowerCase()] = await coins.getPrice(data[coinKey]);
			}
			return coinsPrice;
		} catch(err) {
			return errorPattern(`Error on trying to get price`, 500, 'COINGETPRICE_ERROR', err);
		}
	}
	/*
		@param user: typically it comes from cookies
		returns: {btc: ['address','address', ...]}
	*/
	getUserAddresses = (user) => {
		try {
			let addresses = {};
			//(example): @param coin = {symbol: 'btc', createdAt: [timestamp], etc..} 
			user.wallet.coins.map((coin) => {
				//if addresses does not have {addresses['btc'] (example)} as attribute, so:
				if (!addresses[coin.symbol]) {
					addresses[coin.symbol] = [];
				}
				//we get the ${addresses[coin.symbol]} array, and we push an address to it
				coin.addresses.map((obj) => {
					addresses[coin.symbol].push(obj.address);
				});
			});
			return addresses;
		} catch (err) {
			return errorPattern('Was not possible get user addresses',500,'WALLET_GETUSERADDRESS_ERROR', err);
		}
	}
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
	getBalance = async (user) => {
		try {
			let coinsPrice = await this.getCoinsPrice([
				{fromSymbol: 'BTC', toSymbol: 'BRL,USD'},
				{fromSymbol: 'LTC', toSymbol: 'BRL,USD'},
				{fromSymbol: 'ETH', toSymbol: 'BRL,USD'},
			]);
			this.coinsPrice = coinsPrice;
			let addresses   = this.getUserAddresses(user);
			let balance     = {};
			let token       = user.accessToken;
			//coin = 'btc' (example)
			for (let coin in addresses) {
				//addressKey = 1 (example)
				let i = 0;
				for (let addressKey in addresses[coin]) {
					//it gets the current addres of the iteration
					let address        = addresses[coin][addressKey];
					//it returns a response object
					let response       = await coins.bitcoin.getBalance({ address }, token);
					if (response.status === 'success') {
						if (!balance[coin]) {
							balance[coin] = {};
							balance[coin]['total_confirmed']   = sb.toSatoshi(0);
							balance[coin]['total_unconfirmed'] = sb.toSatoshi(0);
							balance[coin]['total_amount']            = 0;
						}
						//it sums the old total_confirmed with the new
						balance[coin]['total_confirmed']   += sb.toSatoshi(response.data.confirmed_balance);
						balance[coin]['total_unconfirmed'] += sb.toSatoshi(response.data.unconfirmed_balance);
						//it converts total_confirmed to bitcoin
						balance[coin]['total_unconfirmed'] = sb.toBitcoin(balance[coin]['total_unconfirmed']);
						balance[coin]['total_confirmed']   = sb.toBitcoin(balance[coin]['total_confirmed']);
						balance[coin]['total_amount']      = balance[coin]['total_confirmed'] * coinsPrice[coin]['USD'];
					}
				}
			}
			return balance;
		} catch(err) {
			return errorPattern('Error on get balance',500,'WALLET_GETBALANCE_ERROR', err);
		}
	}

	getHistory = async ({address='1Q7Jmho4FixWBiTVcZ5aKXv4rTMMp6CjiD', accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGYzNTZlZjI2Mjk0MGRhMDY0N2M0NSIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjQ3NTAwNTEsImV4cCI6MTUyNDc1NzI1MX0.ONXUF-aaaO17xCf1L3EXwzZ1oWZ_2EMdQw-0uPvJyHo'}) => {
		try {
			return coins.bitcoin.getHistory({address}, accessToken);
		} catch (err) {
			return errorPattern('Error on get history', 500, 'WALLET_GETHISTORY_ERROR', err);
		}
	}
};