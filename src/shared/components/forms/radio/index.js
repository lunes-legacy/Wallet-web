import React from 'react';
import ReactDOM from 'react-dom';
import Circle from "./Circle";
import Label from "./Label";
import StyledRadio from "./StyledRadio";
import Wrapper from "./Wrapper";

class Radio extends React.Component {
	handleToggleRadio = (event) => {
		let state   = this.radio.getAttribute('checked');
		this.checkJustOne();
		if (!state) {
			this.circle.style.visibility = 'visible';
			this.circle.style.opacity    = '1';
			this.circle.style.top        = '0px';
			this.radio.setAttribute('checked', 'checked');
		} else {
			this.circle.style.visibility = 'hidden';
			this.circle.style.opacity    = '0';
			this.circle.style.top        = '-50px';
			this.radio.removeAttribute('checked');
		}
	}
	checkJustOne = () => {
		let { name } = this.props;
		if (!name)   { return null; }
		let others = document.getElementsByName(name);
		if (!others) { return null; }
		Array.from(others).map((radioEl) => {
			let circleEl = radioEl.children[0];
			let state    = radioEl.getAttribute('checked');
			if (!state) { return null; }
			circleEl.style.visibility = 'hidden';
			circleEl.style.opacity    = '0';
			circleEl.style.top        = '-50px';
			radioEl.removeAttribute('checked');
		});
	}
	componentDidMount() {
		this.label   = ReactDOM.findDOMNode(this.refs.label);
		this.radio   = ReactDOM.findDOMNode(this.refs.radio);
		this.circle  = ReactDOM.findDOMNode(this.refs.circle);
		this.wrapper = ReactDOM.findDOMNode(this.refs.wrapper);
	}

	render() {
		let { value, ...restPropsLabel } = this.props.label;
		let { s,m,l, ...restPropsRadio } = this.props;
		return(
			<Wrapper ref="wrapper" s={s} m={m} l={l}>
				<StyledRadio {...restPropsRadio} ref="radio" onClick={this.handleToggleRadio}>
					<Circle ref="circle"/>
				</StyledRadio>
				<Label ref="label" {...restPropsLabel} onClick={this.handleToggleRadio}>
					{ value }
				</Label>
			</Wrapper>
		);
	}
}

export default Radio;