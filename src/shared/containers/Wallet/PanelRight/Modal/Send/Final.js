import React from 'react';
import { Img, Row, Col, Text, Loading } from 'Components';
import { LinkBase } from 'Components/LinkBase';
import { BLOCK_EXPLORER } from 'Config/constants';
import styled, { css } from 'styled-components';

import { connect }         from 'react-redux';
import { setterModalSend } from 'Redux/actions';

let CustomAnchor = styled.a`
	${LinkBase}
`;
let BackCss = css`
	cursor: pointer;
	user-select: none;
`;

class Final extends React.Component {
	_renderTransactionID = () => {
		let { status, txid }   = this.props.modalSend;
		let { currentNetwork } = this.props.component_wallet;
		let explorer           = BLOCK_EXPLORER.get(currentNetwork);

		if (status.type === 'loading') {
			return (
				<React.Fragment>
					<Loading/>
					<Text clWhite txCenter padding={"25px 0 0 0"}>{ status.message }</Text>
				</React.Fragment>
			);
		} else if (status.type !== 'complete') {
			return (
				<React.Fragment>
					<Text clWhite txCenter>{ status.message }</Text>
					<Text css={BackCss} clWhite txRight onClick={() => this.props.goToStep(0)}>Back</Text>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				<Img center width={'40%'} src={'/img/app_wallet/ic_send_final.png'}/>
				<Text padding={'25px 0 0 0'} txCenter clWhite>Transaction ID</Text><CustomAnchor txCenter txDecoration={"underline"} target="_blank" href={BLOCK_EXPLORER.get("LNS")+'tx/'+txid}>{ txid }</CustomAnchor>
				<Text css={BackCss} clWhite txRight onClick={() => this.props.goToStep(0)}>Back</Text>
			</React.Fragment>
		);
	}
	render() {
		return(
			<Row defaultAlign={'center'}>
				<Col s={6} m={6} l={6}>
					{ this._renderTransactionID() }
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		component_wallet: state.component.wallet,
		modalSend: state.component.wallet.modalSend
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setterModalSend: (data) => {
			dispatch(setterModalSend(data));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Final);
