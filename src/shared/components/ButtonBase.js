import { css } from 'styled-components';
import { BlockBase } from './BlockBase';
import style from 'Shared/style-variables';

export let ButtonBase = css`
	${BlockBase}
	background: ${style.normalGreen};	
	color: white;
	padding: 10px 20px 10px 20px;
	font-size: 16px;
	text-align: center;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	&:focus {
		outline: none;
	}
`;