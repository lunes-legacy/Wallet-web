import React        from 'react';
import { connect }  from 'react-redux';
import styled       from 'styled-components';
import style        from 'Shared/style-variables';
//COMPONENTS
import { TextBase } from 'Components/TextBase';
import { Text }     from 'Components/Text';
import { Loading }  from 'Components/Loading';

let StyledCoinStatus = styled.div`
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


class CoinStatus extends React.Component {
	render() {
		let { coinName, coinPrice } = this.props.wallet.panelRight || {coinName: undefined,coinPrice:undefined};
		if (!coinPrice || !coinName) {
			console.warn("if (coinPrice || coinName); ERRO");
			return null;
		}
		return(
			<StyledCoinStatus>
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
			</StyledCoinStatus>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		wallet: state.wallet
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CoinStatus);