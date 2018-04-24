import React from 'react';
import styled from 'styled-components';
import style from 'Shared/style-variables';
import { errorPattern } from 'Utils/functions';

import { FormGroup } from './FormGroup';
import { Form }      from './Form';
import { Input }     from './Input';
import { ButtonSecondary } from './Buttons';


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
					<FormGroup key={index}>
						<input {...input}/>
						<label style={{color: 'white'}}>{ input.value }</label>
					</FormGroup>
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

