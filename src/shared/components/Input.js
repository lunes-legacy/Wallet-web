import styled from 'styled-components';
import style from 'Shared/style-variables';

export let Input = styled.input`
	padding: 15px;
	width: 100%;
	height: 45px;
	background: ${style.normalLilac};
	border: none;
	border-radius: 4px;
	color: white;
	font-size: 18px;
	&:focus {
		outline: none;
	}
	&::-webkit-input-placeholder {
		color: #ccc;
	}
	&::-moz-placeholder {
		color: #ccc;
	}
	&:-ms-placeholder {
		color: #ccc;
	}
`;