import { css } from 'styled-components';

let InputSizeBase = css`
	${props => {
		if (props.small) {
			return `height: 2.5rem; font-size: calc(2.5rem - 1rem)`;
		} else if (props.normal) {
			return `height: 3rem; font-size: calc(3rem - 1rem)`;
		} else if (props.regular) {
			return `height: 4.5rem; font-size: calc(4.5rem - 1rem)`;
		} else if (props.big) {
			return `height: 5rem; font-size: calc(5rem - 1rem)`;
		} else if (props.huge) {
			return `height: 5.5rem; font-size: calc(5.5rem - 1rem)`;
		}
	}}
`;

export default InputSizeBase;