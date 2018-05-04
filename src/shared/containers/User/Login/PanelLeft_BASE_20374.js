import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';

const PanelLeft = styled.aside`
	background: ${style.darkLilac};
	float: left;
	width: 40%;
	height: 100vh;
	overflow: auto;
	padding: 0 0 50px 0;
`;

export default PanelLeft;