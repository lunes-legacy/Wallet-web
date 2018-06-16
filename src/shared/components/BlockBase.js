import { css } from 'styled-components';

export let BlockBase = css`
	display: block;
	margin: 0 auto;
	width: 100%;
	${props => {
		if (props.bdColor) {
			return `border-color: ${props.bdColor};`;
		}
		if (props.bdWidth && props.bdWidth.indexOf('rem') !== -1) {
			return `border-width: ${props.bdWidth};`;
		}
	}}
`;