import React from 'react';
import { render } from 'react-dom';
// import ModalSend from 'Containers/Wallet/PanelRight/ModalSend/index';
import Input from 'Components/forms/Input';

let toRender = () => {
	return (
	<div>
		<Input normal whiteTheme s={12} m={6} l={6} type={'text'} label={{value: 'Nome', txItalic: true}} />
		<Input type={'select'} label={{value: 'Nome', txBold:true}}>
			<option>Marcelo</option>
			<option>Fernandica</option>
			<option>Mordecookie</option>
			<option>Mordecoca</option>
			<option>Mirchel'</option>
		</Input>
		<Input type={'radio'} label={{value: 'Nome'}}/>
	</div>);
}

render(
	toRender(), 
	document.querySelector('.root'));
