import { css } from 'styled-components';

let BackgroundBase = css`
	${props => {
		if (props.bgNormalGreen)
			return `background: ${style.normalGreen};`;
		if (props.bgNormalLilac)
			return `background: ${style.normalLilac};`;
		if (props.bgNormalRed)
			return `background: ${style.normalRed};`;
		if (props.bgNormalYellow)
			return `background: ${style.normalYellow};`;
		if (props.bgWhite)
			return `background: white; color: black;`;
	}}
`;

export default BackgroundBase;