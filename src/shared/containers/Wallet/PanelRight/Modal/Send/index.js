import React from 'react';
import { coins } from 'lunes-lib';

//COMPONENTS
import Send    from './Send';
import Loading from './Loading'
import Final   from './Final';

//PRIVATE COMPONENTS
import Background  from '../Background';
import Close       from '../Close';
import Content     from '../Content';
import Head        from '../Head';
import IconCoin    from '../IconCoin';
import StyledModal from '../StyledModal';

//UI
import { toggleModal } from './../ui';

//REDUX
import { connect }         from 'react-redux';
import { setterModalSend } from 'Redux/actions';

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
	goToStep = (step) => {
		this.setState({
			currStep: step
		});		
	}
	prevStep = () => {

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
		this.setState({
			...this.state,
			currStep: 0
		});
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
						<IconCoin src={'/img/coins/lns.svg'}/>
					</Head>

					<Content>
						<Component goToStep={(step) => this.goToStep(step)} nextStep={(props) => this.nextStep(props)} {...this.state.generalProps} />
					</Content>

				</StyledModal>
			</Background>
		);
	}	
}

const mapStateToProps = (state) => {
	return {
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalSend);
