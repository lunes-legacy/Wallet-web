import React from 'react';
import styled from 'styled-components';

let StyledNotFound = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
let CustomImg = styled.img`
	width: 35%;
	height: auto;
`;

export default class NotFound extends React.Component {
	render() {
		return(
			<StyledNotFound>
				<CustomImg src="/img/general/lunio-notfound.png" alt="Not found"/>
			</StyledNotFound>
		);
	}
}
