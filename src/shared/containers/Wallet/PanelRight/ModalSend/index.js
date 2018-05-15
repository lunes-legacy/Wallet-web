import React       from 'react';
import ReactDOM    from 'react-dom';
import styled, { css }      from 'styled-components';
import style       from 'Shared/style-variables';
import { connect } from 'react-redux';

import { InputBase } from 'Components/forms/bases';
import { TextBase } from 'Components';
// import { Row } from 'react-materialize';
// import { Input, Col, Row } from 'Components/materialize';
import { H1 } from 'Components/H1';
import { Text } from 'Components/Text';
import { Col, Row, Input, Button } from 'Components/index';
import qrcode from 'qrcode-generator';

let Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	background: ${style.rgba(style.darkLilac, 0.8)};
	z-index: 1000;
	@media (min-width: 601px) {
		align-items: center;
	}
	& * {
		overflow: visible;
	}
`;
let StyledModal = styled.div`
	width: 100%;
	height: calc(100% - 75px);
	min-width: 320px;
	min-height: 480px;
	position: relative;
	background: ${style.normalLilac};
	border-radius: 10px;
	padding: 3rem;
	@media (min-width: 601px) {
		width: 70%;
		height: 70%;
		margin-top: 75px;
	}
`;
let Close   = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 2rem;
	color: white;
	cursor: pointer;
`;
let Head    = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 100%;
	background: ${style.normalLilac};
	position: absolute;
	top: -75px;
	left: calc(50% - 75px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	overflow: visible;
`;
let IconCoin = styled.img`
	width: 60%;
	height: 60%;
`;
let Content = styled.div`
	overflow: auto;
	margin: 75px 0 0 0;
`;
let Foot    = styled.div``;

let Hr = styled.hr`
	border: 0.7px solid ${style.darkLilac};
`;


let SendButtonCss = css`
	margin: 0 auto 20px auto;
`;
let FirstRowCss = css`
	margin-top: 3rem;
	margin-bottom: 3rem;
`;
let ThirdRowCss = css`
	padding: 25px 0 25px 0;
`;
let InputText = styled.input`
	appearence: textfield;
	padding: 0.5rem;
	z-index: 2;
	overflow-x: auto;
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: white;
		${props => {
			if (props.phRight) {
				return 'text-align: right;';
			} else if(props.phCenter) {
				return 'text-align: center;';
			}
		}}
		${props => {
			if (props.phWeightBold) {
				return 'font-weight: bold;';
			} else if (props.phWeightLight) {
				return 'font-weight: 100;';
			}
		}}
		${props => {
			if (props.phStyleItalic)
				return 'font-style: italic;';
		}}
	}
	${InputBase};
	${props => {
		if (props.whiteTheme) {
			return `
				border-color: white;
				color: white;
				& + label {
					color: white;
					border-color: white;
					text-shadow: 0px 0px 0px white;
				}`;
		} else if (props.darkLilacTheme) {
			return `
				border-color: ${style.darkLilac};
				color: ${style.lightLilac};
				& + label {
					color: ${style.darkLilac};
					border-color: ${style.darkLilac};
					text-shadow: 0px 0px 0px ${style.darkLilac};
				}`;
		} else if (props.lightLilacTheme) {
			return `
				border-color: ${style.lightLilac};
				color: white;
				& + label {
					color: ${style.lightLilac};
					border-color: ${style.lightLilac};
					text-shadow: 0px 0px 0px ${style.lightLilac};
				}`;
		}
	}}
	${props => props.css ? props.css : ''};
`;


let InputRadio = styled.input.attrs({
	type: 'radio'
})`
	opacity: 0;
	cursor: pointer;
	display: inline;
	z-index: 2;
	&:checked ~ .checkmark {
		opacity: 1;
	}
`;
let RadioCheckmark = styled.div.attrs({
	className: 'checkmark'
})`
		z-index: 1;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		background: dodgerblue;
		top: 0px;
		left: 0px;
		opacity: 0;
		position: absolute;
`;
let WrapRadio = styled.div`
	width: 100%;
	height: auto;
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;
	&:hover .checkmark {
		opacity: 1;
	}
`;
let Label = styled.label`
	${TextBase}
	display: inline;
