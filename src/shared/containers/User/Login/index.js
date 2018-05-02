import React          from 'react';
import { users }      from 'lunes-lib';
import { connect }    from 'react-redux';
import { Link }       from 'react-router-dom';
import styled         from 'styled-components';
import style          from 'Shared/style-variables';
import { UserClass }  from 'Classes/User';
//COMPONENTS
import { Form }       from 'Components/Form';
import { FormGroup }  from 'Components/FormGroup';
import { Input }      from 'Components/Input';
import { ButtonSecondary } from 'Components/Buttons';
import { H1 }         from 'Components/H1';
import { H2 }         from 'Components/H2';
import { H3 }         from 'Components/H3';
import { P }          from 'Components/P';
import { Logo }       from 'Components/Logo';
//PRIVATE COMPONENTS
import PanelLeft      from './PanelLeft';
import PanelRight     from './PanelRight';

let WrapPhrases = styled.div`
	width: 100%;
	margin-top: 70px;
`;
let CustomLogo = Logo.extend`
	margin: 70px auto 0 auto;
`;
let CustomLink = styled(Link)`
	font-size: 1.2rem;
	text-decoration: none;
	text-align: center;
	display: block;
	color: ${props => props.color ? props.color : 'white'};
	margin: ${props => props.margin ? props.margin : '10px auto 0 auto' };
`;

let CustomLinkRight = CustomLink.extend`
	text-align: right;
`;

class Login extends React.Component {
	componentDidUpdate() {
		this.handleStatus();
	}
	handleLogin = (event) => {
		event.preventDefault();
		let emailEl = document.querySelector('.login-email');
		let passEl  = document.querySelector('.login-password');

		let email = emailEl.value;
		let password = passEl.value;
		this.props.userLogin(email, password);
	}
	handleStatus() {
		let statusEl = document.querySelector('.js-status');
		
		let { status } = this.props.user;

		if (status === 'pending') {
			statusEl.textContent = 'Aguarde...';
		} else if (status === 'fulfilled') {
			statusEl.textContent = 'Sucesso';
		} else if (status === 'rejected') {
			statusEl.textContent = 'Tente novamente';
		}
	}
	render() {
		let { status, logged } = this.props.user;
		return(
			<div>
				<PanelLeft>
					<CustomLogo/>

					<WrapPhrases>
						<H1 clNormalGreen txCenter >Rápida, segura e inteligente</H1>
						<P clWhite txCenter margin={'20px 0 70px 0'} fontSize={'1.2rem'}>Entre com seus dados</P>
					</WrapPhrases>

					<Form margin={"20px auto"} width={'80%'}>
						<FormGroup>
							<Input placeholder={"nome@email.com"} className={"login-email"}/>
						</FormGroup>
						<FormGroup>
							<Input type="password" placeholder={"Senha"} className={"login-password"}/>
						</FormGroup>

						<CustomLinkRight to={"/reset"} margin={"0 auto 25px auto"}>Esqueceu a senha?</CustomLinkRight>					

						<ButtonSecondary secondary onClick={this.handleLogin}>
							{  logged ? 'Logado' : 'Fazer login'}
						</ButtonSecondary>
					</Form>

					<H1 txCenter clWhite className={"js-status"}></H1>

					<P clWhite txCenter margin={'70px 0 0 0'} fontSize={'1.2rem'}>
						Não tem uma conta? <CustomLink to={"/registry"} color={`${style.normalGreen}`}>Inscrever-se.</CustomLink>
					</P>
				</PanelLeft>

				<PanelRight/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		userLogin: (email, password) => {
			let user = new UserClass;
			dispatch({
				type: 'USER_LOGIN',
				payload: user.login({email, password})
			});
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);