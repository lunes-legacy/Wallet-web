import styled from 'styled-components';

export const Img = styled.img.attrs({src: `${props => props.src}`})`
	width: ${props => props.width ? props.width : '100px'};
	margin: ${props => props.margin ? props.margin : '0'};
	display: block;
`;