`;

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
		console.log(this.coinAmount.getAttribute('value'));
		let coinAmount = this.coinAmount.value;
		let address    = this.address.value;
		let result = await this.props.send({coinAmount, address});
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
												<InputRadio/>
												<RadioCheckmark/>
												<Label>Mordecai</Label>
											</WrapRadio>

											<input
												type={'radio'}
												name={'amount-type'}
												onChange={this.arrangeAmountType}
												value={'coin'}
												unique={'true'}/>
												<label>Quantidade em BTC</label>
										</div>
										{/*<Input 
											normal 
											s={12} 
											innerRef={this.ref.radioCoinAmount}
											type={'radio'}
											name={'amount'}
											data-amount-type={'coin'}
											label={{value: 'Quantidade BTC'}}/>*/}
									</Col>
									<Col s={12} m={6} l={6}>
										<Row defaultAlign={'right'}>
											{/*<Input 
												huge 
												phRight 
												noBorder 
												whiteTheme 
												innerRef={this.ref.coinAmount}
												type={'text'} 
												onKeyUp={this.handleOnAmountChange}
												data-amount-type={'coin'}
												placeholder={'0.00000000'} 
												fontSize={'4rem'} 
												s={12} m={12} l={12}/>*/}
												<InputText
													phRight
													phWeightLight
													whiteTheme
													txRight
													noBorder
													type={'text'} 
													ref={this.ref.coinAmount}
													onKeyUp={this.handleOnAmountChange}
													data-amount-type={'coin'}
													className={'input-amount coin'}
													placeholder={'0.00000000'} 
												/>
										</Row>
										<Row>
											<input
												type={'radio'}
												value={25}
												name={'percent'}
												unique={'true'}
												onClick={this.handleOnPercentChange}
											/>
											<input
												type={'radio'}
												value={50}
												name={'percent'}
												unique={'true'}
												onClick={this.handleOnPercentChange}
											/>
											<input
												type={'radio'}
												value={75}
												name={'percent'}
												unique={'true'}
												onClick={this.handleOnPercentChange}
											/>
											<input
												type={'radio'}
												value={100}
												name={'percent'}
												unique={'true'}
												onClick={this.handleOnPercentChange}
											/>
											{/*<Input 
												type={'radio'} 
												value={25}
												label={{value: '25%'}} 
												name={'percent'} 
												onClick={this.handleOnPercentChange}
												normal />
											<Input 
												type={'radio'}
												value={50}
												label={{value: '50%'}}
												name={'percent'} 
												normal />
											<Input 
												type={'radio'} 
												value={75}
												label={{value: '75%'}} 
												name={'percent'} 
												normal />
											<Input 
												type={'radio'} 
												value={100}
												label={{value: 'Max'}} 
												name={'percent'} 
												normal />*/}
										</Row>
									</Col>
								</Row>

								<Hr/>

								{/* SECOND ROW */}
								<Row style={{padding: '3rem 0 3rem 0'}}>
									<Col s={6} m={6} l={6}>
											{/*<Input 
												type={'radio'} 
												label={{value: 'Valor em real'}} 
												name={'amount'}
												normal />
											<br/>
											<Input 
												type={'radio'} 
												label={{value: 'Valor em dólar'}} 
												name={'amount'} 
												data-amount-type={'real'}
												checked={true}
												normal />*/}
											<div>
												<input
													type={'radio'}
													name={'amount-type'}
													unique={'true'}
													onChange={this.arrangeAmountType}
													value={'brl'}/>
												<label>Quantidade em real</label>
											</div>
											<div>
												<input
													type={'radio'}
													name={'amount-type'}
													unique={'true'}
													onChange={this.arrangeAmountType}
													value={'usd'}/>
												<label>Quantidade em dólar</label>
											</div>
									</Col>
									<Col s={6} m={6} l={6}>
										<Row defaultAlign={'right'}>
											{/*<Input fontSize={'4rem'} type={'text'} s={12} m={12} l={12} whiteTheme label={{value:'BRL'}}/>*/}
											{/*<Input 
												huge 
												phRight 
												noBorder 
												whiteTheme 
												type={'text'} 
												innerRef={this.ref.brlAmount}
												data-amount-type={'brl'}
												onKeyUp={this.handleOnAmountChange}
												placeholder={'BRL 0.00'}
												s={12} m={12} l={12}/>*/}
												<InputText
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
										{/*<Input type={'text'} fontSize={'2rem'} s={6} label={'address'}/>*/}
										<Input 
											className={''} 
											fontSize={'4rem'} 
											normal 
											whiteTheme 
											type={'text'} 
											innerRef={this.ref.address}
											label={{value: 'Endereço'}}/>
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