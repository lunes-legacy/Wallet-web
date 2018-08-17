import React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { timer } from 'Utils/functions';
import { Text, Col, Row, Img } from 'Components';
import { css } from 'styled-components';
import { TESTNET } from 'Config/constants';
import style from 'Shared/style-variables';

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
		this.ref.wrapper = React.createRef();
		this.ref.coinAmount = React.createRef();
	}
	animThisComponentIn = () => {
		this.wrapper.style.transform = 'translateY(0px)';
	}
	animThisComponentOut = () => {
		this.wrapper.style.transform = 'translateY(-100%)';
	}
	componentDidMount() {
		this.wrapper = findDOMNode(this.ref.wrapper.current);
		this.coinAmount = findDOMNode(this.ref.coinAmount.current);

		setTimeout(() => {
			this.animThisComponentIn();
			setTimeout(() => {
				this.animCoinComponent();
			}, 300);
		}, 100);
	}
	animCoinComponent = async () => {
		let targetAmount = parseFloat(this.props.coinAmount);
		let currAmount = 0;
		let prevAmount = 0;
		//incremetador é de 10% sobre o valor total
		let increaser = targetAmount * 0.01;
		while (true) {
			currAmount = currAmount + increaser;
			if (prevAmount >= targetAmount) {
				this.coinAmount.textContent = targetAmount.toFixed(8);
				this.setState({ blocked: false });
				break;
			}
			await timer(20);
			this.coinAmount.textContent = parseFloat(currAmount).toFixed(8);
			prevAmount = currAmount;
		}
	}
	_shouldGoToTheNextStep = () => {
		let { status } = this.props.modalSend;

		if (this.state.blocked || status === 'loading') {
			return;
		}
		setTimeout(() => {
			this.animThisComponentOut();
			setTimeout(() => {
				this.props.nextStep();
			}, 400);
		}, 500);
	}
	componentDidUpdate() {
		this._shouldGoToTheNextStep();
	}
	render() {
		let currentNetwork = this.props.wallet.currentNetwork.toLowerCase();
		return  (
			<Row css={CssWrapper} ref={this.ref.wrapper} defaultAlign={'center'}>
				<Col s={12} m={6} l={6}>
					<Img center width={'10rem'} src={'/img/app_wallet/ic_enviado_.svg'} />
					<Text margin={'1rem 0 1rem 0'} txCenter clWhite size={'3rem'}>Sending</Text>
					<Text ref={this.ref.coinAmount} margin={'0 0 1rem 0'} txCenter color={style.coinsColor[currentNetwork]} size={'2.5rem'}></Text>
					<Text txCenter clWhite size={'2.5rem'}>address</Text>
					<Text txCenter clWhite size={'2rem'}>{this.props.address}</Text>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		wallet: state.component.wallet,
		modalSend: state.component.wallet.modalSend
	}
}
export default connect(mapStateToProps)(Loading);
