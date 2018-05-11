import styled         from 'styled-components';
import style          from 'Shared/style-variables';
import { TextBase }   from 'Components/TextBase.js';
import BackgroundBase from 'Components/bases/BackgroundBase.js';

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
	${props => props.css ? props.css : ''};
`;

export default Button;