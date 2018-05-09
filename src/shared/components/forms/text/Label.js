import styled            from 'styled-components';
import { TextBase }      from 'Components/TextBase';
import { InputSizeBase } from './../bases';

let Label = styled.label`
	width: inherit;
	height: 3rem;
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: -1;
	${TextBase};
	${InputSizeBase};
	text-shadow: 0px 0px 0px transparent;
	transition: all 0.3s, text-shadow 0.15s, top 0.1s;
	animation-duration: 0.5s;
`;

export default Label;