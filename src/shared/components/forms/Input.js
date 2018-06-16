import React from 'react';
import styled, { css } from 'styled-components';
import style  from 'Shared/style-variables';
import { TextBase } from 'Components/TextBase';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';

// import Select   from './select';
// import Text     from './text';
// import Radio    from './radio';
// import Checkbox from './checkbox';

// import Select   from './select';
import InputText     from './input-text';
import InputRadio    from './input-radio';
// import Checkbox from './checkbox';


let Input = (props) => {
	switch (props.type) {
		case 'text':     return <InputText {...props}/>;   break;
		// case 'number':   return <Text {...props}/>;   break;
		case 'radio':    return <InputRadio {...props}/>;  break;
		// case 'select':   return <Select {...props}/>; break;
		// case 'checkbox': return <Checkbox {...props}/>; break;
	}
	return <input type="text" {...props}/>;
}
export default Input;
