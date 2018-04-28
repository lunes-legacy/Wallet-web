import React           from 'react';
import style           from 'Shared/style-variables';
import styled          from 'styled-components';
import { TextBase }    from 'Components/TextBase';
import { Text }        from 'Components/Text';
import { connect }     from 'react-redux';
import { H1 }          from 'Components/H1';
import { WalletClass } from 'Classes/Wallet';



//COIN CONTROLS

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
let Histories = styled.div`
	width: 100%;
	height: 100%;
	padding: 50px 0 0 0;
	overflow-x: auto;
`;
let History = styled.div`
	width: 100%;
	border-bottom: 1px solid black;
	position: relative;
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
	align-items: center;
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
	position: absolute;
	top: 100%;
	left: 0px;
	width: 100%;
	display: flex;
	flex-flow: nowrap;
	padding: 0 20px 0 20px;
	background: dodgerblue;

	transform: scaleY(0);

	transition: transform 0.3s;
`;
let HistoryContentCol = styled.div`
	width: 50%;
	min-width: 320px;
`;
let HistoryContentItem = styled.div`
	${TextBase}
	width: 100%;
	padding: 0 0 5px 0;
`;
let TextBold = Text.extend`
	${TextBase}
	font-weight: bold;
	display: inline-block;
`;
class PanelRight extends React.Component {
	constructor(props) {
		super(props);
		// this.props = {
		// 	coinPrice: undefined,
		// 	coinName: undefined
		// }
	}
	handleToggleHistory = (event) => {
		let historyEl    = 
			event.currentTarget.parentElement,
		historyContentEl = 
			historyEl.querySelector(':nth-child(2)');
		toggleScaleY({
			element: historyContentEl,
			visible: '1',
			hidden: '0'
		});
	}
	componentDidMount = async() => {
		let wallet = new WalletClass;
		let result = await wallet.getHistory({address: undefined, accessToken: undefined});
		console.log(result, "RESULT");
	}
	render() {
		let coinPrice;
		let coinName;
		let status;
		if (this.props && this.props.wallet && this.props.wallet.panelRight) {
			coinPrice = this.props.wallet.panelRight.coinPrice;
			coinName  = this.props.wallet.panelRight.coinName;
			status    = this.props.wallet.panelRight.status;
		} else {
			return <H1>THIS STATE NULLO ?</H1>;
		}
		if (!coinPrice || !coinName || status !== 'open') {
			return <H1>PROBLEMA NO SEGUNDO IF</H1>;
		}
		return (
			<div>
				<CoinStatus>
					<CoinDetails>
						<CoinDetailsName>
							Bitcoin
						</CoinDetailsName>
						<CoinDetailsPrice>
							{ `1 ${coinName.toUpperCase()} ${coinPrice.BRL}` }
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
							<HistoryContentCol>
								<HistoryContentItem clWhite>
									Enviado: <TextBold>0.00000002 BTC ($ 2.00)</TextBold>
								</HistoryContentItem>
								<HistoryContentItem clWhite>
									Data: Segunda-feira, <TextBold>25/04/2018</TextBold>
								</HistoryContentItem>
							</HistoryContentCol>
							<HistoryContentCol>
								<HistoryContentItem clWhite>
									Transaction ID: <TextBold>a123ae456d54f564c654b4a564e</TextBold>
								</HistoryContentItem>
							</HistoryContentCol>
						</HistoryContent>
					</History>
				</Histories>
			</div>
		);
	}
}
let styledPanelRight = styled(PanelRight)`
	position: relative;
	background: ${style.normalLilac};
	width: 100%;
	height: 100%;
`;
const mapStateToProps = (state) => {
	return {
		wallet: state.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(styledPanelRight);;