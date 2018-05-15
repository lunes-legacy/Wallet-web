import styled from 'styled-components';
import style from 'Shared/style-variables';

let StyledCheckbox = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 0.3rem;
	border: 5px solid ${style.lightLilac};
	background: transparent;
	cursor: pointer;
	position: relative;
`;

export default StyledCheckbox;