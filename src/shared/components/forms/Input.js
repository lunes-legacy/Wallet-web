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

import Select   from './select';
import Text     from './text';
import Radio    from './radio';
import Checkbox from './checkbox';


let Input = (props) => {
	switch (props.type) {
		case 'text':     return <Text {...props}/>;   break;
		case 'radio':    return <Radio {...props}/>;  break;
		case 'select':   return <Select {...props}/>; break;
		case 'checkbox': return <Checkbox {...props}/>; break;
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

