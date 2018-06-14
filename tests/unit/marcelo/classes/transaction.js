import { EstimateFee } from 'Classes/crypto';
import { users, coins } from 'lunes-lib';

let Estimate = new EstimateFee;

let coinToTest = 'BTC'; //just change here <<<<<
let ETHtestnetAddress = '0xf4af6cCE5c3e68a5D937FC257dDDb73ac3eF9B3A';
let BTCtestnetAddress = '2N1zumWWHmQnp2CycT4YPvzca57smDzWw1D';

let toAddress;
let fromAddress;
if (coinToTest === 'BTC') {
	toAddress   = BTCtestnetAddress;
	fromAddress = BTCtestnetAddress;
} else if (coinToTest === 'ETH') {
	toAddress   = ETHtestnetAddress;
	fromAddress = ETHtestnetAddress;
}
const calculateFee = (user) => {
	return Promise.resolve(Estimate.go({
		network: coinToTest,
		fromAddress: fromAddress,
		toAddress: toAddress,
		amount: 0.000001,
		accessToken: user.accessToken
	}));
}
const login = () => {
	return users.login({email:'wandyer1@lunes.io', password:'Lunes123#@!'});
}

describe('\x1b[42m CLASSES \x1b[0m', ()=>{
	// it('Should be ok', (done) =>{
	// 	coins.services.networkFees({ network: 'BTC', testnet: true })
	// 		.then((e) => {
	// 			console.log(e);
	// 			done();
	// 		}).catch((e) => {
	// 			done(e);
	// 		});
	// });
	it('Should be alright', (done) => {
		// login().then(e => console.log(JSON.stringify(e,null,2)));
		// done();
		// return;
		login().then(user => {
			console.log('\x1b[32m Fiz o login \x1b[0m');
			calculateFee(user).then((e) => {
				console.log('\x1b[32m Chamei o cf \x1b[0m');
				console.log(e);
				done();
			}).catch((e) => {
				console.log(e);
				done(false);
			});
		}).catch(e => {
			done(e);
		});
		
	});
});
