import React from 'react';
import { Img, Row, Col } from 'Components';
import styled from 'styled-components';


 let ImgSent = styled.img `

 width: 35%;
 margin-top: 10rem;
 display: block;
 margin-left: auto;
 margin-right: auto;

  `;
class Final extends React.Component {
	render() {
		return(
			<Row defaultAlign={'center'}>
				<Col s={6} m={6} l={6}>
					<ImgSent center width={'70%'} src={'/img/app_wallet/envio_final.svg'}/>
					
				</Col>
			</Row>
		);
	}
}

export default Final;