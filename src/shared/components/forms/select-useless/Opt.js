import styled from 'styled-components';
import style  from 'Shared/style-variables';

import { TextBase } from 'Components/TextBase';
import { bounce_up_select_option } from './keyframes';

let Opt = styled.div`
	${TextBase};
	width: 100%;
	background: ${style.lightLilac};
	transform: scale(1);
	animation-origin: top;
	animation-duration: 0.1s;
	cursor: pointer;
	padding: 5px;
	user-select: none;
	color: white;
	&:last-child {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}
	transition: bold 0.3s;
	&:hover {
		animation-name: ${bounce_up_select_option};
		animation-fill-mode: forwards;
	}
`;

export default Opt;