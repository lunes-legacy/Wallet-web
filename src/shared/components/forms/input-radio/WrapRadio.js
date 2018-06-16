import styled from 'styled-components';
import style from 'Shared/style-variables';

let WrapRadio = styled.div`
	width: auto;
	height: auto;
	position: relative;
	cursor: pointer;
	display: flex;
	align-items: center;
	margin-right: 1rem;
	overflow: visible;
	&::before {
		content: '';
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		background: ${style.lightLilac};
		top: 0px;
		left: 0px;
		position: absolute;
	}
	${props => props.css ? props.css : ''};
`;

export default WrapRadio;