import React from 'react';
import { render } from 'react-dom';
import { Components } from 'DocComponents';
import { Pages } from 'DocPages';
import { Row, Col, Button, Loading, H1 } from 'Components';
const Containers = []; //precisa ser feito ainda

let Routes = {
	Pages,
	Components,
	Containers
}

class Index extends React.Component {
	constructor(props) {
		super(props);
		//componente que o usuario clicou no menu vai ser chamado
		//de acordo com o objeto pego do Components
		let InitialComponent = Routes.Pages.Texts;
		this.state = {
			currentComponent: <InitialComponent handleButtonMenu={() => this.handleButtonMenu}/>
		}
	}
	_setCurrentComponent = (Component) => {
		if (!Component) {
			this._setPanelRightAsLoading(false);
			return;
		}
		this.setState({
			currentComponent: <Component handleButtonMenu={() => this.handleButtonMenu}/>,
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
		this._setCurrentComponent(Routes[type][component]);	
	}
	renderPanelRight = () => {
		let loading = this.state.panelRightIsLoading;
		if (loading)
			return <Loading/>
		else
			return this.state.currentComponent
	}
	render() {
		return(
			<Row defaultAlign="left" style={{height: '100%'}}>
				<Col s={3} m={3} l={3} className={'panel-left'}>
					<H1>General Components</H1>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Pages/Grids"}>Grids</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Pages/Forms"}>Forms</button>
					<button className={'btn'} onClick={this.handleButtonMenu} data-component={"Pages/Texts"}>Texts</button>

					<H1>Containers</H1>
				</Col>

				<Col s={9} m={9} l={9} className={"panel-right"}>
					{ this.renderPanelRight() }
				</Col>
			</Row>
		);
	}
}


render(<Index/>, document.querySelector('.root'));
