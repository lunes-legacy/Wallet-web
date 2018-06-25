import React from 'react';
import ReactDOM from 'react-dom';
import { FeeClass } from 'Classes/crypto';
import styled, { css } from 'styled-components';
import style from 'Shared/style-variables';
import { decrypt } from '../../../../../utils/crypt';
import { TESTNET } from 'Config/constants';
import { Loading } from 'Components/Loading';

// REDUX
import { connect } from 'react-redux';

import { numeral } from 'Utils/numeral';
import { InputText } from 'Components/forms/input-text';
import { Col, Row, Button, TextBase, Text } from 'Components/index';
import { SendButtonCss,	FirstRowCss, ThirdRowCss,	FourthRowCss } from './css';
import { InputRadio, WrapRadio, LabelRadio, RadioCheckmark } from 'Components/forms/input-radio';
import Hr from '../Hr';

// CLASSES
import { MoneyClass } from 'Classes/Money';
import { WalletClass } from 'Classes/Wallet';

const money = new MoneyClass;
const wallet = new WalletClass();


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
	transition: border-color .3s;
`;


/*
1) O usuário entrou no modal
	-É calculado o fee por byte da network e armazenado no react
2) O usuário digitou o valor a ser enviado
	-estimateFee será disparado trazendo para o usuário os valores alta media e baixa.
3) O usuário digitou o endereco
	-É verificado se é válido o endereco, se não, fica vermelho, o leo fez isso eu acho.
4) O usuário clica em enviar
	-Neste momento transactionSend é chamado para ser iniciada a transacao
	-Na programação	
		Enquanto aguarda o resultado do transactionSend, colocamos o modal step Loading
			Se der erro, voltamos. this.previousStep()
			Se for bem sucedido. this.nextStep() 
				Mostramos a etapa final.js para o usuario, onde aparecera a imagem e o txid
				Enviamos um e-mail para o usuário com a transaction ID
O que precisa ser feito:
	Caixa de mensagem para mostrar ao usuário o que está acontecendo, se é erro, vermelho, se sucesso, verde.
	[REVER] Usar o node-mailer para fazer o envio de e-mail(tx id).
	Refatorar todo o modal send
		Adicionar um método para voltar uma etapa
		Conectar as propriedades com redux
		Fazer algumas actions em redux
		Separar melhor os componentes
		Colocar os dados do estimateFee nos botões(ESTÁTICO)
		Fazer a soma do valor total com a taxa
	Passar a chamada de transação para o backend, para evitar manipulação do usuário.

Todos os estados que precisamos e/ou iremos usar
	this.state = {
		stateButtonSend: 'Enviar',
		addressIsValid: true,
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
	this.props = {
		component_wallet,
		balance,
		coinPrice,
	}
*/




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
			network: null,
			sendAddress: '',
			loading: false,
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
			// networkFees: {
			// 	low: undefined,
			// 	medium: undefined,
			// 	high: undefined
			// },
			chosenFee: 'low',
			fees: {
				low: {
					value: 0.001,
					txColor: style.normalRed,
					textContent: 'Low',
				},
				medium: {
					value: 0.002,
					txColor: style.normalYellow,
					textContent: 'Medium',
				},
				high: {
					value: 0.003,
					txColor: style.normalGreen,
					textContent: 'High',
				}
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

		this.setState({
			...this.state,
			chosenFee: 'low'
		});
	}
	
	/*
		It will be usually be called when the user dispatch a blur event.
	*/
	_setFees = async () => {
		let currentNetwork = this.props.wallet.currentNetwork;
		let result = await wallet.getCryptoTx(currentNetwork);
		let fees;

		if (!currentNetwork)
			console.error('Current network is not defined', 500, 'SETNETWORKFEES_ERROR');
		
		if (!result)
			console.error('Failed on trying to get network fees', 500, "SETNETWORKFEES_ERROR");

		fees = {
			...this.state.fees,
			low: {
				...this.state.fees.low,
				value: money.conevertCoin(currentNetwork, result.low.data.fee),
			},
			medium: {
				...this.state.fees.medium,
				value: money.conevertCoin(currentNetwork, result.medium.data.fee),
			},
			high: {
				...this.state.fees.high,
				value: money.conevertCoin(currentNetwork, result.high.data.fee),
			},
		}

		this.setState({
			...this.state,
			network: currentNetwork,
			fees
		});

		return fees;
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

	ctrlLoading(state) {
		return this.setState({ ...this.state, loading: state });
	}

	handleSend = async (address) => {
		this.ctrlLoading(true);
		let coinAmount = parseFloat(this.state.transferValues.coin);
		let currentNetwork = this.props.wallet.currentNetwork;
		let fee = await this._setFees();

		if (address && address.length > 1) {
			let validateAddress = await this.validateAddress(currentNetwork, address);

			if (!validateAddress) {
				this.setState({ ...this.state, addressIsValid: false });
				this.ctrlLoading(false);
				return;
			} else {
				this.setState({ ...this.state, addressIsValid: true });
			}
		} else {
			this.setState({ ...this.state, addressIsValid: false, sendAddress: 'Invalid Address' });
			this.ctrlLoading(false);
			return;
		}
		if (!coinAmount || coinAmount <= fee[this.state.chosenFee].value.toFixed(8)) {
			this.setState({ ...this.state, invalidAmount: true });
			this.ctrlLoading(false);
			return;
		}

		let dataSend = this.transactionSend(address, coinAmount, fee[this.state.chosenFee].value);
		this.ctrlLoading(false);
		setTimeout(() => {
			this.props.nextStep({ coinAmount, address });
		}, 1000);

		this.animThisComponentOut();
	}

	_setChosenFee = (currentSelected) => {
		// let buttons = document.querySelectorAll('.fee-button');
		// Array.from(buttons).map((button) => {
		// 	let state = button.getAttribute('state');
		// 	if (state === 'selected') {
		// 		button.setAttribute('state', 'deselected');
		// 		button.style.borderBottom = `none`;
		// 	}
		// });
		// currentSelected.setAttribute('state', 'selected');
		// currentSelected.style.borderBottom = `5px solid ${style.normalGreen}`;

		this.setState({
			...this.state,
			chosenFee: 'medium'
		});
	}

	handleClickFee = (fee) => {
		this.setState({
			chosenFee: fee
		});
	}

	validateAddress (network, address) {
		let data = wallet.validateAddress(network, address)
		return data;
	}

	_renderFeeTotal = () => {
		let currentNetwork = this.props.wallet.currentNetwork;	
		let coinAmount = this.state.transferValues.coin;
		let usdAmount = this.state.transferValues.usd;

		// if (this.state.network !== currentNetwork) this._setFees();

		return (
			<Col s={12} m={6} l={6} txInline>
				<Text clWhite>You are sending 
					<Text color={style.coinsColor[currentNetwork]} txInline>
						 { coinAmount ? coinAmount : 0} { currentNetwork.toUpperCase() } 
					</Text> 
					({ numeral( usdAmount ).format('$0,0.0000') }) + { this.state.fees[this.state.chosenFee].value ? this.state.fees[this.state.chosenFee].value.toFixed(8) : 'error' } of fee
				</Text>
			</Col>
		);
	}
	arrangeFeeButtons = () => {
		let { fees } = this.state;
		let newFees = {};
		
		//this for loop is to filter the the duplicated values in the fees
		for (let key in fees) {
			let fee    = fees[key];
			let val    = fee.value;
			let low    = newFees.low && newFees.low.value || undefined;
			let medium = newFees.medium && newFees.medium.value || undefined;
			let high   = newFees.high && newFees.high.value || undefined;

			if (val === low || val === medium || val === high) {
				continue;
			} else {
				newFees[key] = fee;
			}
		}
		//this for loop arrange the meanings 
		if (Object.keys(newFees).length === 2) {
			newFees[Object.keys(newFees)[0]].textContent = 'Low';
			newFees[Object.keys(newFees)[1]].textContent = 'High';
			newFees[Object.keys(newFees)[1]].txColor = style.normalGreen;
		} else if (Object.keys(newFees).length === 1) {
			newFees[Object.keys(newFees)[0]].textContent = 'Normal';
			newFees[Object.keys(newFees)[0]].txColor = style.normalGreen;
		}
		return newFees;
	}
	_renderFeeButtons = () => {
		// if (this.state.networkfees.status === 'loading') {
		// 	return <Loading />;
		// }
		return (
			<Col s={12} m={6} l={6}>
				{
					(() => {
						let { chosenFee, fees } = this.state;
						let components = [];
						let borderBottom;
						let fee; //it will be to be fit inside the for loop
						fees = this.arrangeFeeButtons();
						for (let key in fees) {
							fee = fees[key];
							borderBottom = chosenFee === key ? '5px solid green' : 'none';
							components.push(
								<FeeButton style={{ borderBottom }} onClick={() => { this.handleClickFee(key) }} value={fee.value}>{fee.value} <Text txInline style={{color: fee.txColor}}>{fee.textContent}</Text></FeeButton>
							);
						}
						return components;
					})()
				}
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

	transactionSend = async (address, amount, fee) => {
		let walletInfo = JSON.parse(decrypt(localStorage.getItem("WALLET-INFO")));
		let tokenData = JSON.parse(decrypt(localStorage.getItem("ACCESS-TOKEN")));
		
		let data = await wallet.transactionSend(
			walletInfo.seed,
			this.props.wallet.currentNetwork,
			address,
			amount,
			fee,
			tokenData.accessToken
		);

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
		let usdValue = cryptoCurrencies[currentNetwork].USD;
		let brlValue = cryptoCurrencies[currentNetwork].BRL;
		let amountStatus = false;

		value = value.replace(",", ".");
		value = value.replace(/[^0-9.]/igm, '');
		balance = parseFloat(balance.toFixed(8));
		
		switch (type) {
			case 'coin':
				parseFloat(value) + this.state.fees[this.state.chosenFee].value > balance ? amountStatus = true : amountStatus = false;

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
				(parseFloat(value) / brlValue) + this.state.fees[this.state.chosenFee].value > balance ? amountStatus = true : amountStatus = false;

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
				(parseFloat(value) / usdValue) + this.state.fees[this.state.chosenFee].value > balance ? amountStatus = true : amountStatus = false;

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
				<link rel="preload" href="/img/app_wallet/modal_send/sprite_animation_done.png" as="image"/>
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
									<RadioCheckmark color={style.coinsColor[currentNetwork]}/>
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
									noBrowserAppearance
									disabled={ !this.state.radioControl.coin }
									value = { this.state.transferValues.coin }
									onChange = { (input) => { this.convertCoins(input.target.value, 'coin') } }
									onBlur={() => { this._setFees() }}
									style={ this.state.invalidAmount ? { color: "red" } : { color: "white" } }
									data-amount-type={'coin'}
									className={'input-amount coin'}
									placeholder={'0'} />
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
								<RadioCheckmark color={style.coinsColor[currentNetwork]}/>
								<LabelRadio clWhite>BRL</LabelRadio>
							</WrapRadio>
							<WrapRadio css={css`margin: 4rem 0 0 0;`}>
								<InputRadio
									name={'amount-type'}
									value={'usd'}
									unique={'true'}
									onClick={ (input) => { this.inputControl(input.target.value) } }

								/>
								<RadioCheckmark color={style.coinsColor[currentNetwork]}/>
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
									noBrowserAppearance
									ref={this.ref.brlAmount}
									onChange={ (input) => { this.convertCoins(input.target.value, 'brl') } }
									onBlur={() => { this._setFees() }}
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
									noBrowserAppearance
									ref={this.ref.usdAmount}
									value={ this.state.transferValues.usd }
									disabled={ !this.state.radioControl.usd }
									onChange = { (input) => { this.convertCoins(input.target.value, 'usd') } }
									onBlur={() => { this._setFees() }}
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

						{ this._renderFeeButtons() }
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
					<Loading hide={this.state.loading} size={"25px"} />
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		crypto: state.currencies.crypto,
		// cryptoTx: state.currencies.cryptoTx,
		wallet: state.component.wallet,
		balance: state.balance,
		currencies: state.currencies.currencies,
	}
}
const mapDispatchToProps = (dispatch) => {
	return { }
}
export default connect(mapStateToProps, mapDispatchToProps)(Send);

