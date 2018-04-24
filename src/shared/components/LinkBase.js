import { css }       from 'styled-components';
import { Textbase }  from './Textbase';
import { BlockBase } from './BlockBase';

export let LinkBase = css`
	${Textbase}
	${BlockBase}
	text-decoration: none;
`;