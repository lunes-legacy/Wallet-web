import React     from 'react';
import styled    from 'styled-components';
import style     from 'Shared/style-variables';
import { users } from 'lunes-lib';
import { toggleScaleX, toggleWidth } from 'Utils/ui';

import { TextBase } from 'Components/TextBase';
import { Text }     from 'Components/Text';

let Panels = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`;
let PanelLeft = styled.div.attrs({
	state: 'visible'
})`
	background: ${style.normalLilac};
	max-width: 90%;
	height: 100%;
	box-shadow: 30px 0 40px rgba(0,0,0,.2);
	z-index: 2;
	position: relative;
	width: 31.66666%;

	transform-origin: left;
	transform: scaleX(1);
	opacity: 1;

	// transition: transform 0.3s, opacity 0.5s;
	transition: width .3s, max-width .5s;
`;
let PanelRight = styled.div`
	position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
`;
let Coins = styled.div`
	width: auto;
	min-width: 100%;
`;
let CoinsHeader = styled.div`
	${TextBase}
	height: 75px;
	width: 100%;
	background: #654FA4;
	color: white;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 0 0 0 40px;
`;
let Coin = styled.div`
	width: auto;
	min-width: 100%;
	height: 100px;
	display: flex;
	flex-flow: nowrap;
	background: ${style.normalLilac};
	cursor: pointer;

	box-shadow: 30px 0px 20px rgba(0,0,0,.0);
	transform: translateX(0);
	transition: transform 0.3s, box-shadow 0.4s;

	&:hover {
		box-shadow: 20px 0px 40px rgba(0,0,0,.1);
		transform: translateX(20px);
	}

	@media (min-width: 320px) {
		padding: 0 3rem 0 3rem;
	}
	@media (min-width: 768px) {
		padding: 0 5rem 0 5rem;
	}
`;
let WrapCoinImg = styled.div`
	width: 50%;
	height: 100px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
let CoinImg = styled.img`
	width: 50px;
	height: 50px;
	min-width: 50px;
`;
let WrapCoinData = styled.div`
	height: 100px;
	width: auto;
	display: flex;
	flex-flow: wrap;
	justify-content: flex-end;
	align-items: center;
	align-content: center;
`;
let CoinValue = styled.div`
	width: auto;
	// height: 50px;
	text-align: right;
	${TextBase}
`;
let CoinAmount = styled.div`
	width: 100%;
	// height: 50px;
	text-align: right;
	${TextBase}
`;
let TogglePanelLeft = styled.div`
	position: absolute;
	right: -25px;
	bottom: 50%;
	width: 25px;
	height: 25px;
	background: white;
	cursor: pointer;
	visibility: visible!important;
`;
//PANEL RIGHT _____
let CoinStatus = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${style.normalLilac3};
	padding: 25px 0 25px 0;
`;
let CoinDetailsName  = styled.div`
	${TextBase}
	width: 100%;
	font-size: 2.5rem;
	color: white;
`;
let CoinDetailsPrice = styled.div`
	${TextBase}
	width: 100%;
	font-size: 2.5rem;
	color: white;
`;
let CoinDetails = styled.div`
	width: 33.333%;
	padding: 0 0 0 50px;
`;
let CoinGraph   = styled.div`
	width: 33.333%;
`;
let WrapCoinPercent = styled.div`
	width: 33.333%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
let CoinPercent = styled.div`
	${TextBase}
	font-size: 3rem;
	letter-space: 0.85px;
	color: white;
	width: auto;
	height: 75%;
	background: ${style.normalGreen};
	border-radius: 10px;
	text-align: center;
	padding: 17px 20px 17px 20px;
`;
//PANEL RIGHT__  COIN CONTROL
let CoinControl = styled.div`
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
//PANEL RIGHT ____ HISTORY
let Histories = styled.div`
	width: 100%;
	padding: 50px 0 0 0;
	overflow-x: auto;
`;
let History = styled.div`
	width: 100%;
	border-bottom: 1px solid black;
`;
let HistoryHead = styled.div`
	width: 100%;
	display: flex;
	padding: 10px 0 10px 0;
`;
let HistoryHeadStatus = styled.div`
	padding: 0 50px 0 50px;
`;
let HeadStatusIcon = styled.div`
	width: 20px;
	height: 20px;
	background: ${style.normalRed};
	display: block;
	margin: 0 auto;
`;
let HeadStatusDate = styled.div`
	${TextBase}
	color: white;
	text-align: center;
	font-size: 1.5rem;
`;
let HistoryHeadText = styled.div`
	${TextBase}
	color: white;
	display: flex;
	align-items: center;
