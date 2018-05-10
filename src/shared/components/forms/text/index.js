import React from 'react';
import ReactDOM from 'react-dom';
//PRIVATE COMPONENTS
import StyledInput from './StyledInput';
import Label from './Label';
import Wrapper from './Wrapper';

class Text extends React.Component {
	handleOnFocus = (event) => {
		this.label.style.top           = '-100%';
		this.label.style.animationName = 'input_text_label_shadow_up';
	}
	handleOnBlur = (event) => {
		if (!this.input.value) {
			this.label.style.top           = '0px';
			this.label.style.animationName = 'input_text_label_shadow_down';
		} else if (this.input.value) {
			this.label.style.top           = '-100%';
			this.label.style.animationName = 'input_text_label_shadow_up';
		}	
	}
	componentDidMount() {
		this.wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
		this.input   = ReactDOM.findDOMNode(this.refs.input);
		this.label   = ReactDOM.findDOMNode(this.refs.label);
	}
	handleOnKeyUp = () => {
		if (this.props.type !== 'number') { return null; }
		let value = this.input.value;
		let regex = /(?![0-9])(.)/gm;
		this.input.value = value.replace(regex, '');
	}
	render() {
		let { value, ...labelProps  } = this.props.label;
		let { type, ...inputProps } = this.props;
		return (
			<Wrapper {...inputProps} ref="wrapper">
				<StyledInput ref="input" {...inputProps} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur} onKeyUp={this.handleOnKeyUp}/>
				<Label ref="label" className={'label'} {...labelProps}>
					{ value }
				</Label>
			</Wrapper>
		);
	}
}

export default Text;