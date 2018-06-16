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

export let Textarea = styled.textarea`
	padding: 40px;
	width: 100%;
	height: 150px;
	background: ${style.normalLilac};
	border: none;
	border-radius: 4px;
	color: white;
	text-align: center;
	font-size: 18px;
	resize: none;
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

export let Checkbox = styled.input`
	cursor: pointer;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	outline: 0;
	background: #f2f2f2;
	height: 12px;
	width: 12px;
	border: none;
	border-radius: 15%;
	margin-left: 10px;
	margin-right:10px;

	&:checked {
		background: ${style.normalGreen};
	}

	&:hover {
		filter: brightness(90%);
	}

	&:after {
		content: '';
		position: relative;
		left: 40%;
		top: 20%;
		width: 15%;
		height: 40%;
		border: solid ${style.normalLilac};
		border-width: 0 1px 1px 0;
		transform: rotate(45deg);
		display: none;
	}

	&:checked:after {
		display: block;
	}
  
`;