`;
let HistoryHeadAmount = styled.div`
	${TextBase}
	color: white;
	margin-left: auto;
	display: flex;
	flex-flow: nowrap;
	padding: 0 20px 0 0;
`;
let HeadAmountCoin = styled.div`
	${TextBase}
	color: white;
	padding: 0 20px 0 0;
`;
let HeadAmountMoney = styled.div`
	${TextBase}
	color: white;
`;
let HistoryContent = styled.div`
	width: 100%;
	display: flex;
	flex-flow: wrap;
	padding: 0 20px 0 20px;

	transform: scaleY(0);

	transition: transform 0.3s;
`;
let HistoryContentItem = styled.div`
	${TextBase}
	width: 50%;
	padding: 0 0 20px 0;
`;
let TextBold = Text.extend`
	${TextBase}
	font-weight: bold;
	display: inline-block;
`;

export default class Wallet extends React.Component {
	componentDidMount() {
		let promise = users.login({
			email: 'marcelosmtp@gmail.com',
			password: '123123123'
		});
		promise.then((e) => {
			console.log(e, "LOGIN");
			document.cookie = '';
		});
	}
	handleTogglePanelLeft = (event) => {
		let panelLeftEl = event.currentTarget.parentElement;
		toggleWidth({ 
			element: panelLeftEl,
			visible: '31.6666%', 
			hidden: '0px'
		});
	}
	handleToggleHistory = (event) => {
		let historyEl = event.currentTarget.parentElement;
		let historyContentEl = historyEl.querySelector(':nth-child(2)');
		toggleScaleY({
			element: historyContentEl,
			visible: '1',
			hidden: '0'
		});
	}
	render() {
		return(
			<Panels>
				<PanelLeft>
					<Coins>
						<CoinsHeader>
							MINHAS CARTEIRAS
						</CoinsHeader>
						<img src={"/img/wave-my-wallets.png"} style={{width: '100%'}}/>
						<Coin>
							<WrapCoinImg>
								<CoinImg src="/img/bitcoin.svg"/>
							</WrapCoinImg>
							<WrapCoinData>
								<CoinAmount clWhite size={'2.5rem'}>
									9.00000000
								</CoinAmount>
								<CoinValue clWhite size={'2rem'}>
									R$ 20,00
								</CoinValue>
							</WrapCoinData>
						</Coin>
					</Coins>
					<TogglePanelLeft onClick={this.handleTogglePanelLeft}/>
				</PanelLeft>

				<PanelRight>
					<CoinStatus>
						<CoinDetails>
							<CoinDetailsName>
								Bitcoin
							</CoinDetailsName>
							<CoinDetailsPrice>
								1 BTC R$ 21.000,00
							</CoinDetailsPrice>
						</CoinDetails>
						<CoinGraph>
							{/*GRAFICO AQUI*/}
							<img src="/img/fake-coin-graph.png"/>
						</CoinGraph>
						<WrapCoinPercent>
							<CoinPercent>-350%</CoinPercent>
						</WrapCoinPercent>
					</CoinStatus>
					<CoinControl>
						<WrapAmount>
							<Amount>0.00000001</Amount>
							<Usd>USD 2.00</Usd>
							<Brl>BRL 6,30</Brl>
						</WrapAmount>

						<WrapButtons>
							<SendCoin>Enviar</SendCoin>
							<ReceiveCoin>Receber</ReceiveCoin>
						</WrapButtons>
					</CoinControl>

					<Histories>
						<History>
							<HistoryHead onClick={this.handleToggleHistory}>
								<HistoryHeadStatus>
									<HeadStatusIcon/>
									<HeadStatusDate>
										25/05/2018
									</HeadStatusDate>
								</HistoryHeadStatus>
								<HistoryHeadText>
									Enviado 2 horas atrás
								</HistoryHeadText>
								<HistoryHeadAmount>
									<HeadAmountCoin>
										-0.00000002
									</HeadAmountCoin>
									<HeadAmountMoney>
										(R$ 1,00)
									</HeadAmountMoney>
								</HistoryHeadAmount>
							</HistoryHead>
							<HistoryContent>
								<HistoryContentItem clWhite>
									Enviado: <TextBold>0.00000002 BTC ($ 2.00)</TextBold>
								</HistoryContentItem>
								<HistoryContentItem clWhite>
									Transaction ID: <TextBold>a123ae456d54f564c654b4a564e</TextBold>
								</HistoryContentItem>
								<HistoryContentItem clWhite>
									Data: Segunda-feira, <TextBold>25/04/2018</TextBold>
								</HistoryContentItem>
							</HistoryContent>
						</History>
					</Histories>
				</PanelRight>
			</Panels>
		);
	}
}