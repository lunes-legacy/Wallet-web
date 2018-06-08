import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// COMPONENTS
import { H1 } from "Components/H1";

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
	width: 60%;
`;
class Rescue extends React.Component {  
	render() {
		return (
			<Content>
				<H1 fontSize={"1.6rem"} txBold clWhite>
					Digite suas palavras:
				</H1>
				<Input placeholder="Ex: fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish"/>
			</Content>
		);
	}
}

export default Rescue;