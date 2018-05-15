import styled from 'styled-components';
import style from 'Shared/style-variables';

let RadioCheckmark = styled.div.attrs({
	className: 'checkmark'
})`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 100%;
	background: ${style.normalGreen};
	top: -5rem;
	left: 0.25rem;
	opacity: 0;
	position: absolute;
	z-index: 100;
	visibility: hidden;
	transition: all 0.3s;
`;

export default RadioCheckmark;