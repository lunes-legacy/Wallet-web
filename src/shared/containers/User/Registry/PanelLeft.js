import styled from 'styled-components';
import style from 'Shared/style-variables';

export let PanelLeft = styled.aside`
	background: ${style.darkLilac};
	float: left;
	width: 100%;
	height: 100vh;
	padding-bottom: 50px;
	overflow: auto;

	@media only screen and (min-width: 768px) {
		width: 40%;
	}

`;