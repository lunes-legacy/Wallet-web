import React         from 'react';
import ReactDOM      from 'react-dom';
import { renderToString } from 'react-dom/server';
import { timer } from 'Utils/functions';

//PRIVATE COMPONENTS
import Opt           from './Opt';
import Content       from './Content';
import Head          from './Head';
import Wrapper       from './Wrapper';
import StyledSelect  from './StyledSelect';
import Arrow         from './Arrow';

//OTHER PRIVATE STUFF
import {
	bounce_up_select_option,
	slide_down_select_content,
	slide_up_select_content,
	rotate_arrow_down,
	rotate_arrow_up
} from './keyframes';



export default class Select extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			children: undefined,
			value: 'Nome'
		};
		this.select;
	}
	componentDidMount = () => {
		this.select   = ReactDOM.findDOMNode(this.refs.select);
		this.head     = ReactDOM.findDOMNode(this.refs.head);
		this.wrapper  = ReactDOM.findDOMNode(this.refs.select);
		this.content  = ReactDOM.findDOMNode(this.refs.content);
		this.arrow    = ReactDOM.findDOMNode(this.refs.arrow);
		//relativo ao html font-size, este divisor
		this.select.style.maxHeight = (this.head.clientHeight / 10)+'rem';
	}
	addOptAnimation = async () => {
		let contentChildren = this.content.children;
		for (let key in contentChildren) {
			if (!contentChildren[key]) { continue; }
			let opt = contentChildren[key];
			if (!opt || !opt.style) { continue; }
			await timer(50);
			opt.style.animationName = bounce_up_select_option;
			setTimeout(() => {
				opt.style.animationName = '';
			}, 150);
		}
	}
	removeOptAnimation = async () => {
		let contentChildren = this.content.children;
		for (let key in contentChildren) {
			if (!contentChildren[key]) { continue; }
			let opt = contentChildren[key];
			if (!opt || !opt.style) { continue; }
			opt.style.animationName = '';
		}
	}
	handleToggleContent = async () => {
		let state = this.content.getAttribute('state');
		if (state === 'visible') {
			this.content.style.animationName = slide_up_select_content;
			this.content.setAttribute('state', 'hidden');
			this.arrow.style.animationName = rotate_arrow_down;
		} else {
			this.content.style.animationName = slide_down_select_content;
			this.content.setAttribute('state', 'visible');
			this.arrow.style.animationName = rotate_arrow_up;
			this.addOptAnimation();
		}
	}
	optClick = (event) => {
		let el = event.currentTarget;
		this.setState({
			value: el.textContent
		});
		this.handleToggleContent();
	}
	render() {
		let { s,m,l, children, ...selectProps } = this.props;
		return (
			<Wrapper ref="wrapper" s={s} m={m} l={l}>
				<StyledSelect ref="select" {...selectProps}>
					<Head ref="head" onClick={this.handleToggleContent} value={this.state.value}>
						{ this.state.value }
						<Arrow ref="arrow"/>
					</Head>
					<Content ref="content">
						{
							children.map((opt, key) => {
								if (!opt || !opt.props.children) { return null; }
								let optChildren = opt.props.children;

								return (
									<Opt {...opt.props} onClick={this.optClick} key={key}>{ optChildren }</Opt>
								);
							})
						}
					</Content>
				</StyledSelect>
			</Wrapper>
		);
	}
}