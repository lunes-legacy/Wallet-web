import styled from 'styled-components';
import { ColBase } from 'Components/bases';

export let Col = styled.div`
	width: 100%;
	${ColBase};
	${props => props.css ? props.css : ''};
`;