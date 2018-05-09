import React from 'react';
//PRIVATE COMPONENTS
import StyledInput from './StyledInput';
import Label from './Label';
import Wrapper from './Wrapper';

let Text = (props) => {
	let handleOnFocus = (event) => {
		let inputEl = event.currentTarget;
		let labelEl = inputEl.parentElement.querySelector('.label');
		labelEl.style.top           = '-100%';
		labelEl.style.animationName = 'input_text_label_shadow_up';
	}
	let handleOnBlur = (event) => {
		let inputEl = event.currentTarget;
		let labelEl = inputEl.parentElement.querySelector('.label');
		if (!inputEl.value) {
			labelEl.style.top               = '0px';
			labelEl.style.animationName     = 'input_text_label_shadow_down';
		} else if (inputEl.value) {
			labelEl.style.top               = '-100%';
			labelEl.style.animationName     = 'input_text_label_shadow_up';
		}	
	}
	let { value, ...labelProps  } = props.label;
	return (
		<Wrapper {...props}>
			<StyledInput {...props} onFocus={handleOnFocus} onBlur={handleOnBlur}/>
			<Label className={'label'} {...labelProps}>
				{ value }
			</Label>
		</Wrapper>
	);
}

export default Text;