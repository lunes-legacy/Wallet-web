import styled from 'styled-components';
import style from 'Shared/style-variables';

let PanelLeft = styled.aside`
	background: ${style.darkLilac};
	float: left;
	height: 100vh;
	padding-bottom: 50px;
	width: 100%;
	overflow: auto;

	@media (${style.media.tablet2}) {
    width: 50%;
	}
`;

export default PanelLeft;