import styled from 'styled-components';
import style from 'Shared/style-variables';

let Circle = styled.div`
	width: calc(2.5rem - 10px);
	height: calc(2.5rem - 10px);
	border-radius: 100%;
	background: transparent;
	position: absolute;
	top: -50px;
	left: 0px;
	background: ${style.normalGreen};
	z-index: 2;
	visibility: hidden;
	user-select: none;
	transition: all .1s linear;
`;

export default Circle;