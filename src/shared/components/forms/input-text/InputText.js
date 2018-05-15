import styled from 'styled-components';
import style from 'Shared/style-variables';
import { InputBase, InputSizeBase } from 'Components/bases';

let InputText = styled.input`
	appearence: textfield;
	padding: 0.5rem;
	z-index: 2;
	overflow-x: auto;
	&:focus {
		outline: none;
	}
	&:disabled {
		color: #ccc;
		font-style: italic;
		user-select: none;
		&::placeholder {
			color: #ccc;
			font-style: italic;
			user-select: none;
		}
	}
	&::placeholder {
		color: white;
		${props => {
			if (props.phRight) {
				return 'text-align: right;';
			} else if(props.phCenter) {
				return 'text-align: center;';
			}
		}}
		${props => {
			if (props.phWeightBold) {
				return 'font-weight: bold;';
			} else if (props.phWeightLight) {
				return 'font-weight: 100;';
			}
		}}
		${props => {
			if (props.phStyleItalic)
				return 'font-style: italic;';
		}}
	}
	${InputBase};
	${InputSizeBase}
	${props => {
		if (props.whiteTheme) {
			return `
				border-color: white;
				color: white;
				& + label {
					color: white;
					border-color: white;
					text-shadow: 0px 0px 0px white;
				}`;
		} else if (props.darkLilacTheme) {
			return `
				border-color: ${style.darkLilac};
				color: ${style.lightLilac};
				& + label {
					color: ${style.darkLilac};
					border-color: ${style.darkLilac};
					text-shadow: 0px 0px 0px ${style.darkLilac};
				}`;
		} else if (props.lightLilacTheme) {
			return `
				border-color: ${style.lightLilac};
				color: white;
				& + label {
					color: ${style.lightLilac};
					border-color: ${style.lightLilac};
					text-shadow: 0px 0px 0px ${style.lightLilac};
				}`;
		}
	}}
	${props => props.css ? props.css : ''};
`;

export default InputText;