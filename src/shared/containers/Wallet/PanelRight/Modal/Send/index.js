import React from 'react';

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
	prevStep = () => {

	}
	nextStep = (props) => {
		this.setState({
			currStep: this.state.currStep + 1,
			generalProps: props
		}, () => {
			console.log(this.state, "nextStep STATE");
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
						<IconCoin src={'/img/coins/lns.svg'}/>
					</Head>

					<Content>
						<Component nextStep={(props) => this.nextStep(props)} {...this.state.generalProps} />
					</Content>

				</StyledModal>
			</Background>
		);
	}	
}

export default ModalSend;
