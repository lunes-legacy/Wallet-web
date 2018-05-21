import { coins } from 'lunes-lib';
import { WalletClass } from 'Classes/Wallet';

const Wallet   = new WalletClass();
let user       = '{"_id":"5afc4dd1eb40bcbca23f92ad","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0ZGQxZWI0MGJjYmNhMjNmOTJhZCIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjY5MDY2ODksImV4cCI6MTUyNjkxMzg4OX0.dpo_eqsJkwUWvQ1fkuClL0bPlTdnkmXGqXuyr1B9yks","email":"wandyer1@lunes.io","fullname":"Wandyer Silva","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","confirmIcoTerm":false,"ownCoupon":"5SLBR768","coupon":"","whitelist":false,"pinIsValidated":false,"phoneIsValidated":false,"twofaEnabled":false,"wallet":{"hash":"skull ticket hidden split couch orient season tooth valley learn edge truck","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"ltc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"dash","currentIndex":0,"addresses":[{"index":0,"address":"yUBEQnE5Xz62qCBFFy3CsqMNSggLL2VJGQ","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"eth","currentIndex":0,"addresses":[{"index":0,"address":"0x4E3f5C5DEBf6cF3B6468407fD2D8379EB6725197","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"}]},"depositWallet":{}}';
user           = JSON.parse(user);
let btcAddress = 'moNjrdaiwked7d8jYoNxpCTZC4CyheckQH';

describe('Lunes-lib.coin.services.balance()', function() {
	it('BALANCE - It should return balance without error', function (done) {
		//For now we have BTC and ETH
		Wallet.getBalance(user)
			.then(e => {
				console.log(e);
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
	});
});