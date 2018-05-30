import { coins } from 'lunes-lib';
import LunesCore from 'lunes-lib';
import { WalletClass } from 'Classes/Wallet';

const Wallet   = new WalletClass();
let user       = '{"_id":"5afc4dd1eb40bcbca23f92ad","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0ZGQxZWI0MGJjYmNhMjNmOTJhZCIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjY5MDY2ODksImV4cCI6MTUyNjkxMzg4OX0.dpo_eqsJkwUWvQ1fkuClL0bPlTdnkmXGqXuyr1B9yks","email":"wandyer1@lunes.io","fullname":"Wandyer Silva","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","confirmIcoTerm":false,"ownCoupon":"5SLBR768","coupon":"","whitelist":false,"pinIsValidated":false,"phoneIsValidated":false,"twofaEnabled":false,"wallet":{"hash":"skull ticket hidden split couch orient season tooth valley learn edge truck","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"ltc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"dash","currentIndex":0,"addresses":[{"index":0,"address":"yUBEQnE5Xz62qCBFFy3CsqMNSggLL2VJGQ","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"eth","currentIndex":0,"addresses":[{"index":0,"address":"0x4E3f5C5DEBf6cF3B6468407fD2D8379EB6725197","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"}]},"depositWallet":{}}';
user           = JSON.parse(user);
let btcAddress = 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH';
describe(`\x1b[42m /src/shared/classes/Wallet \x1b[0m`, function() {
	let balance;
	it('BALANCE - It should return balance without error', function (done) {
		done();       // PULANDO...
		return false; // SÓ POR GARANTIA

		//For now we have BTC and ETH
		Wallet.getBalance(user)
			.then(e => {
				console.log(e);
				balance = e;
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
	});
	it('TRANSACTION HISTORY - It should be normal, with no errors', function(done) {
		done();       // PULANDO...
		return false; // SÓ POR GARANTIA

		Wallet.getTxHistory({
			address: btcAddress,
			coin: 'btc'
		}).then(e => {
			console.log(JSON.stringify(e, null, 1));
			if (e && e.data && e.data.history)
				done()
			else
				done(false)
		}).catch(e => {
			console.log(JSON.stringify(e, null, 1));
			done(false);
		});
		// {
		//  "network": "BTCTESTNET",
		//  "data": {
		//   "address": "moNjrdaiwked7d8jYoNxpCTZC4CyheckQH",
		//   "history": [
		// 	  {
		// 	    "type": "RECEIVED",
		// 	    "otherParams": {},
		// 	    "txid": "7ed84031a8ee7a5c4039ce84250f5737e7299e9cf80beec8da731dfdf2b74369",
		// 	    "date": 1517446725,
		// 	    "blockHeight": 1261725,
		// 	    "nativeAmount": 200000000,
		// 	    "networkFee": 100000
		// 	  },
		//    ....
		//   ],
		//  }
		// }
	});
	it('COIN HISTORY - It should be normal, with no errors', function(done) {
		done();       // PULANDO...
		return false; // SÓ POR GARANTIA
		
		Wallet.getCoinHistory({
			fromDate: '01/05/2018',
			toDate: '21/05/2018',
			fromSymbol: 'BTC',
			toSymbol: 'USD'
		}).then(e => {
			console.log(JSON.stringify(e, null, 1));
			if (e && e.data)
				done()
			else
				done(false)
		}).catch(e => {
			console.log(JSON.stringify(e, null, 1));
			done(false);
		});
		// {
		//  "success": true,
		//  "status": 200,
		//  "message": "Historical chart - BTC to USD",
		//  "data": [
		//   {
		//    "time": 1526839200,
		//    "close": 8524.51
		//   },
		//   ...
		//  ]
		// }
	});
	it('USD PRICE should be good', (done) => {
		done();
		return false;
		coins.getPrice({fromSymbol:'USD',toSymbol:'BRL,EUR'})
			.then((e) => {
				console.log(e);
				done();
			}).catch((err) => {
				console.log(err);
				done(false);
			});
	});
	it('BRL PRICE should be good', (done) => {
		done();
		return false;
		coins.getPrice({fromSymbol:'BRL',toSymbol:'USD,EUR'})
			.then((e) => {
				console.log(e);
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
	});
	it('EUR PRICE should be good', (done) => {
		done();
		return false;
		coins.getPrice({fromSymbol:'EUR',toSymbol:'USD,BRL'})
			.then((e) => {
				console.log(e);
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
	});
	it('BRL PRICE FROM WalletClass, should be good', (done) => {
		Wallet.getCoinsPrice({brl:{fromSymbol:'BRL',toSymbol:'USD,EUR'}})
			.then((e) => {
				console.log(e);
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
	});
});
