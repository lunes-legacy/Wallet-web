import styled from 'styled-components';
import style from 'Shared/style-variables';

let Background = styled.div`
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	background: ${style.rgba(style.darkLilac, 0.8)};
	z-index: 1000;
	@media (min-width: 601px) {
		align-items: center;
	}
	& * {
		overflow: visible;
	}
`;
export default Background;
