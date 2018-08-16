import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import style from 'Shared/style-variables';
import { decrypt } from '../../../../../utils/crypt';
import { TESTNET, REGEX_TAXABLE_NETWORKS } from 'Config/constants';
import { Loading } from 'Components/Loading';
import { errorPattern, timer } from 'Utils/functions';

// REDUX
import { connect } from 'react-redux';
import { setterModalSend } from 'Redux/actions';

import { numeral } from 'Utils/numeral';
import { InputText } from 'Components/forms/input-text';
import { Col, Row, Button, TextBase, Text } from 'Components/index';
import { SendButtonCss, FirstRowCss, ThirdRowCss, FourthRowCss } from './css';
import { InputRadio, WrapRadio, LabelRadio, RadioCheckmark } from 'Components/forms/input-radio';
import Hr from '../Hr';

// CLASSES
import { MoneyClass }  from 'Classes/Money';
import { FeeClass }    from 'Classes/crypto';
import { WalletClass } from 'Classes/Wallet';

const money = new MoneyClass;
const wallet = new WalletClass();
let isUserAlreadySending;

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
  display: block;
  background: transparent;
  border: none;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  color: white;
  &:focus {
    outline: none;
  }
  transition: border-color .3s;
  @media (${style.media.desktop2}) {
    display: inline;
  }
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
			Se der erro, aparece o erro.
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
const Fee = new FeeClass();
const Money = new MoneyClass();


var initialState = {
  isUserAlreadySending: false, //this will be to forbid the user to send twice
  addressIsValid: true,
  invalidAmount: false,
  sendAddress: '',
  loading: false,
  lastNetwork: undefined,
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
  feePerByte: {
    low: undefined,
    medium: undefined,
    high: undefined
  },
  chosenFee: 'low',
  feeButtonsStatus: {
    type: 'initial', //'loading' | 'initial' | 'completed' | 'error'
    message: 'Put an address and a value to get the right fee',
  },
  fees: {
    low: {
      value: undefined,
      gasPrice: '0',
      txColor: style.normalRed,
      textContent: 'Low',
    },
    medium: {
      value: undefined,
      gasPrice: '0',
      txColor: style.normalYellow,
      textContent: 'Medium',
    },
    high: {
      value: undefined,
      gasPrice: '0',
      txColor: style.normalGreen,
      textContent: 'High',
    }
  }
}
class Send extends React.Component {
	constructor(props) {
		super(props);
		this.ref = {};
		this.ref.radioCoinAmount = React.createRef();
		this.ref.coinAmount = React.createRef();
		this.ref.sendButton = React.createRef();
		this.ref.wrapper = React.createRef();

		//quantity types: real, dollar, coin
		this.state = initialState;
	}
  componentDidUpdate() {
    let { currentNetwork } = this.props.wallet;
    let { lastNetwork }    = this.state;
    if (lastNetwork !== currentNetwork) {
      console.warn('1', lastNetwork, currentNetwork);
      this.setState({
        ...initialState,
        lastNetwork: currentNetwork
      })
    }
  }
	componentDidMount = async () => {
		this.radioCoinAmount = ReactDOM.findDOMNode(this.ref.radioCoinAmount.current);
		this.sendButton = ReactDOM.findDOMNode(this.ref.sendButton.current);
		this.wrapper = ReactDOM.findDOMNode(this.ref.wrapper.current);

		setTimeout(() => {
			this.animThisComponentIn();
    }, 500);

		this.setState({
			chosenFee: 'low'
		});
	}

