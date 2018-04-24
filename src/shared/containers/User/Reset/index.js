import React from 'react';
import styled from 'styled-components';
import { users } from 'lunes-lib';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PanelLeft       from './PanelLeft';
import PanelRight      from './PanelRight';
import { Logo }        from 'Components/Logo';
import { H3 }          from 'Components/H3';
import { H1 }          from 'Components/H1';
import { FormBuilder } from 'Components/FormBuilder';
import { ButtonSecondary } from 'Components/Buttons';

let CustomLogo = Logo.extend`
	margin: 70px auto 0 auto;
`;
let CustomH3 = H3.extend`
	margin: 25px 0 0 0;
	text-align: center;
	color: white;
`;
let CustomForm = styled.form`
	width: 70%;
	display: block;
	margin: 25px auto 0 auto;
`;
let SecondPanelLeft = PanelLeft.extend`
	display: none;
`;
let CustomLink = styled(Link)`
	color: white;
	text-decoration: none;
	text-align: center;
	display: block;
	margin: 25px auto 0 auto;
	${props => props.margin ? 'margin: '+props.margin+';' : '' }
`;
let inputs = [
	{ 
		className: 'reset-email',  
		placeholder: 'E-mail',
		type: 'email' 
	}
];
class Reset extends React.Component {
	handleSubmit = (event) => {
		event.preventDefault();
		let emailEl = document.querySelector('.reset-email');
		this.props.userReset(emailEl.value);	
	}
	componentDidMount() {
	}
	componentDidUpdate() {
		this.handleStatus();
	}
	handleStatus() {
		let firstPanelEl  = document.querySelector('.js-first-panel-left');
		let secondPanelEl = document.querySelector('.js-second-panel-left');
		let statusEl      = document.querySelector('.js-status');
		
		let { status } = this.props.user;

		if (status === 'pending') {
			statusEl.textContent = 'Aguarde...';
		} else if (status === 'fulfilled') {
			firstPanelEl.style.display  = 'none';
			secondPanelEl.style.display = 'block';
			statusEl.textContent = 'Sucesso';
		} else if (status === 'rejected') {
			statusEl.textContent = 'Tente novamente';
		}
	}
	render() {
		let { status, logged } = this.props.user;

		return (
			<div>
				<PanelLeft className={"js-first-panel-left"}>
					<CustomLogo/>

					<CustomH3>Preencha seus dados abaixo</CustomH3>

					<CustomForm onSubmit={this.handleSubmit}>
						<FormBuilder inputs={inputs}/>
						<ButtonSecondary type={"submit"}>
							Resgatar
						</ButtonSecondary>
					</CustomForm>

					<H1 txCenter clWhite margin={"20px 0 0 0"} className={"js-status"}></H1>

					<CustomLink to={'/login'}>Fazer login</CustomLink>
					<CustomLink to={'/registry'}>Criar conta</CustomLink>
				</PanelLeft>

				<SecondPanelLeft className={"js-second-panel-left"}>
					<H1 txCenter clWhite margin={"20px 0 0 0"}>Voce conseguiu</H1>
				</SecondPanelLeft>

				<PanelRight/>
			</div>
		);
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		userReset: (email) => {
			dispatch({
				type: 'USER_RESET',
				payload: users.resetPassword({ 
					email
				})
			});
		}
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);