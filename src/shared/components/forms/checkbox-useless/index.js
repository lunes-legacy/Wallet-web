import React from 'react';
import ReactDOM from 'react-dom';
import Square from "./Square";
import Label from "./Label";
import StyledCheckbox from "./StyledCheckbox";
import Wrapper from "./Wrapper";

class Checkbox extends React.Component {
	componentDidMount() {
		this.checkbox = ReactDOM.findDOMNode(this.refs.checkbox);
		this.label    = ReactDOM.findDOMNode(this.refs.label);
		this.wrapper  = ReactDOM.findDOMNode(this.refs.wrapper);
		this.square   = ReactDOM.findDOMNode(this.refs.square);
	}
	handleToggleRadio = () => {
		let state   = this.checkbox.getAttribute('checked');
		if (!state) {
			this.square.style.visibility = 'visible';
			this.square.style.opacity    = '1';
			this.square.style.top        = '0px';
			this.checkbox.setAttribute('checked', 'checked');
			this.wrapper.setAttribute('checked', 'checked');
		} else {
			this.square.style.visibility = 'hidden';
			this.square.style.opacity    = '0';
			this.square.style.top        = '-50px';
			this.checkbox.removeAttribute('checked');
			this.wrapper.removeAttribute('checked');
		}
	}
	render() {
		let { value, ...restPropsLabel } = this.props.label;
		let { s,m,l, ...restPropsCheckBox } = this.props;
		return(
			<Wrapper ref="wrapper" s={s} m={m} l={l}>
				<StyledCheckbox {...restPropsCheckBox} ref="checkbox" onClick={this.handleToggleRadio}>
					<Square ref="square"/>
				</StyledCheckbox>
				<Label ref="label" {...restPropsLabel} onClick={this.handleToggleRadio}>
					{ value }
				</Label>
			</Wrapper>
		);
	}
}

export default Checkbox;