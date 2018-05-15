import React from 'react';
import ReactDOM from 'react-dom';
//PRIVATE COMPONENTS
import StyledInput from './StyledInput';
import Label from './Label';
import Wrapper from './Wrapper';

class Text extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: undefined
		}
		this.inputRef = React.createRef();
	}
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
		this.input   = this.wrapper.children[0];
		this.label   = ReactDOM.findDOMNode(this.refs.label);
	}
	handleOnKeyUp = () => {
		let value = this.input.value;
		this.setState({
			value 
		});
		if (this.props.type !== 'number') { return null; }
		let regex = /(?![0-9])(.)/gm;
		this.input.value = value.replace(regex, '');
	}
	handleClickLabel = () => {
		this.input.focus();
	}
	render() {
		if (this.props.label) {
			var { value, ...labelProps  } = this.props.label;
		}
		if (this.props.css) {
			var { wrapperCss, inputCss, labelCss } = this.props.css;
		}
		let { type, onChange, onKeyUp, onKeyPress, ...wrapperProps } = this.props;
		let { ...inputProps } = this.props;
		return (
			<Wrapper css={wrapperCss} value={this.state.value} {...wrapperProps} ref="wrapper">
				<StyledInput className={'js-input'} css={inputCss} {...inputProps} onFocus={this.handleOnFocus} onBlur={this.handleOnBlur}/>
				<Label ref="label" className={'label'} css={labelCss} {...labelProps} onClick={this.handleClickLabel}>
					{ value }
				</Label>
			</Wrapper>
		);
	}
}

export default Text;