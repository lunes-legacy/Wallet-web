import React        from 'react';
import styled       from 'styled-components';
import style        from 'Shared/style-variables';
import { TextBase } from 'Components/TextBase';
import { connect }  from 'react-redux';

import { Loading }  from 'Components/Loading';


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


class Coins extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: undefined,
			coinsPrice: undefined
		}
	}
	render() {
		let { balance, coinsPrice } = this.props;
		return (
			<div>
				<CoinsHeader>
					MINHAS CARTEIRAS
				</CoinsHeader>

				<img src={"/img/wave-my-wallets.png"} style={{width: '100%'}}/>

				{
					(() => {
						if (!coinsPrice || !balance) {
							return <Loading/>;
						} else if (!balance.btc) {
							return <H1>Moeda(BTC) não encontrada</H1>;
						}
						let components = [];
						//EX: coinKey = 'btc';
						for (let coinKey in balance) {
							components.push(
								<Coin key={coinKey} onClick={() => { this.props.openPanelRight({coinPrice: coinsPrice[coinKey], coinName: coinKey}) }}>
									<WrapCoinImg>
										<CoinImg src="/img/bitcoin.svg"/>
									</WrapCoinImg>
									<WrapCoinData>
										<CoinAmount clWhite offSide size={'2.5rem'}>
											{ balance[coinKey].total_confirmed }
										</CoinAmount>
										<CoinValue clWhite offSide size={'2rem'}>
											{ `USD ${balance[coinKey].total_amount}` }
										</CoinValue>
									</WrapCoinData>
								</Coin>
							);
						}
						return components;
					})()
				}
			</div>
		);
	}
}
let styledCoins = styled(Coins)`
	width: auto;
	min-width: 100%;
`;
const mapStateToProps = (state) => {
	return {
		wallet: state.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		openPanelRight: ({coinPrice, coinName}) => {
			dispatch({
				type: 'WALLET_OPEN_PANELRIGHT',
				payload: {coinPrice, coinName}
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(styledCoins);