import React from 'react';
import styled from 'styled-components';
import { Input as MatInput } from 'react-materialize';
import { TextBase } from 'Components/TextBase';
import { BlockBase } from 'Components/BlockBase';
import { MarginBase } from 'Components/bases';

let TmpInput = (props) => {
	return (<MatInput {...props}/>);
}

export let Input = styled(TmpInput)`
	${BlockBase};
	${TextBase};
	${MarginBase};
	${props => {
		//precisa ser unidade rem do css
		if (props.fontSize && props.fontSize.indexOf('rem') !== -1) {
			return `font-size: ${props.fontSize}!important;`;
		}
	}}
	border-style: solid;
`;