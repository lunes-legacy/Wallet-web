import styled from 'styled-components';
import style from 'Shared/style-variables';

let PanelRight = styled.main`
	background: ${style.normalLilac};
	display: none;
	float: left;
	height: 100vh;
	width: 50%;

	@media only screen and (${style.media.tablet2}) {
		display: block;
	}
`;

export default PanelRight;