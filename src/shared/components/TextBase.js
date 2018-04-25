import { css } from 'styled-components';
import style from 'Shared/style-variables';

export let TextBase = css`
	font-size: 1.8rem;
	display: block;
	${props => {
		if (props.clNormalGreen) {
			return 'color: '+style.normalGreen;
		} else if(props.clWhite) {
			return 'color: white';
		} else if (props.clNormalLilac) {
			return 'color: '+style.normalLilac;
		}
	}}
	${props => {
		if (props.txCenter) {
			return 'text-align: center';
		} else if (props.txRight) {
			return 'text-align: right';
		}
	}}
	${props => {
		if (props.margin) {
			return 'margin: '+props.margin+';';
		}
	}}
	${props => {
		if (props.size && props.size.indexOf('rem') !== -1) {
			return `font-size: ${props.size}`;
		}
	}}
`;