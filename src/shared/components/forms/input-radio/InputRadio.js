import styled from 'styled-components';

let InputRadio = styled.input.attrs({
	type: 'radio'
})`
	opacity: 0;
	cursor: pointer;
	display: inline;
	z-index: 2;
	width: 2rem;
	height: 2rem;
	margin: 0 0.25rem 0 0.25rem;
	&:checked ~ .checkmark {
		top: 0.25rem;
		opacity: 1;
		visibility: visible;
	}
`;

export default InputRadio;