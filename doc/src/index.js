import React from 'react';
import { render } from 'react-dom';
import { Components } from 'DocComponents';
import { Row, Col, Button, Loading } from 'Components';
const Containers = []; //precisa ser feito ainda

class Index extends React.Component {
	constructor(props) {
		super(props);
		//componente que o usuario clicou no menu vai ser chamado
		//de acordo com o objeto pego do Components
		let InitialComponent = Components.Initial;
		this.state = {
			currentComponent: <InitialComponent/>
		}
	}
	_setCurrentComponent = (Component) => {
		if (!Component) {
			this._setPanelRightAsLoading(false);
			return false;
		}
		this.setState({
			currentComponent: <Component/>,
			panelRightIsLoading: false
		});
	}
	_setPanelRightAsLoading = (loading) => {
		return new Promise((resolve, reject) => {
			this.setState({
				panelRightIsLoading: loading
			}, () => {
				if (this.state.panelRightIsLoading === loading)
					resolve(true)
				else
					resolve(false)
			});	
		});
	}
	handleButtonMenu = (event) => {
		this._setPanelRightAsLoading(true);
		let clickedEl = event.currentTarget;
		// if (!clickedEl) return;
		let raw       = clickedEl.getAttribute('data-component');
		let arr       = raw.split('/');
		let type      = arr[0];
		let component = arr[1];
		if (type === 'Components') {
			this._setCurrentComponent(Components[component]);	
		} else if (type === 'Containers') {
			this._setCurrentComponent(Containers[component]);	
		}
	}
	renderPanelRight = () => {
		console.log(this.state);
		let loading = this.state.panelRightIsLoading;
		if (loading)
			return <Loading/>
		else
			return this.state.currentComponent
	}
	render() {
		return(
			<Row defaultAlign="left">
				<Col s={3} m={3} l={3} className={'panel-left'}>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/Row"}>Components/Row</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/Col"}>Components/Col</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/Button"}>Components/Button</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/FormBuilder"}>Components/FormBuilder</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/FormGroup"}>Components/FormGroup</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/Form"}>Components/Form</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/H1"}>Components/H1</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/H2"}>Components/H2</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Components/H3"}>Components/H3</button>
				</Col>

				<Col s={9} m={9} l={9} className={"panel-right"}>
					{ this.renderPanelRight() }
				</Col>
			</Row>
		);
	}
}


render(<Index/>, document.querySelector('.root'));
