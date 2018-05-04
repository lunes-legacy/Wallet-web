import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { TextBase } from 'Components/TextBase';
import { Text } from 'Components/Text';


let StyledCoinControl = styled.div`
	width: 100%;
	padding: 50px 25px 50px 25px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	box-shadow: 0 3px 5px rgba(0,0,0,.2);
`;
let WrapAmount = styled.div`
	
`;
let Amount     = styled.div`
	${TextBase}
	font-size: 5rem;
	color: white;
`;
let Usd        = styled.div`
	${TextBase}
	font-size: 2.7rem;
	color: white;
	display: inline-block;
	line-height: 50px;
`;
let Brl        = styled.div`
	${TextBase}
	font-size: 2.7rem;
	color: white;
	display: inline-block;
	line-height: 50px;
	margin: 0 0 0 20px;
	padding: 0 0 0 20px;
	border-left: 2px solid ${style.normalGreen};
`;
	
let WrapButtons = styled.div`
	display: flex;
	flex-flow: wrap;
`;
let SendCoin    = styled.div`
	${TextBase}
	width: 125px;
	// height: 125px;
	padding: 53px 0 53px 0;
	text-align: center;
	margin: 0 0 0 25px;
	background: ${style.normalRed};
	cursor: pointer;
	color: white;
	border-radius: 20px;
`;
let ReceiveCoin = styled.div`
	${TextBase}
	width: 125px;
	// height: 125px;
	padding: 53px 0 53px 0;
	margin: 0 0 0 25px;
	text-align: center;
	background: ${style.normalGreen};
	cursor: pointer;
	color: white;
	border-radius: 20px;
`;


class CoinControl extends React.Component {
	render() {
		return(
			<StyledCoinControl>
				<WrapAmount>
					<Amount>0.00000001</Amount>
					<Usd>USD 2.00</Usd>
					<Brl>BRL 6,30</Brl>
				</WrapAmount>

				<WrapButtons>
					<SendCoin>Enviar</SendCoin>
					<ReceiveCoin>Receber</ReceiveCoin>
				</WrapButtons>
			</StyledCoinControl>
		);
	}
}

export default CoinControl;