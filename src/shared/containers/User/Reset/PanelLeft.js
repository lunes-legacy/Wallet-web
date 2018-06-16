import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

let PanelLeft = styled.aside`
	background: ${style.darkLilac};
	float: left;
	width: 100%;
	height: 100vh;
	overflow: auto;
	padding-bottom: 50px;

	@media only screen and (min-width: 768px) {
		width: 40%;
	}
`;

export default PanelLeft;