import styled from 'styled-components';
import { Link as TmpLink } from 'react-router-dom';

import { LinkBase } from './LinkBase';
// import { BlockBase } from './BlockBase';

export let Link = styled(TmpLink)`
	${LinkBase}
`;

export let CustomLink = styled(TmpLink)`
	font-size: 1.4rem;
	text-decoration: none;
	text-align: center;
	display: ${props => props.display ? props.display : 'block'};
	color: ${props => props.color ? props.color : 'white'};
	margin: ${props => props.margin ? props.margin : '10px auto 0 auto' };
`;
