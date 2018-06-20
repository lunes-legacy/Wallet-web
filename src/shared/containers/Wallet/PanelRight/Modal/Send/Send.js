import React from 'react';
import ReactDOM from 'react-dom';
import { FeeClass } from 'Classes/crypto';
import styled, { css } from 'styled-components';
import style from 'Shared/style-variables';
import { decrypt } from '../../../../../utils/crypt';
import { WalletClass } from "Classes/Wallet";
import { errorPattern } from 'Utils/functions';
// CONSTANTS
import { TESTNET } from 'Config/constants';

// REDUX
import { connect } from 'react-redux';
import { setterModalSend } from 'Redux/actions';

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
			sendAddress: '',
			transferValues: {
				coin: '',
				brl: '',
				usd: ''
			},
			radioControl: {
				coin: true,
				brl: false,
				usd: false
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

		setTimeout(() => {
			this.animThisComponentIn();
		}, 500);

		this._setNetworkFees();
	}

	estimateFee() {
		let fee = parseFloat(0.001);
		return fee;
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
		})
	}

	toggleModal = (event) => {
	}

	handleOnPercentChange = (event) => {
		let element = event.currentTarget;
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
		this.props.setterModalSend({
			status: {
				type: 'loading',
				message: 'Please wait until the transaction get done'
			}
		});
		let coinAmount = parseFloat(this.state.transferValues.coin);
		let currentNetwork = this.props.wallet.currentNetwork;
		let fee = this.estimateFee();

		if (address && address.length > 1) {
			let validateAddress = await this.validateAddress(address, currentNetwork);

			if (!validateAddress) {
				this.setState({ ...this.state, addressIsValid: false });
				return;
			} else {
				this.setState({ ...this.state, addressIsValid: true });
			}
		} else {
			this.setState({ ...this.state, addressIsValid: false, sendAddress: 'Invalid Address' });

			return;
		}
		
		if (!coinAmount || coinAmount <= 1) {
			this.setState({ ...this.state, invalidAmount: true });
			return;
		}

		this.transactionSend(address, coinAmount + fee);

		setTimeout(() => {
			this.props.nextStep({ coinAmount, address });
		}, 1000);

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
		let currentNetwork = this.props.wallet.currentNetwork;
		let coinAmount = this.state.transferValues.coin;
		let usdAmount = this.state.transferValues.usd;

		return (
			<Col s={12} m={6} l={6}>
				<Text txRight clWhite>You are sending 
					<Text clNormalGreen txInline>
						 { coinAmount ? coinAmount : 0} { currentNetwork.toUpperCase() } 
					</Text> 
					({ numeral( usdAmount ).format('$0,0.00') }) + { this.estimateFee() } of fee
				</Text>
			</Col>
		);
	}

	inputControl(value) {
		switch (value) {
			case 'coin':
				this.setState({
					...this.state,
					radioControl: {
						coin: true,
						brl: false,
						usd: false
					}
				});

				break;

			case 'brl':
				this.setState({
					...this.state,
					radioControl: {
						coin: false,
						brl: true,
						usd: false
					}
				});

				break;

			case 'usd':
				this.setState({
					...this.state,
					radioControl: {
						coin: false,
						brl: false,
						usd: true
					}
				});

				break;
		
			default:
				break;
		}
	}

	transactionSend = async (address, coinAmount) => {
		const wallet = new WalletClass();
		let seedData = JSON.parse(decrypt(localStorage.getItem("WALLET-INFO")));
		let tokenData = JSON.parse(decrypt(localStorage.getItem("ACCESS-TOKEN")));
		let valueCoinAmount = coinAmount * 100000000;
		
		let transactionData = {
			mnemonic: seedData.seed,
			network: this.props.wallet.currentNetwork,
			testnet: TESTNET,
			toAddress: address,
			amount: valueCoinAmount.toString(),
			fee: "100000"
		};

		// let data = await wallet.transactionSend(transactionData, tokenData.accessToken)
		// 	.catch((err) => {
		// 		console.error(errorPattern("Error on trying to do the transaction",500,"TRANSACTION_ERROR", err));
		// 	});
		// let txid = data && data.data && data.data.txID;
		// if (!txid) {
		// 	this.props.setterModalSend({
		// 		status: {
		// 			type: 'error',
		// 			message: 'An error ocurred on trying to do the transaction, please try again later on'
		// 		}
		// 	});
		// 	return data;
		// }
		// this.props.setterModalSend({
		// 	status: {
		// 		type:'complete',
		// 		message: 'Transaction done, you can copy the id of this transaction or go to transactions history, /app/wallet'
		// 	},
		// 	txid: data.data.txID
		// })
		this.props.setterModalSend({
			status: {
				type: 'complete',
				message: 'Transaction done, you can copy the id of this transaction or go to transactions history, /app/wallet'
			},
			txid: '123123123123123123123123213'
		})
		// return data;
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
		let usdValue = cryptoCurrencies[currentNetwork].USD;
		let brlValue = cryptoCurrencies[currentNetwork].BRL;
		let amountStatus = false;

		value.replace(",", ".");
		balance = parseFloat(balance.toFixed(8));
		
		switch (type) {
			case 'coin':
				parseFloat(value) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({ 
					...this.state,
					invalidAmount: amountStatus,
					transferValues: { 
						coin: value,
						brl: (brlValue * value).toFixed(2),
						usd: (usdValue * value).toFixed(2)
					},
				});

				break;

			case 'brl':
				(parseFloat(value) / brlValue) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({ 
					...this.state, 
					invalidAmount: amountStatus,
					transferValues: { 
						coin: (value / brlValue).toFixed(8),
						brl: value,
						usd: ((usdValue * value) / brlValue).toFixed(2)
					} 
				});
				
				break;

			case 'usd':
				(parseFloat(value) / usdValue) + 0.01 > balance ? amountStatus = true : amountStatus = false;

				this.setState({
					...this.state, 
					invalidAmount: amountStatus,
					transferValues: { 
						coin: (value / usdValue).toFixed(8), 
						brl: ((brlValue * value) / usdValue).toFixed(2),
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
										value={'coin'}
										unique={'true'}
										defaultChecked
										onClick={ (input) => { this.inputControl(input.target.value) } }
									/>
									<RadioCheckmark />
									<LabelRadio clWhite> { currentNetwork.toUpperCase() } </LabelRadio>
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
									disabled={ !this.state.radioControl.coin }
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
									value={'brl'}
									unique={'true'}
									onClick={ (input) => { this.inputControl(input.target.value) } }
								/>
								<RadioCheckmark />
								<LabelRadio clWhite>BRL</LabelRadio>
							</WrapRadio>
							<WrapRadio css={css`margin: 4rem 0 0 0;`}>
								<InputRadio
									name={'amount-type'}
									value={'usd'}
									unique={'true'}
									onClick={ (input) => { this.inputControl(input.target.value) } }

								/>
								<RadioCheckmark />
								<LabelRadio clWhite>USD</LabelRadio>
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
									disabled={ !this.state.radioControl.brl }
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
									disabled={ !this.state.radioControl.usd }
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
								style={ this.state.addressIsValid ? { color: "white" } : { color: "red" } }
								whiteTheme
								normal
								noBorder
								type={'text'}
								value={ this.state.sendAddress }
								onChange={ (input) => { this.setState({ ...this.state, sendAddress: input.target.value }) } }
								placeholder={'Address'} />
						</Col>
					</Row>

					<Hr />
					{/*FOURTH ROW*/}
					<Row css={FourthRowCss}>

						{ /* this._renderFeeButtons() */ }
						{ this._renderFeeTotal() }

					</Row>
				</Col>
				<Col defaultAlign={'center'} s={6} m={3} l={2}>
					<Row>
						<Button
							style={ this.state.invalidAmount ? { 'backgroundColor': style.disabledText } : { 'backgroundColor': style.coinsColor[currentNetwork] }}
							css={SendButtonCss}
							blockCenter
							clWhite
							onClick={ this.state.invalidAmount ? () => { alert("Invalid Amount") } : () => { this.handleSend(this.state.sendAddress) } }
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
	return {
		setterModalSend: (data) => {
			dispatch(setterModalSend(data));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Send);

