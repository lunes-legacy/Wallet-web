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
			<option>Rafael</option>
			<option>Brito</option>
			<option>Joao</option>
			<option>Jao</option>
			<option>Felipe</option>
			<option>Bruno</option>
			<option>Mateus</option>
			<option>Jonas</option>
			<option>Lucas</option>
			<option>Tiago</option>
			<option>Cássia</option>
			<option>Hellen</option>
			<option>Ana</option>
			<option>Josefina</option>
		</Input>
		<Input type={'radio'} name={'agree'} label={{value: 'Nome'}}/>
		<Input type={'radio'} name={'agree'} label={{value: 'Nome'}}/>
		<Input type={'checkbox'} label={{value: 'Concordo e aceito com os termos'}}/>
	</div>);
}

render(
	toRender(), 
	document.querySelector('.root'));
