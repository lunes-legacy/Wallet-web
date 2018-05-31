import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

//COMPONENTS
import CoinsAddress from "./coinsAddress";
import { H1 } from "Components/H1";
import { H2 } from "Components/H2";
import { P } from "Components/P";

const Container = styled.div`
  padding: 50px 100px;
	width: 90%;
`;

const Line = styled.div`
	border-bottom: 1px dotted ${style.lightPurple};
	margin: 20px 0;
	width: 100%;
`;

const Content = styled.div`
	padding-left: 10px;
`;

const Phrase = styled.div`
	margin-top: 35px;
`;

const Addresses = styled.div`
`;

const Tab = styled.div`
	background-color: ${style.defaultPurple};
	border-bottom: 5px solid ${style.normalGreen};
	text-align: center;
	padding: 20px;
	width: 200px;
`;


const Input = styled.input`
	border: 1px solid ${style.lightPurple};
	background-color: ${style.defaultPurple};
	border-radius: 6px;
	color: ${style.normalGreen};
	font-Size: 1.6rem;
	margin: 10px 0;
	padding: 20px;
	width: 100%;
`;


class Privacy extends React.Component {
	render() {
		return (
			<Container>
				<Tab>
					<H2 fontSize={'1.3rem'} txBold clWhite> 
						Backup de Segurança
					</H2>
				</Tab>
				<Content>
					<Phrase>
						<H1 fontSize={'1.6rem'} txBold clWhite> 
							Frase de Backup
						</H1>
						<Input disabled type="text" value='fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish' />
					</Phrase>

					<Line />

					<Addresses>
						<H1 fontSize={'1.6rem'} txBold clWhite> 
							Endereços das Carteiras
						</H1>
						<CoinsAddress />
					</Addresses>
				</Content>
			</Container>
		);
	}
}

export default Privacy;