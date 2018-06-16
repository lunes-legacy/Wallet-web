import { css } from 'styled-components';

export let MarginBase = css`
	${props => {
		if (props.noMargin) {
			return `margin: none`;
		}
	}}
`;