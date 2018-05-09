import React from 'react';
import styled, { css } from 'styled-components';
import style  from 'Shared/style-variables';
import { TextBase } from 'Components/TextBase';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';

//BASES
import { 
	InputBase, 
	GridBase, 
	InputSizeBase } from './bases';

import Select from './select';
import Text from './text';







let WrapRadio   = styled.div`
	width: auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;
let StyledRadio = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 100%;
	border: 5px solid ${style.lightLilac};
	background: transparent;
	cursor: pointer;
	position: relative;
`;
let RadioCircle = styled.div`
	width: calc(2.5rem - 10px);
	height: calc(2.5rem - 10px);
	border-radius: 100%;
	background: transparent;
	position: absolute;
	top: -50px;
	left: 0px;
	background: ${style.normalGreen};
	z-index: 2;
	visibility: hidden;
	user-select: none;
	transition: all .1s linear;
`;
let LabelRadio = styled.div`
	${TextBase};
	padding-left: 5px;
	color: white;
	user-select: none;
`;
let Radio = (props) => {
	let handleToggleRadio = (event) => {
		let radioEl  = event.currentTarget;
		let circleEl = radioEl.children[0];
		let state   = radioEl.getAttribute('checked');
		if (!state) {
			// radioEl.style.background  = style.normalGreen;
			circleEl.style.visibility = 'visible';
			circleEl.style.opacity    = '1';
			circleEl.style.top        = '0px';
			radioEl.setAttribute('checked', 'checked');
		} else {
			// radioEl.style.background  = 'transparent';
			circleEl.style.visibility = 'hidden';
			circleEl.style.opacity    = '0';
			circleEl.style.top        = '-50px';
			radioEl.removeAttribute('checked');
		}
	}

	let { type, children, ...restProps } = props;
	let { value, ...restPropsLabel } = props.label;
	return(
		<WrapRadio>
			<StyledRadio onClick={handleToggleRadio}>
				<RadioCircle/>
			</StyledRadio>
			<LabelRadio {...restPropsLabel}>
				{ value }
			</LabelRadio>
		</WrapRadio>
	);
}






let Input = (props) => {
	switch (props.type) {
		case 'text':   return <Text {...props}/>;   break;
		case 'radio':  return <Radio {...props}/>;  break;
		case 'select': return <Select {...props}/>; break;
	}
	return null;
}
export default Input;

// <Input type={'text'} placeholder={'Nome'}/>
// <Input type={'radio'} label={'Quantidade em BTC'}/>

// <Input type={select}>
// 	<option>BH</option>
// 	<option>SP</option>
// </Input>

