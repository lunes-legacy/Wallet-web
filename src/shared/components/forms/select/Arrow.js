import styled from 'styled-components';

let Arrow = styled.div`
	width: 35px;
	height: 50%;
	position: absolute;
	right: 0px;
	top: 25%;
	background: url('/img/general/arrow_up.svg');
	background-size: 100% 100%;
	background-position: center;

	animation-duration: 0.3s;
	animation-fill-mode: forwards;
`;

export default Arrow;