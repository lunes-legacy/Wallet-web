import styled from 'styled-components';
import style from 'Shared/style-variables';

let RadioCheckmark = styled.div.attrs({
	className: 'checkmark'
})`
		z-index: 1;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 100%;
		background: ${style.normalGreen};
		top: -5rem;
		left: 0.25rem;
		opacity: 0;
		position: absolute;
		transition: all 0.3s;
`;

export default RadioCheckmark;