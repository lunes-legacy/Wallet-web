import styled from 'styled-components';
import { TextBase } from 'Components/TextBase';
import { InputBase } from './../bases';


let Head = styled.div`
	${TextBase};
	${InputBase};
	user-select: none;
	color: white;
	cursor: pointer;
`;

export default Head;