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
	width: 50%;
	height: auto;
`;

export default class NotFound extends React.Component {
	render() {
		return(
			<StyledNotFound>
				<CustomImg src="/img/general/not-found.jpg" alt="Not found"/>
			</StyledNotFound>
		);
	}
}
