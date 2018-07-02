import React                   from 'react';
import { Img, Row, Col, Text } from 'Components';
import styled, { keyframes, css }   from 'styled-components';
import { TextBase }            from 'Components';

//UTILS
import { getTxidLink } from 'Utils/crypto';

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
const Anchor = styled.a`
	${TextBase};
	color: white;
	text-align: center;
`;
const CssColCompleted = css`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-flow: wrap;
	& .txid {
		width: 100%;
		text-align: center;
		color: white;
	}
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
	_renderCompleted = (currentNetwork, txid) => {
		let linkToExplorer = getTxidLink(currentNetwork, txid);
		return(
			<Row defaultAlign={'center'}>
				<Col css={CssColCompleted}>
					<Anim/>
					<Text className={'txid'}>txid: <Anchor href={linkToExplorer} target="_blank">{ txid }</Anchor></Text>
				</Col>
			</Row>
		);
	}
	_renderError = (message) => {
		return (
			<Row>
				<Col>
					<Text txCenter clNormalRed txBold>{ message }</Text>
				</Col>
			</Row>
		);
	}
	render() {
		let { status, txid, message } = this.props.modalSend;
		let { currentNetwork } = this.props.component_wallet;
		
		switch (status) {
			case 'error':
				return this._renderError(message); break;
			case 'completed':
				return this._renderCompleted(currentNetwork, txid); break;
			default:
				return null;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		component_wallet: state.component.wallet,
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