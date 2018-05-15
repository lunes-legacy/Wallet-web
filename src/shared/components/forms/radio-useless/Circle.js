import styled from 'styled-components';
import style from 'Shared/style-variables';

let Circle = styled.div.attrs({
	className: 'js-radio-circle'
})`
	width: calc(2.5rem - 1rem);
	height: calc(2.5rem - 1rem);
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