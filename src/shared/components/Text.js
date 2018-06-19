import styled from 'styled-components';
import style from 'Shared/style-variables';
import { TextBase } from './TextBase';

export let Text = styled.div`
	${TextBase};
	${props => props.css ? props.css : ''};
	color: ${ props => { return props.color ? props.color : '' } };
`;