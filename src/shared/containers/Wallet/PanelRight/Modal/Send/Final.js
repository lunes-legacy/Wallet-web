import React from 'react';
import { Img, Row, Col, Text } from 'Components';
import styled, { keyframes } from 'styled-components';

//REDUX
import { connect } from 'react-redux';
import { setterModalSend } from 'Redux/actions';

const StepByStepLoading = keyframes`
	0% {
		background-position: 0px;
	}
	100% {
		background-position: -5687px;
	}
`;
const Anim = styled.div`
	display: block;
	margin: 0 auto;
	width: 300px;
	height: 300px;
	background-image: url('/img/app_wallet/modal_send/sprite_animation_done.png');
	animation: ${StepByStepLoading} .6s steps(19);
	animation-fill-mode: forwards;
`;

class Final extends React.Component {
	_renderLoading = (message) => {
		return (
			<Row>
				<Col>
					<Text txCenter clWhite>{ message }</Text>
				</Col>
			</Row>
		);
	}
	_renderCompleted = () => {
		return(
			<Row defaultAlign={'center'}>
				<Col s={6} m={6} l={6}>
					<Anim/>
				</Col>
			</Row>
		);
	}
	_renderError = (message) => {
		return (
			<Row>
				<Col>
					<Text txCenter clWhite>{ message }</Text>
				</Col>
			</Row>
		);
	}
	render() {
		let { status, txid, message } = this.props.modalSend;
		
		switch (status) {
			case 'error':
				return this._renderError(message); break;
			case 'completed':
				return this._renderCompleted(message); break;
			default:
				return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		modalSend: state.component.wallet.modalSend
	}
}
const mapDispatchToProps = () => {
	return { 
		setterModalSend: (data) => {
			dispatch(setterModalSend(data));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Final);
// export default Final; 