import React from 'react';
import { render } from 'react-dom';
// import ModalSend from 'Containers/Wallet/PanelRight/ModalSend/index';
import Input from 'Components/forms/Input';

let toRender = () => {
	return (
	<div>
		<h3>Dados</h3>
		<Input normal whiteTheme s={12} m={6} l={6} type={'text'} label={{value: 'Nome', txItalic: true}} />
		<br/>
		<br/>
		<br/>
		<br/>
		<Input normal whiteTheme s={12} m={6} l={6} type={'number'} label={{value: 'Idade', txItalic: true}} />
		<h3>Pessoas</h3>
		<Input type={'select'} s={12} m={6} l={6} label={{value: 'Nome', txBold:true}}>
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
		<h3>Alimentos</h3>
		<Input type={'radio'} name={'agree'} label={{value: 'Batata'}}/>
		<Input type={'radio'} name={'agree'} label={{value: 'Feijao'}}/>
		<Input type={'checkbox'} label={{value: 'Concordo e aceito com os termos'}}/>
	</div>);
}

render(
	toRender(), 
	document.querySelector('.root'));
