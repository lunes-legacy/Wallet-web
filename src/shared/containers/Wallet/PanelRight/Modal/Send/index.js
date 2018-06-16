import React from 'react';
//COMPONENTS
import Send    from './Send';
import Loading from './Loading'
import Final   from './Final';
//PRIVATE COMPONENTS
import Background  from '../Background';
import Close       from '../Close';
import Content     from '../Content';
import Foot        from '../Foot';
import Head        from '../Head';
import IconCoin    from '../IconCoin';
import StyledModal from '../StyledModal';
//UI
import { toggleModal } from './../ui';
//REDUX
import { connect }           from 'react-redux';
import { setterWalletSend } from 'Redux/actions';

class ModalSend extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currStep: 0,
			generalProps: props
		}
	}
	componentDidMount() {
		let steps = [
			{name: 'Step 1', component: Send},
			{name: 'Step 2', component: Loading},
			{name: 'Step 3', component: Final}
		]
		this.setState({
			steps
		});
	}
	prevStep = (props) => {
		this.setState({
			currStep: this.state.currStep - 1,
			generalProps: props
		});
	}
	nextStep = (props) => {
		this.setState({
			currStep: this.state.currStep + 1,
			generalProps: props
		});
	}
	_handleClickClose = (event) => {
		let modal = document.querySelector('.js-modal-send');
		toggleModal(modal);
		 /*{className={'js-modal-send'}}*/
	}
	render() {
		if (!this.state.steps) 
			return null;

		let Component = this.state.steps[this.state.currStep].component;
		return (
			<Background>
				<StyledModal className="js-modal-send">
					<Close onClick={this._handleClickClose}>X</Close>

					<Head>
						<IconCoin src={'/img/bitcoin.svg'}/>
					</Head>

					<Content>
						<Component prevStep={(props) => this.prevStep(props)} nextStep={(props) => this.nextStep(props)} {...this.props} {...this.state.generalProps}/>
					</Content>
				</StyledModal>
			</Background>
		);
	}	
}

const mapStateToProps = (state) => {
	return {
		balance: state.balance,
		component_wallet: state.component.wallet,
		cryptocurrencies: state.config
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		setterWalletSend: (data) => {
			dispatch(setterWalletSend(data));
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalSend);
// export default ModalSend;
