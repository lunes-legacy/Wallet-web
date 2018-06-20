import React from 'react';
import { findDOMNode } from 'react-dom';
import { timer } from 'Utils/functions';
//COMPONENTS
import { Text, Col, Row, Img } from 'Components';
import { css }  from 'styled-components';

import { TESTNET } from 'Config/constants';


let CssWrapper = css`
	transform: translateY(-100%);
	transform-origin: top;
	transition: all 0.3s;
`;

class Loading extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			coinAmount: 0,
			blocked: true
		};

		this.ref = {};
		this.ref.wrapper    = React.createRef();
		this.ref.coinAmount = React.createRef();
	}
	animThisComponentIn = () => {
		this.wrapper.style.transform = 'translateY(0px)';
	}
	animThisComponentOut = () => {
		this.wrapper.style.transform = 'translateY(-100%)';
	}
	componentDidMount() {
		this.wrapper    = findDOMNode(this.ref.wrapper.current);
		this.coinAmount = findDOMNode(this.ref.coinAmount.current);

		setTimeout(() => {
			this.animThisComponentIn();
			setTimeout(() => {
				this.animCoinComponent();
			}, 300);
		}, 100);
		this.send();
	}
	animCoinComponent = async () => {
		let targetAmount = parseFloat(this.props.coinAmount);
		let currAmount   = 0;
		let prevAmount   = 0;
		//incremetador é de 10% sobre o valor total
		let increaser    = targetAmount * 0.01;
		while (true) {
			currAmount = currAmount + increaser;
			if (prevAmount >= targetAmount) {
				this.coinAmount.textContent = targetAmount.toFixed(8);
				this.setState({blocked: false});
				break;
			}
			await timer(20);
			this.coinAmount.textContent = parseFloat(currAmount).toFixed(8);
			prevAmount = currAmount;
		}
	}
	send = async () => {

		let interval = setInterval(async () => {
			if (this.state.blocked) return;
			clearInterval(interval);
			await timer(1000);
			this.animThisComponentOut();
			this.props.nextStep();
		}, 500);


	    

		// 	this.animThisComponentOut();
		// 	this.props.nextStep();
		return;


		// let user = await users.login({email: 'wandyer1@lunes.io', password: 'Lunes123#@!'})
		let user        = JSON.parse('{"_id":"5afc4dd1eb40bcbca23f92ad","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZmM0ZGQxZWI0MGJjYmNhMjNmOTJhZCIsInBob25lVmVyaWZpZWQiOm51bGwsInBpbiI6bnVsbCwidHdvZmFFbmFibGVkIjpudWxsLCJpYXQiOjE1MjY0OTE1NTksImV4cCI6MTUyNjQ5ODc1OX0.j3auLkqjsjKmuZyCfMezrJTElSNbkJTOfQvkjJ7uxYc","email":"wandyer1@lunes.io","fullname":"Wandyer Silva","avatar":{"small":""},"homeAddress":"","phoneNumber":"","city":"","state":"","country":"","birthDate":"","confirmIcoTerm":false,"ownCoupon":"5SLBR768","coupon":"","whitelist":false,"pinIsValidated":false,"phoneIsValidated":false,"twofaEnabled":false,"wallet":{"hash":"skull ticket hidden split couch orient season tooth valley learn edge truck","coins":[{"symbol":"btc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"ltc","currentIndex":0,"addresses":[{"index":0,"address":"moNjrdaiwked7d8jYoNxpCTZC4CyheckQH","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"dash","currentIndex":0,"addresses":[{"index":0,"address":"yUBEQnE5Xz62qCBFFy3CsqMNSggLL2VJGQ","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"},{"symbol":"eth","currentIndex":0,"addresses":[{"index":0,"address":"0x4E3f5C5DEBf6cF3B6468407fD2D8379EB6725197","createdAt":"2018-05-16T15:27:12.896Z"}],"createdAt":"2018-05-16T15:27:12.896Z"}]},"depositWallet":{}}');
		// let coinAmount = this.coinAmount.value;
		let coinAmount  = 0.0001;
		// let address    = this.address.value;
		let address     = 'myaj43o2wt34j31ej5pmP6htCHFafAKoeP';
		let network     = 'btc';
		let testnet     = TESTNET;
		let userAddress = user.wallet.coins[0].addresses[0].address;
		let accessToken = user.accessToken;
		// console.log(`%cUsuário logado ${JSON.stringify(user, null, 2)}`, 'background: lightgreen; color: black;');
		
		// let fees       = await coins.services.networkFees({
		// 	network,
		// 	testnet
		// });
		// console.log(`%c${JSON.stringify(fees, null, 2)} fees`, 'background: lightyellow; color: black;');
		// let amountBTC     = coinAmount;
		// let amountSTH     = coins.util.unitConverter.toSatoshi(coinAmount);
		// let dataHighEstimate = {
		// 	network,
		// 	testnet,
		// 	toAddress: address,
		// 	fromAddress: userAddress,
		// 	amount: amountSTH,
		// 	feePerByte: fees.data.high
		// };
		// let highResult = await coins.services.estimateFee(
		// 	dataHighEstimate,
		// 	accessToken
		// );
		// console.log(`%c${JSON.stringify(highResult)}`, 'background: lightblue; color: black;');
		let txData = {
			network,
			testnet,
			toAddress: address,
			amount: amountSTH.toString(),
			feePerByte: dataHighEstimate.feePerByte.toString()
		}
		let result     = await coins.services.transaction(
			txData,
			accessToken
		);
		console.log(`%c${JSON.stringify(result)}`, 'font-size: 20px; color: lightgreen; background: indianred;');
		// this.props.nextStep(this.props);
	}
	render() {
		return(
			<Row css={CssWrapper} ref={this.ref.wrapper} defaultAlign={'center'}>
				<Col s={12} m={6} l={6}>
					<Img center width={'10rem'} src={'/img/app_wallet/ic_enviado_.svg'}/>
					<Text margin={'1rem 0 1rem 0'} txCenter clWhite size={'3rem'}>You're seding</Text>
					<Text ref={this.ref.coinAmount} margin={'0 0 1rem 0'} txCenter clNormalGreen size={'2.5rem'}></Text>
					<Text txCenter clWhite size={'2.5rem'}>Address</Text>
					<Text txCenter clWhite size={'2rem'}>{this.props.address}</Text>
				</Col>
			</Row>
		);
	}
}

export default Loading;
