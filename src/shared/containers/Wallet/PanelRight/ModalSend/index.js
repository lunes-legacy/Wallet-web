import React       from 'react';
import styled      from 'styled-components';
import style       from 'Shared/style-variables';
import { connect } from 'react-redux';

//JUST TO TEST THE COMPONENT
import { render } from 'react-dom';

let Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,.7);
	z-index: 1000;
`;
let StyledModal = styled.div`
	width: 70%;
	height: 70%;
	min-width: 320px;
	min-height: 480px;
	position: relative;
	background: ${style.normalLilac};
	border-radius: 10px;
`;
let Close   = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;
	font-size: 40px;
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
let Content = styled.div``;
let Foot    = styled.div``;


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
					</Content>

					<Foot>
					</Foot>
				</StyledModal>
			</Background>
		);
	}
}
{/*render(<ModalSend/>, document.querySelector('.root'));*/}
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