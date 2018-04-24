import { css }       from 'styled-components';
import { Textbase }  from './TextBase';
import { BlockBase } from './BlockBase';


export let LinkBase = css`
	${Textbase}
	${BlockBase}
	text-decoration: none;
	color: white;
`;