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
	background-image: url('http://127.0.0.1:8080/test3.png');
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

export default Final;