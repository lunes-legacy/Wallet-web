import React from 'react';
import { Img, Row, Col } from 'Components';

class Final extends React.Component {
	render() {
		return(
			<Row defaultAlign={'center'}>
				<Col s={6} m={6} l={6}>
					<Img center width={'70%'} src={'/img/app_wallet/ic_send_final.png'}/>
				</Col>
			</Row>
		);
	}
}

export default Final;