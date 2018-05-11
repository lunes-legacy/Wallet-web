import styled from 'styled-components';
import style from 'Shared/style-variables';
import { InputBase } from './../bases';

let StyledInput = styled.input`
	appearence: textfield;
	padding: 0.5rem;
	z-index: 2;
	overflow-x: auto;
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: white;
		${props => {
			if (props.phRight) {
				return 'text-align: right';
			} else if(props.phCenter) {
				return 'text-align: center';
			}
		}}
	}
	${InputBase};
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

export default StyledInput;