import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// COMPONENTS
import { Row, Col, H1, H2 } from 'Components';
import { ButtonGreen } from "Components/Buttons";


const Content = styled.div`
`;

const Input = styled.input`
  border: 1px solid ${style.lightPurple};
  background-color: ${style.defaultPurple};
  border-radius: 6px;
  color: ${style.normalGreen};
	font-size: 1.6rem;
	text-align: center;
  margin: 10px 0;
  padding: 20px;
	resize: none;
	width: 100%;
`;
class Rescue extends React.Component {  
	render() {
		return (
			<Content>
				<H1 fontSize={"1.6rem"} txBold clWhite>
					Digite suas palavras
				</H1>
				<Input placeholder="Ex: fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish"/>
				<Row>
					<H2 fontSize={"1.6rem"} margin={"0 0 1.0rem 0"} padding={"1.0rem 0 0 0"} clNormalGreen>
						161cmLgavNNkWTjR61RnNqtejFeB88X6FM
					</H2>
					<ButtonGreen width="130px" fontSize={'0.8rem'}>IMPORTAR</ButtonGreen>
				</Row>
			</Content>
		);
	}
}

export default Rescue;