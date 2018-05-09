//Aqui ficará a tela inicial, a parte, quando o usuário entra na
//rota wallet
import React from 'react';
import styled from 'styled-components';

let StyledDefault = styled.div`
	width: 100%;
	height: 100%:
	display: flex;
	justify-content: center;
	align-items: center;
`;
//deve ser alterado para imagem
//coloquei div para não ficar com icone estranho
let Icon = styled.div`
	width: 100px;
	height: 100px;
	background: dodgerblue;
	border-radius: 10px;
`;
class Default extends React.Component {
	render() {
		return (
			<StyledDefault>
				<Icon/>
			</StyledDefault>
		);
	}
}

export default Default;