import styled from 'styled-components';
import style from 'Shared/style-variables';

let StyledModal = styled.div`
	width: 100%;
	height: calc(100% - 75px);
	min-width: 320px;
	min-height: 480px;
	position: relative;
	background: ${style.normalLilac};
	border-radius: 10px;
	padding: 3rem;
	@media (min-width: 601px) {
		width: 70%;
		height: 70%;
		margin-top: 75px;
	}
`;

export default StyledModal;