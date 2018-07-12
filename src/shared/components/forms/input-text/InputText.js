import styled from 'styled-components';
import style from 'Shared/style-variables';
import { InputBase, InputSizeBase } from 'Components/forms/bases';

let InputText = styled.input.attrs({
	type: 'text'
})`
	appearence: textfield;
	padding: 0.5rem;
	z-index: 2;
	overflow-x: auto;
	&:focus {
		outline: none;
	}

	${props => {
		if (props.noBrowserAppearance) {
			return `
				&::-webkit-inner-spin-button, 
				&::-webkit-outer-spin-button { 
				  -webkit-appearance: none; 
				  margin: 0; 
				}
			`;
		}
	}}
	
	&::placeholder {
		color: white;
		opacity: 0.3;
		${props => {
		if (props.phRight) {
			return 'text-align: right;';
		} else if (props.phCenter) {
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
		${props => {
		if (props.phMediumFont)
			return `color: #8975ae;
			font-size: 23px;
			font-weight: 300;`
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
		} else if (props.grayTheme) {
			return `
				border-color: #8975ae;
				color: #8975ae;
				font-size: 23px;
  				font-weight: 300;
				& + label {
					color: #8975ae;
					border-color: #8975ae;
					text-shadow: 0px 0px 0px #8975ae;
				}`;
		}
	}}
	${props => props.css ? props.css : ''};
`;

export default InputText;