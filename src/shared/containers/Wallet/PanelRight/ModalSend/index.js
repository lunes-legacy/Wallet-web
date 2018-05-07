import React       from 'react';
import styled      from 'styled-components';
import style       from 'Shared/style-variables';
import { connect } from 'react-redux';
// import { Row } from 'react-materialize';
import { Input, Col, Row } from 'Components/materialize';
import { H1 } from 'Components/H1';
import { Text } from 'Components/Text';

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
	padding: 10px;
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
class ModalSend extends React.Component {
	toggleModal = (event) => {

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
							<Col offset={'s3'} s={6} m={6} l={6}>
								<Input s={12} type={'radio'} className={'js-modal-send-quantity'} label={'Quantidade LTC'}/>
							</Col>
							<Col s={12} m={6} l={6}>
								<Row>
									<Input clWhite fontSize={'2rem'} s={12} m={12} l={12} type={'text'} className={'js-modal-send-amount'} placeholder={'0.00000000'}/>
								</Row>
								<Row>
									<Input type={'radio'} label={'25%'} unique={'true'} name={'percent'} className={'with-gap'}/>
									<Input type={'radio'} label={'50%'} unique={'true'} name={'percent'} className={'with-gap'}/>
									<Input type={'radio'} label={'75%'} unique={'true'} name={'percent'} className={'with-gap'}/>
									<Input type={'radio'} label={'Max'} unique={'true'} name={'percent'} className={'with-gap'}/>
								</Row>
							</Col>
						</Row>

						<Hr/>

						<Row>
							<Col s={6} m={6} l={6}>
								<Row>
									<Input type={'radio'} label={'Valor em dólar'} name={'fiat-unit'}/>
								</Row>
								<Row>
									<Input type={'radio'} label={'Valor em real'} name={'fiat-unit'} checked={true}/>
								</Row>
							</Col>
							<Col s={6} m={6} l={6} noMargin >
								<Row>
									<Input noMargin clWhite fontSize={'2rem'} type={'text'} s={12} m={12} l={12} label={'BRL'}/>
								</Row>
								<Row>
									<Text clWhite fontSize={'1.7rem'}>USD 0.00</Text>
								</Row>
							</Col>
						</Row>

						<Hr/>

						<Row>
							<Col s={12}>
								<Input clWhite fontSize={'2rem'} s={6} label={'address'}/>
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