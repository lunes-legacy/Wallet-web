import styled from 'styled-components';
import { TextBase } from './TextBase';

export let Text = styled.div`
	${TextBase};
	color: ${ props => (props.color ? props.color : "")};
	${props => props.css ? props.css : ''};
`;