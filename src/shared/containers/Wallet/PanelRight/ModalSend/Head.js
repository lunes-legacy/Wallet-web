import styled from 'styled-components';
import style from 'Shared/style-variables';


let Head    = styled.div`
	width: 150px;
	height: 150px;
	border-radius: 100%;
	background: ${style.normalLilac};
	position: absolute;
	top: -75px;
	left: calc(50% - 75px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 100;
	overflow: visible;
`;
export default Head;