import React from 'react';
import ReactDOM from 'react-dom';
import { FeeClass } from 'Classes/crypto';
import { users, coins } from 'lunes-lib';
import styled, { css } from 'styled-components';
import style from 'Shared/style-variables';
import { decrypt } from '../../../../../utils/crypt';
import { Loading } from 'Components';
import { WalletClass } from "Classes/Wallet";

// REDUX
import { connect } from 'react-redux';

// UTILS
import { numeral }    from 'Utils/numeral';

import {
	InputRadio,
	WrapRadio,
	LabelRadio,
	RadioCheckmark
} from 'Components/forms/input-radio';
import { InputText } from 'Components/forms/input-text';
import { Col, Row, Button, TextBase, Text } from 'Components/index';
//PRIVATE COMPONENTS
import Hr from '../Hr';
//CUSTOM CSS
import {
	SendButtonCss,
	FirstRowCss,
	ThirdRowCss,
	FourthRowCss
} from './css';

let CssWrapper = css`
	transform-origin: top;
	transform: translateY(-100%);
	transition: all 0.3s;
`;

let fontAddressColor = "::placeholder {	color: red;}";

let Image = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 5px;
  margin-bottom: 3px;
`;

let FeeButton = styled.button`
	${TextBase}
	background: transparent;
	border: none;
	padding: 5px 10px 5px 10px;
	cursor: pointer;
	color: white;
	&:focus {
		outline: none;
	}