	/*
		It will be usually called when the user dispatch a blur event.
	*/
	_setFees = async () => {
		let { currentNetwork } = this.props.wallet;
		let amount      = parseFloat(this.state.transferValues.coin);
		let fromAddress = this.props.walletInfo.addresses[currentNetwork.toLowerCase()];
		let toAddress   = this.state.sendAddress;

    let feePerByteNetwork = this.state.feePerByte.network;
    if (!feePerByteNetwork || feePerByteNetwork.toLowerCase() !== currentNetwork.toLowerCase()) {
      let networkFees = await Fee.getNetworkFees({network: currentNetwork});
      this.setState({
        feePerByte: {...networkFees}
      }, () => {
        console.warn('feePerByte:::', this.state.feePerByte);
      });
    }

    if (amount <= 0) {
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: 'Amount is less or equals to 0'
        }
      });
      return;
    }

    if (!this.state.addressIsValid || !toAddress) {
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: 'Receiver\'s address isn\'t right'
        }
      });
      return;
    }

    if (!fromAddress) {
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: 'Sender\'s address isn\'t right'
        }
      });
      return;
    }

    this.setState({
      feeButtonsStatus: {
        type: 'loading',
        message: 'Wait until the estimate get finished'
      }
    });

    let data = {
      toAddress,
      fromAddress,
      amount,
      network: currentNetwork
    }

    let result = await wallet.getCryptoTx(data);
    let estimateErrors = {};
    //it will storer all errors to verify later on
    Object.keys(result).map((k) => {
      let current = result[k];
      if ("message" in current)
        estimateErrors[k] = current;
    });
    //if every result get an error, so
    if ((Object.keys(estimateErrors).length === Object.keys(result).length) && (Object.keys(result).length > 0) && (typeof result === 'object')) {
      let message = result['high'].message || result['medium'].message || result['low'].message;
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: message
        }
      });
      return;
    }
    if (!currentNetwork) {
      let message = 'Current network is not defined';
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: message
        }
      });
      return;
    }
    if (!("low" in result) && !("medium" in result) && !("high" in result)) {
      this.setState({
        feeButtonsStatus: {
          type: 'error',
          message: 'Unknown error'
        }
      });
      throw errorPattern("Unknown error in method '_setFees'");
    }


    if (!result) {
      console.error('Failed on trying to get network fees', 500, "SETNETWORKFEES_ERROR");
    }

    // TODO: remover após padronização do parâmetro para *fee* em todas as moedas no back-end
    if (currentNetwork.toLowerCase() === 'eth') {
      result.low.data.fee = parseInt(result.low.data.txFee);
      result.medium.data.fee = parseInt(result.medium.data.txFee);
      result.high.data.fee = parseInt(result.high.data.txFee);
    }
    let low    = (result && result.low && result.low.data && result.low.data.fee) || 0
    let medium = (result && result.medium && result.medium.data && result.medium.data.fee) || 0
    let high   = (result && result.high && result.high.data && result.high.data.fee) || 0
    let lowGasPrice  = (result && result.low && result.low.data && result.low.data.gasPrice) || 0
    let medGasPrice  = (result && result.low && result.low.data && result.low.data.gasPrice) || 0
    let highGasPrice = (result && result.low && result.low.data && result.low.data.gasPrice) || 0

    let fees = {
      ...this.state.fees,
      low: {
        ...this.state.fees.low,
        value: money.convertCoin(currentNetwork, low),
        gasPrice: lowGasPrice
      },
      medium: {
        ...this.state.fees.medium,
        value: money.convertCoin(currentNetwork, medium),
        gasPrice: medGasPrice
      },
      high: {
        ...this.state.fees.high,
        value: money.convertCoin(currentNetwork, high),
        gasPrice: highGasPrice
      }
    }

    this.setState({
      ...this.state,
      feeButtonsStatus: {
        type: 'completed',
        message: 'Success on getting the estimation'
      },
      network: currentNetwork,
      chosenFee: currentNetwork === 'ltc' ? 'medium' : 'low', // Como LTC tem apenas a medium fee, define ela como a selecionada
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
    // if(this.props.wallet.currentNetwork.search(/(btc)|(ltc)|(dash)/i) !== -1) {
    //   alert('BTC, LTC and DASH in maintenance');
    //   return;
    // }
    if (this.state.isUserAlreadySending === true) {
      this.setState({
        messageUserIsAlreadySending: `You're already sending, hold on until the transaction get finished`
      });
      setTimeout(() => {
        this.setState({
          messageUserIsAlreadySending: ''
        });
      }, 3000);
      return;
    } else {
      this.setState({
        isUserAlreadySending: true
      });
    }
    //console.warn("I've passed through here beibi", this.state.isUserAlreadySending);
    this.ctrlLoading(true);
    let coinAmount     = parseFloat(this.state.transferValues.coin);
    let currentNetwork = this.props.wallet.currentNetwork;
    let feePerByte     = this.state.feePerByte.data[this.state.chosenFee];
    let estimatedFee   = this.state.fees[this.state.chosenFee];

    console.warn('feePerByte and estimatedFee__________');
    console.warn(feePerByte, estimatedFee);
    console.warn('feePerByte and estimatedFee__________');
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

    // const feeValue = parseFloat(fee.value);
    const feeValue = parseFloat(feePerByte);
    let feeValueInBTC;
    if (currentNetwork.search(/eth/i) !== -1)
      feeValueInBTC = Money.convertCoin('eth',feeValue);
    else
      feeValueInBTC = Money.convertCoin('btc',feeValue);

    console.warn('COINAMOUNT | FEEVALUE',coinAmount, feeValue);
    if (!coinAmount || coinAmount <= feeValueInBTC) {
      console.error(errorPattern('Invalid amount',500,'MODALSEND_HANDLESEND_ERROR'));
      this.setState({ ...this.state, invalidAmount: true });
      this.ctrlLoading(false);
      return;
    }

    let dataSend = this.transactionSend(address, coinAmount, feePerByte, estimatedFee.gasPrice);
    this.ctrlLoading(false);
    setTimeout(() => {
      this.props.nextStep({ coinAmount, address });
    }, 1000);

    this.animThisComponentOut();
  }

  _setChosenFee = (currentSelected) => {
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
    // if (this.state.network !== currentNetwork) this._setFees();
    let { feeButtonsStatus } = this.state;

    if (feeButtonsStatus.type === 'loading') {
      return <Loading />;
    } else if (feeButtonsStatus.type === 'initial' || feeButtonsStatus.type === 'error') {
      return null;
    }

    let currentNetwork = this.props.wallet.currentNetwork;
    let coinAmount = this.state.transferValues.coin;
    let usdAmount = this.state.transferValues.usd;

    let chosenFeeValue = this.state.fees[this.state.chosenFee].value || 'error';

    if (chosenFeeValue !== 'error') {
      chosenFeeValue = currentNetwork === 'eth' ? chosenFeeValue : parseFloat(chosenFeeValue).toFixed(8);
    }

    return (
      <Col s={12} m={6} l={6}>
        <Text txRight clWhite>You are sending
          <Text color={style.coinsColor[currentNetwork]} txInline>
             { coinAmount ? coinAmount : 0} { currentNetwork === 'lns' ? 'LUNES' : currentNetwork.toUpperCase() } 
          </Text>
          ({ numeral( usdAmount ).format('$0,0.0000') }) +
          { chosenFeeValue } of fee
        </Text>
      </Col>
    );
  }

  arrangeFeeButtons = () => {
    let { fees } = this.state;
    let { currentNetwork }= this.props.wallet;
    let newFees = {};

    //this for loop is to filter the the duplicated values in the fees
    for (let key in fees) {
      let fee    = fees[key];
      let val    = fee.value;
      let low    = parseFloat(newFees.low && newFees.low.value) || undefined;
      let medium = parseFloat(newFees.medium && newFees.medium.value) || undefined;
      let high   = parseFloat(newFees.high && newFees.high.value) || undefined;

      if (val === low || val === medium || val === high || !val) {
        continue;
      } else {
        newFees[key] = fee;
      }
    }

    //this for loop arrange the meanings
    let feeKeys = Object.keys(newFees);
    if (feeKeys.length === 2) {
      newFees[feeKeys[0]].textContent = 'Low';
      newFees[feeKeys[1]].textContent = 'High';
      newFees[feeKeys[1]].txColor = style.normalGreen;
    } else if (feeKeys.length === 1) {
      newFees[feeKeys[0]].textContent = 'Normal';
      newFees[feeKeys[0]].txColor = style.normalGreen;
    }

    //THIS UNIQUE CONDITIONAL NEED TO BE REMOVED LATER ON
    if (currentNetwork.search(/ltc/i) !== -1) {
      delete newFees.low;
      delete newFees.high;
    };

    return newFees;
  }

  _renderFeeButtons = () => {
    let { feeButtonsStatus } = this.state;

    if (feeButtonsStatus.type === 'loading') {
      return <Loading />;
    } else if (feeButtonsStatus.type === 'error' || feeButtonsStatus.type === 'initial') {
      return <Text clWhite>{ feeButtonsStatus.message }</Text>;
    }

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
                <FeeButton key={key} style={{ borderBottom }} onClick={() => { this.handleClickFee(key) }} value={fee.value}>{fee.value} <Text txInline style={{color: fee.txColor}}>{fee.textContent}</Text></FeeButton>
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

  // TODO: verificar forma melhor de passar o gasPrice para a classe Wallet
  transactionSend = async (address, amount, fee, gasPrice = '0') => {
    this.props.setterModalSend({
      status: 'loading',
      message: 'Wait until the transaction got finished',
    });
    let walletInfo = JSON.parse(decrypt(localStorage.getItem("WALLET-INFO")));
    let tokenData = JSON.parse(decrypt(localStorage.getItem("ACCESS-TOKEN")));
    let data = await wallet.transactionSend(
      walletInfo.seed,
      this.props.wallet.currentNetwork,
      address,
      amount,
      fee,
      tokenData.accessToken,
      gasPrice
    ).catch((err) => {
      this.props.setterModalSend({
        status: 'error',
        message: 'Error on trying to do the transaction'
      });
      throw errorPattern(err, 500, 'MODALSEND_TRANSACTION_ERROR');
    });
    let txid = data && data.data && data.data.txID;
    if (!txid) {
      console.error('MODALSEND_TRANSACTIONSEND_DATA', data);
      this.props.setterModalSend({
        status: 'error',
        message: 'No transaction ID was returned'
      });
      throw errorPattern('No transaction ID was returned', 500, 'MODALSEND_TRANSACTION_ERROR');
    }
    this.props.setterModalSend({
      status: 'completed',
      message: 'Success on sending transaction',
      txid: txid
    });
    this.setState({
      isUserAlreadySending: false
    });
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
      currentNetwork = currentNetwork.toUpperCase();
    let balance = this.props.balance[currentNetwork].total_amount;
    let usdValue = cryptoCurrencies[currentNetwork].USD;
    let brlValue = cryptoCurrencies[currentNetwork].BRL;
    let amountStatus = false;

    value = value.replace(",", ".");
    value = value.replace(/[^0-9.]/igm, '');
    // balance = parseFloat(balance.toFixed(8));
    balance = parseFloat(balance).toFixed(8);

    switch (type) {
      case 'coin':
        amountStatus = (parseFloat(value) + this.state.fees[this.state.chosenFee].value) > balance;
        amountStatus ? console.error(errorPattern('Invalid amount',500,'MODALSEND_CONVERTCOINS_ERROR')) : null;
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
        amountStatus ? console.error(errorPattern('Invalid amount',500,'MODALSEND_CONVERTCOINS_ERROR')) : null;

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
        amountStatus ? console.error(errorPattern('Invalid amount',500,'MODALSEND_CONVERTCOINS_ERROR')) : null;

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
    }
  }

  render() {
    let currentNetwork = this.props.wallet.currentNetwork
    let balance = this.props.balance[currentNetwork.toUpperCase()].total_confirmed
    let fee     = this.state.fees[this.state.chosenFee].value
    fee         = fee ? fee : 0
    let sendAllFunds = (balance - (fee * 0.2) - fee).toFixed(8)
    let textSendAll = ''
    if (currentNetwork.search(REGEX_TAXABLE_NETWORKS) !== -1) {
      textSendAll  = `Use the total available amount minus the tax ${sendAllFunds}`
    } else {
      if (currentNetwork.search(/(eth)/i) !== -1) {
        console.warn('ETH_____')
        console.warn('FEE_____', fee)
        console.warn('BALANCE_', balance)
        sendAllFunds = (balance - fee).toString()
        console.warn('ALLFUNDS', sendAllFunds)
      } else {
        sendAllFunds = (balance - fee).toFixed(8).toString()
      }
      textSendAll  = `Use the total available amount minus the tax ${sendAllFunds}`
    }

    return (
      <Row css={CssWrapper} ref={this.ref.wrapper}>
        <link rel="preload" href="/img/app_wallet/modal_send/sprite_animation_done.png" as="image"/>
        <Col s={9} m={9} l={9}>
          {/*When user is already sending a transaction*/}
          { this.state.messageUserIsAlreadySending ? <Text clWhite txCenter>{this.state.messageUserIsAlreadySending}</Text> : '' }
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
                  <LabelRadio clWhite>
                    { currentNetwork === 'lns' ? 'LUNES' : currentNetwork.toUpperCase() }
                  </LabelRadio>
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
                  value={ this.state.transferValues.coin }
                  onChange={ input => this.convertCoins(input.target.value, 'coin') }
                  onBlur={ () => { this._setFees() } }
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
            <Row>
              <Text clNormalGreen txCenter style={{cursor: 'pointer'}} onClick={() => this.convertCoins(sendAllFunds, 'coin')}>{textSendAll}</Text>
            </Row>
          </Row>

          <Hr />
          {/*THIRD ROW*/}
          <Row css={ThirdRowCss}>
            <Col s={12} m={12} l={12}>
              <InputText
                style={ this.state.addressIsValid ? { color: "white" } : { color: "red" } }
                name={"to-address"}
                whiteTheme
                normal
                noBorder
                type={'text'}
                value={ this.state.sendAddress }
                onChange={ (input) => { this.setState({ ...this.state, sendAddress: input.target.value }) } }
                onBlur={() => { this._setFees() }}
                placeholder={'Address'} />
            </Col>
          </Row>

          <Hr />
          {/*FOURTH ROW*/}
          <Row css={FourthRowCss}>

            { this._renderFeeButtons() }
            { this._renderFeeTotal() }
            {/*When user is already sending a transaction*/}
            {
              this.state.messageUserIsAlreadySending ?
              <Col><Text clWhite txCenter margin={'1.5rem 0 0 0'}>{this.state.messageUserIsAlreadySending}</Text></Col> :
              ''
            }
          </Row>
        </Col>
        <Col defaultAlign={'center'} s={6} m={3} l={2}>
          <Row>
            <Button
              style={ this.state.invalidAmount ? { 'backgroundColor': style.disabledText } : { 'backgroundColor': style.coinsColor[currentNetwork] }}
              css={SendButtonCss}
              className={'send-button'}
              blockCenter
              clWhite
              onClick={ this.state.invalidAmount ? () => { alert("Invalid Amount") } : () => { this.handleSend(this.state.sendAddress) } }
              innerRef={ this.ref.sendButton }>
              Send
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
    walletInfo: state.walletInfo,
    component_wallet: state.component.wallet
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
