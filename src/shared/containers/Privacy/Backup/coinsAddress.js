import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

//COMPONENTS
import { Row, Col, H1} from 'Components';

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

const coins = [
	'LNS',
	// 'BTC', 
	// 'ETH',
	// 'LTC',
	// 'DASH',
	// 'NANO',	
]

class CoinsAddress extends React.Component {  
	render() {
		return (
			coins.map( coin => {
        return (
					<CoinAddress key={coin}>
						<Row defaultAlign="left">
							<H1 txBold clWhite width={'65px'} padding={'1.2rem 0 0 0'}> 
								{coin}
							</H1>
							<Input disabled type="text" value='161cmLgavNNkWTjR61RnNqtejFeB88X6FM' />
						</Row>
					</CoinAddress>	
        )
      })
		);
	}
}

export default CoinsAddress;