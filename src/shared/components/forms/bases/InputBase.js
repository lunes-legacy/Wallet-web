import { css } from 'styled-components';
import { TextBase } from 'Components/TextBase';
import InputSizeBase from './InputSizeBase';

let InputBase = css`
	background: transparent;
	width: 100%;
	height: 3rem;
	border: none;
	border-bottom: 0.1rem solid white;
	z-index: 1;
	${TextBase};
	${InputSizeBase};
	${props => {
		if (props.noBorder) {
			return 'border: none';
		}
	}}
  &:focus {
    outline: none;
  }
`;

export default InputBase;
