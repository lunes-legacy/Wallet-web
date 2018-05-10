import styled from 'styled-components';
import { RowBase } from 'Components/bases';

export let Row = styled.div`
	width: 100%;
	height: auto;
	overflow: auto;
	&:before {
		content: '';
	}
	&:after {
		content: '';
	}
	display: flex;
	justify-content: center;
	align-items: flex-start;
	flex-flow: wrap;
	${RowBase};
`;