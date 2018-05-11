import React       from 'react';
import ReactDOM    from 'react-dom';
import styled, { css }      from 'styled-components';
import style       from 'Shared/style-variables';
import { connect } from 'react-redux';
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
`;
let IconCoin = styled.img`
	width: 60%;
	height: 60%;
`;
let Content = styled.div`
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
class ModalSend extends React.Component {
	constructor(props) {
		super(props);
		this.ref = {};
		this.ref['wrapperQr']       = React.createRef();
		this.ref['radioCoinAmount'] = React.createRef();
		this.ref['coinAmount']      = React.createRef();
		this.ref['address']         = React.createRef();
	}
	componentDidMount() {
		this.wrapperQr       = ReactDOM.findDOMNode(this.ref.wrapperQr.current);
		this.radioCoinAmount = ReactDOM.findDOMNode(this.ref.radioCoinAmount.current);
		this.coinAmount      = ReactDOM.findDOMNode(this.ref.coinAmount.current);
		this.address         = ReactDOM.findDOMNode(this.ref.address.current);
		this.makeQrCode();
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
										<Input 
											innerRef={this.ref.radioCoinAmount}
											normal 
											s={12} 
											type={'radio'}
											label={{value: 'Quantidade LTC'}}/>
									</Col>
									<Col s={12} m={6} l={6}>
										<Row>
											<Input 
												huge 
												phRight 
												noBorder 
												whiteTheme 
												innerRef={this.ref.coinAmount}
												type={'text'} 
												placeholder={'0.00000000'} 
												fontSize={'4rem'} 
												s={12} m={12} l={12}/>
										</Row>
										<Row>
											<Input 
												type={'radio'} 
												label={{value: '25%'}} 
												name={'percent'} 
												normal />
											<Input 
												type={'radio'} 
												label={{value: '50%'}} 
												name={'percent'} 
												normal />
											<Input 
												type={'radio'} 
												label={{value: '75%'}} 
												name={'percent'} 
												normal />
											<Input 
												type={'radio'} 
												label={{value: 'Max'}} 
												name={'percent'} 
												normal />
										</Row>
									</Col>
								</Row>

								<Hr/>

								{/*SECOND ROW*/}
								<Row style={{padding: '3rem 0 3rem 0'}}>
									<Col s={6} m={6} l={6}>
										<Row sAlign={'left'} mAlign={'left'} lAlign={'left'} style={{textAlign:'left'}}>
											<Input 
												type={'radio'} 
												label={{value: 'Valor em dólar'}} 
												name={'fiat-unit'}
												normal />
										</Row>
										<Row 
											sAlign={'left'} 
											mAlign={'left'} 
											lAlign={'left'} 
											style={{textAlign:'left'}}>
											<Input 
												type={'radio'} 
												label={{value: 'Valor em real'}} 
												name={'fiat-unit'} 
												checked={true}
												normal />
										</Row>
									</Col>
									<Col s={6} m={6} l={6}>
										<Row>
											{/*<Input fontSize={'4rem'} type={'text'} s={12} m={12} l={12} whiteTheme label={{value:'BRL'}}/>*/}
											<Input 
												huge 
												phRight 
												noBorder 
												whiteTheme 
												type={'text'} 
												placeholder={'BRL 0.00'}
												s={12} m={12} l={12}/>
										</Row>
										<Row defaultAlign='right'>
											<Text 
												clWhite 
												fontSize={'1.7rem'}>USD 0.00</Text>
										</Row>
									</Col>
								</Row>

								<Hr/>

								{/*THIRD ROW*/}
								<Row>
									<Col defaultAlign={'center'} s={12} m={6} l={6}>
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
							</Col>

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