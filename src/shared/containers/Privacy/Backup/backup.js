import React from "react";
import styled from "styled-components";
import style from "Shared/style-variables";

// COMPONENTS
import CoinsAddress from "./coinsAddress";
import { H1 } from "Components/H1";


const Line = styled.div`
  border-bottom: 1px dotted ${style.lightPurple};
  margin: 20px 0;
  width: 100%;
`;

const Content = styled.div`
  padding-left: 10px;
`;

const Phrase = styled.div`
`;

const Addresses = styled.div`
  margin-bottom: 60px;
`;

const Input = styled.input`
  border: 1px solid ${style.lightPurple};
  background-color: ${style.defaultPurple};
  border-radius: 6px;
  color: ${style.normalGreen};
  font-size: 1.6rem;
  margin: 10px 0;
  padding: 20px;
  width: 100%;
`;

class Backup extends React.Component {  
	render() {
		return (
      <div>
				<Phrase>
					<H1 fontSize={"1.6rem"} txBold clWhite>
						Frase de Backup
					</H1>
					<Input
						disabled
						type="text"
						value="fantasy deliver afford disorder primary protect garbage they defense paddle alert reveal various just dish"
					/>
				</Phrase>
		
				<Line />
		
				<Addresses>
					<H1 fontSize={"1.6rem"} txBold clWhite>
						Endereços das Carteiras
					</H1>
					<CoinsAddress />
				</Addresses>
			</div>
		);
	}
}

export default Backup;