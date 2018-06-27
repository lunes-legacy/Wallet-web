import React from 'react';
import { Img, Row, Col } from 'Components';
import styled, { keyframes } from 'styled-components';

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
	render() {
		return(
			<Row defaultAlign={'center'}>
				<Col s={6} m={6} l={6}>
					{/*<Img center width={'70%'} src={'/img/app_wallet/ic_send_final.png'}/>*/}
					<Anim/>
				</Col>
			</Row>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		modalSend: state.component.modalSend
	}
}
const mapDispatchToProps = () => {
	return {

	}
}
export default connect()(Final);
// export default Final;