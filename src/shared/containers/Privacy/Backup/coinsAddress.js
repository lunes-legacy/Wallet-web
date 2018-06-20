import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

// REDUX
import { connect } from 'react-redux';

//COMPONENTS
import { Row, Col, H1} from 'Components';

// CONSTANTS
import { ENABLEDCOINS } from "Config/constants";

const CoinAddress = styled.div`
	margin: 25px 0;
`;

const Input = styled.input`
	border: 1px solid ${style.lightPurple};
	background-color: ${style.defaultPurple};
	border-radius: 6px;
	color: ${style.normalGreen};
	font-Size: 1.6rem;
	height: 44px;
	text-align: center;
	padding: 20px;
	width: 80%;
`;

class CoinsAddress extends React.Component { 
	render() {
		return (
			ENABLEDCOINS.map( coin => {
        return (
					<CoinAddress key={coin.coinKey}>
						<Row defaultAlign="left">
							<H1 txBold clWhite width={'85px'} padding={'1.2rem 0 0 0'}> 
								{ coin.coinName }:
							</H1>
							<Input disabled type="text" placeholder="Carregando..." value={ this.props.walletInfo.addresses[coin.coinKey] ? this.props.walletInfo.addresses[coin.coinKey] : coin.address } />
						</Row>
					</CoinAddress>	
        )
      })
		);
	}
}

// REDUX
const mapStateToProps = state => {
  return {
    walletInfo: state.walletInfo,
  };
};
const mapDispatchToProps = dispatch => { };

export default connect(mapStateToProps, mapDispatchToProps)(CoinsAddress);
