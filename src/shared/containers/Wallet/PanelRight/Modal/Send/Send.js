import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import style from 'Shared/style-variables';
import { connect } from 'react-redux';
import qrcode from 'qrcode-generator';
import { decrypt } from '../../../../../utils/crypt';
let { networks } = require('lunes-lib')
// import Instascan   from 'instascan';

import {
	InputRadio,
	WrapRadio,
	LabelRadio,
	RadioCheckmark
} from 'Components/forms/input-radio';
import { InputText } from 'Components/forms/input-text';
import { Col, Row, Button } from 'Components/index';
//PRIVATE COMPONENTS
import Hr from '../Hr';
//CUSTOM CSS
import {
	SendButtonCss,
	FirstRowCss,
	ThirdRowCss
} from './css';
import { WalletClass } from '../../../../../classes/Wallet';

let CssWrapper = css`
	transform-origin: top;
	transform: translateY(-100%);
	transition: all 0.3s;
`;

let Image = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 5px;
  margin-bottom: 3px;
`;

class Send extends React.Component {
	constructor(props) {
		super(props);

		this.ref = {};
		this.ref.wrapperQr = React.createRef();
		this.ref.radioCoinAmount = React.createRef();
		this.ref.coinAmount = React.createRef();
		this.ref.address = React.createRef();
		this.ref.brlAmount = React.createRef();
		this.ref.usdAmount = React.createRef();
		this.ref.coinAmount = React.createRef();
		this.ref.sendButton = React.createRef();
		this.ref.wrapper = React.createRef();
		//quantity types: real, dollar, coin
		this.state = {
			stateButtonSend: 'Enviar'
		}
	}

	componentDidMount() {
		this.wrapperQr = ReactDOM.findDOMNode(this.ref.wrapperQr.current);
		this.radioCoinAmount = ReactDOM.findDOMNode(this.ref.radioCoinAmount.current);
		this.coinAmount = ReactDOM.findDOMNode(this.ref.coinAmount.current);
		this.address = ReactDOM.findDOMNode(this.ref.address.current);
		this.brlAmount = ReactDOM.findDOMNode(this.ref.brlAmount.current);
		this.usdAmount = ReactDOM.findDOMNode(this.ref.usdAmount.current);
		this.coinAmount = ReactDOM.findDOMNode(this.ref.coinAmount.current);
		this.sendButton = ReactDOM.findDOMNode(this.ref.sendButton.current);
		this.wrapper = ReactDOM.findDOMNode(this.ref.wrapper.current);

		this.makeQrCode();
		this.arrangeAmountType();

		setTimeout(() => {
			this.animThisComponentIn();
		}, 500);

		this.validateAddress();

		//__________________________________-
		// let scanner = new Instascan.Scanner(document.querySelector('.scan'));
		// scanner.addListener('scan', (content) => {
		// 	console.log(content);
		// });
		// Instascan.Camera.getCameras().then((cameras) => {
		// 	console.log(cameras, "CAMERAS");
		// 	if (cameras.length > 0)
		// 		scanner.start(cameras[0]);
		// 	else
		// 		console.log(`%c Cameras arent found`, 'background: red; color: white;');
		// }).catch((err) => {
		// 	console.log(`%c ${err}`, 'background: red; color: white;');
		// });
	}

	toggleModal = (event) => {
	}

	makeQrCode = () => {
		let qr = qrcode(4, 'L');
		qr.addData('Marcelo Rafael');
		qr.make();
		let img = qr.createSvgTag();
		this.wrapperQr.innerHTML = img;
		let imgEl = this.wrapperQr.children[0];
		imgEl.style.width = '90%';
		imgEl.style.height = 'auto';
	}


	// toggleStateButtonSend = (text, disabled) => {
	// 	if (disabled)
	// 		this.sendButton.style.pointerEvents = 'none';
	// 	else
	// 		this.sendButton.style.pointerEvents = '';
	// 	this.setState({stateButtonSend: text});
	// }

	arrangeAmountType = () => {
		let radios = document.getElementsByName('amount-type');
		Array.from(radios).map((radio) => {
			if (radio.checked) {
				let inputCOIN = document.querySelector('.input-amount.coin');
				let inputBRL = document.querySelector('.input-amount.brl');
				let inputUSD = document.querySelector('.input-amount.usd');
				if (radio.value === 'coin') {
					inputCOIN.removeAttribute('disabled');
					inputBRL.setAttribute('disabled', true);
					inputUSD.setAttribute('disabled', true);
				} else if (radio.value === 'brl') {
					inputBRL.removeAttribute('disabled');
					inputUSD.setAttribute('disabled', true);
					inputCOIN.setAttribute('disabled', true);
				} else if (radio.value === 'usd') {
					inputUSD.removeAttribute('disabled');
					inputBRL.setAttribute('disabled', true);
					inputCOIN.setAttribute('disabled', true);
				}
			}
		});
	}

	handleOnPercentChange = (event) => {
		let element = event.currentTarget;
		let name = element.getAttribute('name');
		let value = element.value;
		let amount = parseFloat(this.props.balance.total_confirmed);
		let result = amount * (parseInt(value) / 100);
		this.coinAmount.value = result;
		this.handleOnAmountChange();
	}

	handleOnAmountChange = (event) => {
		let element;
		if (!event) {
			element = this.coinAmount;
		} else {
			element = event.currentTarget;
		}
		let type = element.getAttribute('data-amount-type');
		let value = element.value;
		let { coinPrice } = this.props;
		let usdResult;
		let coinResult;
		let brlResult;
		const BRLToCOIN = ({ amount, price }) => {
			return amount / price;
		}
		const BRLToUSD = ({ amount, price }) => {
			return amount / price;
		}
		const COINToUSD = ({ amount, price }) => {
			return amount * price;
		}
		const COINToBRL = ({ amount, price }) => {
			return amount * price;
		}
		const USDToBRL = ({ amount, price }) => {
			return amount * price;
		}
		const USDToCOIN = ({ amount, price }) => {
			return amount / price;
		}
		if (type === 'brl') {
			usdResult = BRLToUSD({ amount: parseFloat(value), price: 3.3 });
			coinResult = BRLToCOIN({ amount: parseFloat(value), price: coinPrice.brl });

			if (!usdResult) { usdResult = 0; }
			if (!coinResult) { coinResult = 0; }

			this.usdAmount.value = usdResult.toFixed(2);
			this.coinAmount.value = coinResult.toFixed(8);
		} else if (type === 'coin') {
			usdResult = COINToUSD({ amount: parseFloat(value), price: coinPrice.usd });
			brlResult = COINToBRL({ amount: parseFloat(value), price: coinPrice.brl });

			if (!usdResult) { usdResult = 0; }
			if (!brlResult) { brlResult = 0; }

			this.brlAmount.value = brlResult.toFixed(2);
			this.usdAmount.value = usdResult.toFixed(2);
		} else if (type === 'usd') {
			brlResult = USDToBRL({ amount: parseFloat(value), price: 3.3 });
			coinResult = USDToCOIN({ amount: parseFloat(value), price: coinPrice.usd });

			if (!brlResult) { brlResult = 0; }
			if (!coinResult) { coinResult = 0; }

			this.brlAmount.value = brlResult.toFixed(2);
			this.coinAmount.value = coinResult.toFixed(8);
		}
	}

	animThisComponentIn = () => {
		this.wrapper.style.transform = 'translateY(0px)';
	}
	animThisComponentOut = () => {
		this.wrapper.style.transform = 'translateY(-100%)';
	}

	handleSend = () => {

		let coinAmount = this.coinAmount.value;
		let address = this.address.value;
		console.log(coinAmount);
		if (!coinAmount || !address) return;
		
		let data = this.validateAddress(address) ? false : true;

		console.log("RESULTADO ", data);
		return false;
		const props = {
			...this.props,
			coinAmount,
			address
		}

		setTimeout(() => {
			this.props.nextStep(props);
		}, 500);
		this.animThisComponentOut();
	}

	validateAddress = async (address) => {
		const wallet = new WalletClass();
		let network = networks.LNS;
		let data = await wallet.validateAddress(address, network)

		return data
	}

	render() {
		return (
			<Row css={CssWrapper} ref={this.ref.wrapper}>
				<Col s={9} m={9} l={9}>
					{/*FIRST ROW*/}
					<Row css={FirstRowCss}>
						<Col offset={'s3'} s={6} m={6} l={6}>
							<div>
								<WrapRadio>
									<InputRadio
										name={'amount-type'}
										onChange={this.arrangeAmountType}
										value={'coin'}
										unique={'true'}
									/>
									<RadioCheckmark />
									<LabelRadio clWhite>Quantidade em BTC</LabelRadio>
								</WrapRadio>
							</div>
						</Col>
						<Col s={12} m={6} l={6}>
							<Row defaultAlign={'right'}>
								<InputText
									huge
									phRight
									phWeightLight
									whiteTheme
									txRight
									noBorder
									ref={this.ref.coinAmount}
									onKeyUp={this.handleOnAmountChange}
									data-amount-type={'coin'}
									className={'input-amount coin'}
									placeholder={'0.00000000'} />
							</Row>
							<Row>
								<WrapRadio>
									<InputRadio
										type={'radio'}
										onChange={this.arrangeAmountType}
										value={25}
										name={'percent'}
										unique={'true'}
										onClick={this.handleOnPercentChange}
									/>
									<RadioCheckmark />
									<LabelRadio clWhite >25%</LabelRadio>
								</WrapRadio>
								<WrapRadio>
									<InputRadio
										type={'radio'}
										onChange={this.arrangeAmountType}
										value={50}
										name={'percent'}
										unique={'true'}
										onClick={this.handleOnPercentChange}
									/>
									<RadioCheckmark />
									<LabelRadio clWhite >50%</LabelRadio>
								</WrapRadio>
								<WrapRadio>
									<InputRadio
										type={'radio'}
										value={75}
										name={'percent'}
										unique={'true'}
										onClick={this.handleOnPercentChange}
									/>
									<RadioCheckmark />
									<LabelRadio clWhite >75%</LabelRadio>
								</WrapRadio>
								<WrapRadio>
									<InputRadio
										type={'radio'}
										value={100}
										name={'percent'}
										unique={'true'}
										onClick={this.handleOnPercentChange}
									/>
									<RadioCheckmark />
									<LabelRadio clWhite >100%</LabelRadio>
								</WrapRadio>
							</Row>
						</Col>
					</Row>

					<Hr />

					{/* SECOND ROW */}
					<Row style={{ padding: '3rem 0 3rem 0' }}>
						<Col s={6} m={6} l={6}>
							<WrapRadio>
								<InputRadio
									name={'amount-type'}
									onChange={this.arrangeAmountType}
									value={'brl'}
									unique={'true'}
								/>
								<RadioCheckmark />
								<LabelRadio clWhite>Valor em Reais</LabelRadio>
							</WrapRadio>
							<WrapRadio css={css`margin: 4rem 0 0 0;`}>
								<InputRadio
									onChange={this.arrangeAmountType}
									name={'amount-type'}
									value={'usd'}
									unique={'true'}
								/>
								<RadioCheckmark />
								<LabelRadio clWhite >Valor em Dolar</LabelRadio>
							</WrapRadio>
						</Col>
						<Col s={6} m={6} l={6}>
							<Row defaultAlign={'right'}>
								<InputText
									huge
									phRight
									phWeightLight
									whiteTheme
									txRight
									noBorder
									type={'text'}
									ref={this.ref.brlAmount}
									onKeyUp={this.handleOnAmountChange}
									className={'input-amount brl'}
									data-amount-type={'brl'}
									placeholder={'BRL 0.00'} />
							</Row>
							<Row defaultAlign='right'>
								<InputText
									huge
									phRight
									txRight
									noBorder
									grayTheme
									phMediumFont
									type={'text'}
									ref={this.ref.usdAmount}
									onChange={this.handleOnAmountChange}
									className={'input-amount usd'}
									data-amount-type={'usd'}
									placeholder={'USD 0.00'} />
							</Row>
						</Col>
					</Row>

					<Hr />
					{/*THIRD ROW*/}
					<Row css={ThirdRowCss}>
						<Col s={12} m={12} l={12}>
							<InputText
								normal
								noBorder
								whiteTheme
								type={'text'}
								ref={this.ref.address}
								placeholder={'Endereço'} />
						</Col>
					</Row>

					<Hr />
					{/*FOURTH ROW*/}
					<Row>
						<Col>

						</Col>
					</Row>
				</Col>


				{/*BUTTONS COL*/}
				<Col defaultAlign={'center'} s={6} m={3} l={2}>
					<Row>
						<Button
							css={SendButtonCss}
							blockCenter
							clWhite
							bgNormalYellow
							onClick={this.handleSend}
							innerRef={this.ref.sendButton}>
							Enviar
						</Button>
					</Row>
					<Row>
						<Button
							innerRef={this.ref.wrapperQr}
							blockCenter
							clWhite
							bgWhite >
							QR Code
						</Button>
					</Row>
					<div className={'scan'} style={{ width: '100px', height: '100px' }}>
					</div>
				</Col>
			</Row>
		);
	}
}
export default Send;
/*
const mapStateToProps = (state) => {
	return {
		wallet: state.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalSend);
*/
