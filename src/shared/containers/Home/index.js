import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

//COMPONENTS
import { H1 }    from 'Components/H1';
import { P }    from 'Components/P';
import { ButtonGreen } from "Components/Buttons";

const Container = styled.div`
	text-align: center;
	padding: 0 50px;
`;

const MainRectangle = styled.div`
	display: inline-block;
	margin: 20px;
	padding: 20px 0;
	width: 299px;
	height: 384px;
	border-radius: 10px;
	background-color: #442181;
`;

const Icon = styled.img`
	margin-top: 10px;
	position: center;
	height: 86px;
	width: 90.1px;	
`;

const TextRectangle = styled.div`
	padding: 0 25px;;
	width: 100%;
	height: 96px;
	text-align: center;
`;

class Home extends React.Component {
	render() {
		return (
			<Container>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_portfolio.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_wallet.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_recharge.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_barcode.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_buy.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

				<MainRectangle>
					<Icon src={"/img/app_panel_left/ic_privacy.svg"} />
					<H1 fontSize={'2rem'} margin={'2.2rem 0 3.0rem 0'} txBold txCenter clWhite> Portfólio </H1>
					<TextRectangle>
						<P fontSize={'1.5rem'} txCenter clWhite>Muito obrigado por escolher a Wallet Lunes como sua carteira multicoin. Aproveite da usabilidade e tecnologia desta incrível carteira e armazene suas criptomoedas com um alto nível de segurança..</P>
					</TextRectangle>
					<ButtonGreen width="97px" margin={"3.0rem auto 1.0rem auto"}>Entrar</ButtonGreen>
				</MainRectangle>

			</Container>
		);
	}
}

export default Home;