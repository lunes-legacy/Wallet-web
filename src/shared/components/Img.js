import styled from 'styled-components';

export let Img = styled.img`
	${props => {
		if (props.width)
			return `width: ${props.width}`
	}}
	${props => {
		if (props.margin)
			return `margin: ${props.margin}`;
	}}
	${props => {
		if (props.center)
			return 'margin: 0 auto';
	}}
	user-select: none;
	display: block;
`;