`;
let FeeCss = css`
`;

const wallet = new WalletClass();

class Send extends React.Component {
	constructor(props) {
		super(props);

		this.ref = {};
		this.ref.radioCoinAmount = React.createRef();
		this.ref.coinAmount = React.createRef();
		this.ref.sendButton = React.createRef();
		this.ref.wrapper = React.createRef();

		//quantity types: real, dollar, coin
		this.state = {
			stateButtonSend: 'Enviar',
			addressIsValid: true,
			invalidAmount: false,
			transferValues: {
				coin: '',
				brl: '',
				usd: ''
			},
			fees: {
				status: 'loading', //loading || complete
				low: undefined,
				medium: undefined,
				high: undefined
			},
			networkFees: {
				low: undefined,
				medium: undefined,
				high: undefined
			},
			estimateParams: {
				network: undefined,
				fromAddress: undefined,
				toAddress: undefined,
				amount: undefined,
				accessToken: undefined,
				networkFees: undefined //it is optional
			}
		}
	}

	componentDidMount() {
		this.radioCoinAmount = ReactDOM.findDOMNode(this.ref.radioCoinAmount.current);
		this.sendButton = ReactDOM.findDOMNode(this.ref.sendButton.current);
		this.wrapper = ReactDOM.findDOMNode(this.ref.wrapper.current);

		this.arrangeAmountType();

		setTimeout(() => {
			this.animThisComponentIn();
		}, 500);

		this._setNetworkFees();
	}
	_setNetworkFees = async () => {
		let currentNetwork = this.props.wallet.currentNetwork;
		let Fee = new FeeClass;
		let result;
		let networkFees;
		if (!currentNetwork)
			console.error(errorPattern('Current network is not defined', 500, 'SETNETWORKFEES_ERROR'));

		result = await Fee.getNetworkFees({ network: currentNetwork });
		if (result.status !== 'success')
			console.error(errorPattern('Failed on trying to get network fees', 500, "SETNETWORKFEES_ERROR"));

		networkFees = result.data;
		this.setState({
			...this.state,
			estimateParams: {
				...this.state.estimateParams,
				networkFees
			}
		}, () => {
			console.log("STATE", this.state);
		});
	}

	toggleModal = (event) => {
	}

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
	}

	animThisComponentIn = () => {
		this.wrapper.style.transform = 'translateY(0px)';
	}
	animThisComponentOut = () => {
		this.wrapper.style.transform = 'translateY(-100%)';
	}

	handleSend = async (address) => {
		let coinAmount = this.state.transferValues.coin;
		let currentNetwork = this.props.wallet.currentNetwork;
		let data = await this.validateAddress(address, currentNetwork);

		if (!coinAmount || !address) return;

		if (!data) {
			this.setState({ ...this.state, addressIsValid: false });

			return false;
		} else {
			this.setState({ ...this.state, addressIsValid: true });
		}
		

		let dataSend = this.transactionSend(address, coinAmount);

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

	_arrangeFeeButtons = (currentSelected) => {
		let buttons = document.querySelectorAll('.fee-button');
		Array.from(buttons).map((button) => {
			let state = button.getAttribute('state');
			if (state === 'selected') {
				button.setAttribute('state', 'deselected');
				button.style.borderBottom = `none`;
			}
		});
		currentSelected.setAttribute('state', 'selected');
		currentSelected.style.borderBottom = `5px solid ${style.normalGreen}`;
	}

	handleClickFee = (event) => {
		let button = event.currentTarget;
		this._arrangeFeeButtons(button);
	}

	validateAddress (address) {
		let data = wallet.validateAddress(address)

		return data;
	}

	// _renderFeeButtons = () => {
	// 	if (this.state.fees.status === 'loading') {
	// 		// return <Loading />;
	// 	}
	// 	return (
	// 		<Col s={12} m={6} l={6}>
	// 			<FeeButton onClick={this.handleClickFee} className="fee-button first">{this.state.fees.low} <Text txInline clNormalRed>baixa</Text></FeeButton>
	// 			<FeeButton onClick={this.handleClickFee} className="fee-button second">{this.state.fees.medium} <Text txInline clNormalGreen>média</Text></FeeButton>
	// 			<FeeButton onClick={this.handleClickFee} className="fee-button third">{this.state.fees.high} <Text txInline clMostard>alta</Text></FeeButton>
	// 		</Col>
	// 	);
	// }

	_renderFeeTotal = () => {

		return (
			<Col s={12} m={6} l={6}>
				<Text txRight clWhite>You are sending <Text clNormalGreen txInline>0.0999 BTC</Text> (R$ 300,00)</Text>
			</Col>
		);
	}

	transactionSend = async (address, coinAmount) => {
		const wallet = new WalletClass();
		let seedData = JSON.parse(decrypt(localStorage.getItem("WALLET-INFO")));
		let tokenData = JSON.parse(decrypt(localStorage.getItem("ACCESS-TOKEN")));
		let valueCoinAmount = coinAmount * 100000000;
		
		let transactionData = {
			mnemonic: seedData.seed,
			network: this.props.wallet.currentNetwork,
			testnet: true,
			toAddress: address,
			amount: valueCoinAmount.toString(),
			fee: "100000"
		};

		 let data = await wallet.transactionSend(transactionData, tokenData.accessToken);
		return data;
	}

	clearFields() {
		this.setState({ 
			...this.state, 
			transferValues: { 
				coin: '', 
				brl: '' , 
				usd: ''
			}
		})
	}

	convertCoins(value, type) {
		let cryptoCurrencies = this.props.crypto;
		let currentNetwork = this.props.wallet.currentNetwork;
		currentNetwork = currentNetwork.toUpperCase()
		let balance = this.props.balance[currentNetwork].total_amount;
		balance = parseFloat(balance.toFixed(8));
		let usdValue = cryptoCurrencies[currentNetwork].USD;
		let brlValue = cryptoCurrencies[currentNetwork].BRL;
		let amountStatus = false;

		switch (type) {
			case 'coin':
				parseFloat(value) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({ 
					...this.state,
					invalidAmount: amountStatus,
					transferValues: { 
						coin: value,
						brl: brlValue * value,
						usd: usdValue * value
					},
				});

				break;

			case 'brl':
				(parseFloat(value) / brlValue) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({ 
					...this.state, 
					invalidAmount: amountStatus,
					transferValues: { 
						coin: value / brlValue,
						brl: value,
						usd: (usdValue * value) / brlValue
					} 
				});
				
				break;

			case 'usd':
				(parseFloat(value) / usdValue) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({
					...this.state, 
					invalidAmount: amountStatus,
					transferValues: { 
						coin: value / usdValue, 
						brl: (brlValue * value) / usdValue,
						usd: value
					} 
				});
				break;
		
			default:
				break;
		}
	}
	

	render() {
		let currentNetwork = this.props.wallet.currentNetwork;
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
									<LabelRadio clWhite> { currentNetwork } unit</LabelRadio>
								</WrapRadio>
							</div>
						</Col>
						<Col s={12} m={6} l={6}>
							<Row defaultAlign={'right'}>
								{ /* Crypto Input */}
								<InputText
									huge
									phRight
									phWeightLight
									whiteTheme
									txRight
									noBorder
									type={ 'number' }
									value = { this.state.transferValues.coin }
									onChange = { (input) => { this.convertCoins(input.target.value, 'coin') } }
									style={ this.state.invalidAmount ? { color: "red" } : { color: "white" } }
									data-amount-type={'coin'}
									className={'input-amount coin'}
									placeholder={'0.00000000'} />
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
								<LabelRadio clWhite>REAL unit</LabelRadio>
							</WrapRadio>
							<WrapRadio css={css`margin: 4rem 0 0 0;`}>
								<InputRadio
									onChange={this.arrangeAmountType}
									name={'amount-type'}
									value={'usd'}
									unique={'true'}
								/>
								<RadioCheckmark />
								<LabelRadio clWhite >USD unit</LabelRadio>
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
									type={ 'number' }
									ref={this.ref.brlAmount}
									onChange={ (input) => { this.convertCoins(input.target.value, 'brl') } }
									value={ this.state.transferValues.brl }
									style={ this.state.invalidAmount ? { color: "red" } : { color: "white" } }
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
									type={ 'number' }
									ref={this.ref.usdAmount}
									value={ this.state.transferValues.usd }
									onChange = { (input) => { this.convertCoins(input.target.value, 'usd') } }
									style={ this.state.invalidAmount ? { color: "red" } : { color: "white" } }
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
								style={ this.state.addressIsValid ? { color: "red" } : { color: "white" } }
								whiteTheme
								normal
								noBorder
								type={'text'}
								ref={this.ref.address}
								placeholder={'Address'} />
						</Col>
					</Row>

					<Hr />
					{/*FOURTH ROW*/}
					<Row css={FourthRowCss}>
						{ /* this._renderFeeButtons() */ }

						{this._renderFeeTotal()}
					</Row>
				</Col>
				<Col defaultAlign={'center'} s={6} m={3} l={2}>
					{ console.log('state', this.state.invalidAmount) }
					<Row>
						<Button
							style={ this.state.invalidAmount ? { 'backgroundColor': style.disabledText } : { 'backgroundColor': style.coinsColor[currentNetwork] }}
							css={SendButtonCss}
							blockCenter
							clWhite
							onClick={ this.state.invalidAmount ? () => { alert("Invalid Amount") } : (input) => { this.handleSend(input.target.value) } }
							innerRef={ this.ref.sendButton }>
							Enviar
						</Button>
					</Row>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		crypto: state.currencies.crypto,
		wallet: state.component.wallet,
		balance: state.balance,
		currencies: state.currencies.currencies,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Send);

