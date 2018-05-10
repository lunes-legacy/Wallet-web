import styled       from 'styled-components';
import style        from 'Shared/style-variables';
import { TextBase, BackgroundBase } from 'Components/index.js';
console.log(TextBase, BackgroundBase);
let Button = styled.div`
	display: block;
	height: 13rem;
	width: 13rem;
	border-radius: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	user-select: none;
	${TextBase};
	${BackgroundBase};
	${props => {
		if (props.blockCenter)
			return `margin: 0 auto;`;
	}}
	
`;

export default Button;