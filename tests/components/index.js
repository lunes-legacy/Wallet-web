import React from 'react';
import { render } from 'react-dom';
import ModalSend from 'Containers/Wallet/PanelRight/ModalSend/index';
import Input from 'Components/forms/Input';
import { Col, Row } from 'Components/index';

// let toRender = () => {
// 	return (
// 	<div>
// 		<h3>Dados</h3>
// 		<Input normal whiteTheme s={12} m={6} l={6} type={'text'} label={{value: 'Nome', txItalic: true}} />
// 		<br/>
// 		<br/>
// 		<br/>
// 		<br/>
// 		<Input normal whiteTheme s={12} m={6} l={6} type={'number'} label={{value: 'Idade', txItalic: true}} />
// 		<h3>Pessoas</h3>
// 		<Input type={'select'} s={12} m={6} l={6} label={{value: 'Nome', txBold:true}}>
// 			<option>Marcelo</option>
// 			<option>Rafael</option>
// 			<option>Brito</option>
// 			<option>Joao</option>
// 			<option>Jao</option>
// 			<option>Felipe</option>
// 			<option>Bruno</option>
// 			<option>Mateus</option>
// 			<option>Jonas</option>
// 			<option>Lucas</option>
// 			<option>Tiago</option>
// 			<option>Cássia</option>
// 			<option>Hellen</option>
// 			<option>Ana</option>
// 			<option>Josefina</option>
// 		</Input>
// 		<h3>Alimentos</h3>
// 		<Input type={'radio'} name={'agree'} label={{value: 'Batata'}}/>
// 		<Input type={'radio'} name={'agree'} label={{value: 'Feijao'}}/>
// 		<Input type={'checkbox'} label={{value: 'Concordo e aceito com os termos'}}/>
// 		<br/>
// 		<br/>
// 		<br/>
// 		<br/>
// 		<br/>
// 		<Row>
// 			<Col s={4} m={4} l={4} style={{background: 'red', height: '100px'}}></Col>
// 			<Col s={4} m={4} l={4} style={{background: 'blue', height: '100px'}}></Col>
// 		</Row>
// 	</div>);
// }
let props = {
	coinName: 'btc',
	send: ({coinAmount, address}) => {
		console.log(`%cEnviando ${coinAmount} para ${address}`, 'background: indianred; color: lightgreen; font-size: 20px;');
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(`Enviado para ${address}`)
			}, 1000);
		});
	}
};
const toRender = () => {
	return(
		<ModalSend {...props}/>	
	);
}

render(
	toRender(), 
	document.querySelector('.root'));
