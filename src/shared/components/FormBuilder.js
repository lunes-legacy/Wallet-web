import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { errorPattern } from 'Utils/functions';

import { FormGroup } from './FormGroup';
import { Form }      from './Form';
import { Input }     from './Input';
import { ButtonSecondary } from './Buttons';

// import { Checkbox } from 'react-materialize';

let FormGroupCheck =  FormGroup.extend`
	text-align: center;
	display: block;
	margin: 10px auto 0 auto;
`;

export class FormBuilder extends React.Component {
	render() {
		let { inputs } = this.props;
		if (!Array.isArray(inputs)) {
			console.log(errorPattern('FormBuilder: input prop is not an array.', 500, 'FORM_BUILDER_ERROR'));
			return null;
		}
		return inputs.map((input, index) => {
			if (input.type == 'checkbox') {
				return (
					<FormGroupCheck key={index}>
						<label style={{color: 'white', fontSize: '1.4em'}}>
						<input {...input} />
						{ input.value }
						</label>
					</FormGroupCheck>
				);
			}
			return (
				<FormGroup key={index}>
					<Input {...input}>{ input.value }</Input>
				</FormGroup>
			);
		})
	}
}

