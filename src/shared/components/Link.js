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

export let CircleLink = CustomLink.extend`
  background-color: white;
  border: 0;
  border-radius: 100%;
  height: ${props => props.height ? props.height : '40px'};
  width: ${props => props.width ? props.width : '40px'};
`;
