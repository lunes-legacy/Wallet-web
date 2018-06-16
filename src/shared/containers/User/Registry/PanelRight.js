import styled from 'styled-components';
import style from 'Shared/style-variables';


export let PanelRight = styled.aside`
	background: ${style.normalLilac};
	display: none;
	float: left;
	height: 100vh;
	width: 60%;

	@media only screen and (min-width: 768px) {
		display: block;
	}

`;