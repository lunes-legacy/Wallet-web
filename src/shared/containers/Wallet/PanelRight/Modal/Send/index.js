import React       from 'react';
import ReactDOM    from 'react-dom';
import styled, { css }      from 'styled-components';
import style       from 'Shared/style-variables';
import { connect } from 'react-redux';
import qrcode from 'qrcode-generator';
import { coins, users } from 'lunes-lib';

import { 
	InputRadio, 
	WrapRadio, 
	LabelRadio, 
	RadioCheckmark }   from 'Components/forms/input-radio';
import { InputText } from 'Components/forms/input-text';
import { Col, Row, Button } from 'Components/index';

//PRIVATE COMPONENTS
import Background  from '../Background';
import Close       from '../Close';
import Content     from '../Content';
import Foot        from '../Foot';
import Head        from '../Head';
import Hr          from '../Hr';
import IconCoin    from '../IconCoin';
import StyledModal from '../StyledModal';
//CUSTOM CSS
import { 
	SendButtonCss, 
	FirstRowCss, 
	ThirdRowCss } from './css';


class ModalSend extends React.Component {
	constructor(props) {
		super(props);

		this.ref = {};
		this.ref.wrapperQr       = React.createRef();
		this.ref.radioCoinAmount = React.createRef();
		this.ref.coinAmount      = React.createRef();
		this.ref.address         = React.createRef();
		this.ref.brlAmount       = React.createRef();
		this.ref.usdAmount       = React.createRef();
		this.ref.coinAmount      = React.createRef();
		//quantity types: real, dollar, coin
	}
	componentDidMount() {
		this.wrapperQr       = ReactDOM.findDOMNode(this.ref.wrapperQr.current);
		this.radioCoinAmount = ReactDOM.findDOMNode(this.ref.radioCoinAmount.current);
		this.coinAmount      = ReactDOM.findDOMNode(this.ref.coinAmount.current);
		this.address         = ReactDOM.findDOMNode(this.ref.address.current);
		this.brlAmount       = ReactDOM.findDOMNode(this.ref.brlAmount.current);
		this.usdAmount       = ReactDOM.findDOMNode(this.ref.usdAmount.current);
		this.coinAmount      = ReactDOM.findDOMNode(this.ref.coinAmount.current);

		this.makeQrCode();
		this.arrangeAmountType();
	}
	toggleModal = (event) => {

	}
	makeQrCode = () => {
		let qr = qrcode(4, 'L');
		qr.addData('Marcelo Rafael');
		qr.make();
		let img   = qr.createSvgTag();
		this.wrapperQr.innerHTML = img;
		let imgEl = this.wrapperQr.children[0];
		imgEl.style.width  = '90%';
		imgEl.style.height = 'auto';
	}
	handleSend = async () => {
		let user = await users.login({email: 'wandyer1@lunes.io', password: 'Lunes123#@!'});
		// let coinAmount = this.coinAmount.value;
		let coinAmount = 0.0001;
		// let address    = this.address.value;
		let address    = 'myaj43o2wt34j31ej5pmP6htCHFafAKoeP';
		let network    = 'btc';
		let testnet    = true;
		let userAddress = user.wallet.coins[0].addresses[0].address;
		let accessToken = user.accessToken;
		console.log(coins, "COINS");
		return;
		let fees       = await coins.services.networkFees({
			network,
			testnet
		});
		let amountBTC     = coinAmount;
		let amountSTH     = coins.util.unitConverter.toSatoshi(coinAmount);
		let dataHighEstimate = {
			network,
			testnet,
			toAddress: address,
			fromAddress: userAddress,
			amount: amountSTH,
			feePerByte: fees.data.high
		};
		let highResult = await coins.services.estimateFee(
			dataHighEstimate,
			accessToken
		);
		console.log(`%c${highResult}`, 'background: lightyellow; color: black;');
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
		console.log(`%c${result}`, 'font-size: 20px; color: lightgreen; background: indianred;');
	}
	arrangeAmountType = () => {
		let radios = document.getElementsByName('amount-type');
		Array.from(radios).map((radio) => {
			console.log(radio, radio.checked);
			if (radio.checked) {
				let inputCOIN = document.querySelector('.input-amount.coin');
				let inputBRL  = document.querySelector('.input-amount.brl');
				let inputUSD  = document.querySelector('.input-amount.usd');
				if (radio.value === 'coin') {
					inputCOIN.removeAttribute('disabled');
					inputBRL.setAttribute('disabled',  true);
					inputUSD.setAttribute('disabled',  true);
				} else if (radio.value === 'brl') {
					inputBRL.removeAttribute('disabled');
					inputUSD.setAttribute('disabled',  true);
					inputCOIN.setAttribute('disabled', true);
				} else if (radio.value === 'usd') {
					inputUSD.removeAttribute('disabled');
					inputBRL.setAttribute('disabled',  true);
					inputCOIN.setAttribute('disabled', true);
				}
			}
		});
		console.log('----------------------------');
	}
	handleOnPercentChange = (event) => {
		let element = event.currentTarget;
		let name    = element.getAttribute('name');
		let value   = element.value;
		let amount  = parseFloat(this.props.balance.total_confirmed);
		let result  = amount * (parseInt(value) / 100);
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
		let type      = element.getAttribute('data-amount-type');
		let value     = element.value;
		let { coinPrice } = this.props;
		let usdResult;
		let coinResult;
		let brlResult;
		const BRLToCOIN = ({amount, price}) => {
			return amount / price;
		}
		const BRLToUSD = ({amount, price}) => {
			return amount / price;
		}	
		const COINToUSD = ({amount, price}) => {
			return amount * price;
		}
		const COINToBRL = ({amount, price}) => {
			return amount * price;
		}
		const USDToBRL = ({amount, price}) => {
			return amount * price;
		}
		const USDToCOIN = ({amount, price}) => {
			return amount / price;
		}
		if (type === 'brl') {
			usdResult   =  BRLToUSD({amount: parseFloat(value), price: 3.3});
			coinResult  =  BRLToCOIN({amount: parseFloat(value), price: coinPrice.brl});

			if (!usdResult)  { usdResult  = 0; }
			if (!coinResult) { coinResult = 0; }

			this.usdAmount.value  = usdResult.toFixed(2);
			this.coinAmount.value = coinResult.toFixed(8);
		} else if (type === 'coin') {
			usdResult   =  COINToUSD({amount: parseFloat(value), price: coinPrice.usd});
			brlResult   =  COINToBRL({amount: parseFloat(value), price: coinPrice.brl});

			if (!usdResult)  { usdResult = 0; }
			if (!brlResult)  { brlResult = 0; }

			this.brlAmount.value = brlResult.toFixed(2);
			this.usdAmount.value = usdResult.toFixed(2);
		} else if (type === 'usd') {
			brlResult   =  USDToBRL({amount: parseFloat(value), price: 3.3});
			coinResult  =  USDToCOIN({amount: parseFloat(value), price: coinPrice.usd});

			if (!brlResult)  { brlResult = 0; }
			if (!coinResult) { coinResult = 0; }

			this.brlAmount.value  = brlResult.toFixed(2);
			this.coinAmount.value = coinResult.toFixed(8);
		}
	}
	render() {
		return(
			<Background>
				<StyledModal className={'js-modal-send'}>
					<Close>X</Close>

					<Head>
						<IconCoin src={'/img/bitcoin.svg'}/>
					</Head>

					<Content>
						<Row>
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
												<RadioCheckmark/>
												<LabelRadio clWhite >Quantidade em BTC</LabelRadio>
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
													placeholder={'0.00000000'}/>
										</Row>
										<Row>
											<WrapRadio>
												<InputRadio
													type={'radio'}
													value={25}
													name={'percent'}
													unique={'true'}
													onClick={this.handleOnPercentChange}
												/>
												<RadioCheckmark/>
												<LabelRadio clWhite >25%</LabelRadio>
											</WrapRadio>
											<WrapRadio>
												<InputRadio
													type={'radio'}
													value={50}
													name={'percent'}
													unique={'true'}
													onClick={this.handleOnPercentChange}
												/>
												<RadioCheckmark/>
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
												<RadioCheckmark/>
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
												<RadioCheckmark/>
												<LabelRadio clWhite >100%</LabelRadio>
											</WrapRadio>
										</Row>
									</Col>
								</Row>

								<Hr/>

								{/* SECOND ROW */}
								<Row style={{padding: '3rem 0 3rem 0'}}>
									<Col s={6} m={6} l={6}>
											<WrapRadio>
												<InputRadio
													name={'amount-type'}
													onChange={this.arrangeAmountType}
													value={'brl'}
													unique={'true'}
												/>
												<RadioCheckmark/>
												<LabelRadio clWhite >Quantidade em real</LabelRadio>
											</WrapRadio>
											<WrapRadio css={css`margin: 4rem 0 0 0;`}>
												<InputRadio
													name={'amount-type'}
													onChange={this.arrangeAmountType}
													value={'usd'}
													unique={'true'}
												/>
												<RadioCheckmark/>
												<LabelRadio clWhite >Quantidade em dólar</LabelRadio>
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
													placeholder={'BRL 0.00'}/>
										</Row>
										<Row defaultAlign='right'>
											<InputText
												huge
												phRight
												phWeightLight
												whiteTheme
												txRight
												noBorder
												type={'text'}
												ref={this.ref.usdAmount}
												onChange={this.handleOnAmountChange}
												className={'input-amount usd'}
												data-amount-type={'usd'}
												placeholder={'USD 0.00'}/>
										</Row>
									</Col>
								</Row>

								<Hr/>
								{/*THIRD ROW*/}
								<Row css={ThirdRowCss}>
									<Col s={12} m={12} l={12}>
										<InputText
												normal
												whiteTheme
												txRight
												type={'text'}
												ref={this.ref.address}
												placeholder={'Endereço'}/>
									</Col>
								</Row>

								<Hr/>
								{/*FOURTH ROW*/}
								<Row>
									<Col></Col>
								</Row>
							</Col>


							{/*BUTTONS COL*/}
							<Col 
								defaultAlign={'center'} 
								s={3} m={3} l={3}>
								<Row>
									<Button 
										css={SendButtonCss} 
										blockCenter 
										clWhite 
										bgNormalYellow 
										onClick={this.handleSend}>
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
							</Col>
						</Row>
					</Content>

					<Foot>
					</Foot>
				</StyledModal>
			</Background>
		);
	}
}
export default ModalSend;
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