import React from 'react';
import { Text } from 'Components';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			render: {
				status: 'initial',
				message: ''
			}
		}
	}
	componentDidCatch(err, info) {
		this.setState({
			render: {
				status: 'error',
				message: err
			}
		});
	}
	_renderError = () => {
		let { message } = this.state.render;
		if (!message)
			return <Text>Error on trying to render this component, no error was returned.</Text>;
		if (this.props.entirePageError) {
			return (
				<div style={{height:'100vh',widht:'100%',color:'white',display:'flex',alignItems:'center',justifyContent:'center'}}>
					<h1>{ message.message }</h1>
					<h1>{ message.lineNumber }</h1>
					<h1>{ message.fileName }</h1>
				</div>
			);
		}

		return (
			<React.Fragment>
				<h1>{ message.message }</h1>
				<h1>{ message.lineNumber }</h1>
				<h1>{ message.fileName }</h1>
			</React.Fragment>
		);
	}
	render() {
		if (this.state.render.status === 'error') {
			return this._renderError();
		}
		return this.props.children;
		// let { err } = this.props
		// if (!err) {
		// 	return null;
		// }
		// return (
		// 	<React.Fragment>
		// 		<Text>{ err.fileName   ? err.fileName   : '' }</Text>
		// 		<Text>{ err.lineNumber ? err.lineNumber : '' }</Text>
		// 		<Text>{ err.message    ? err.message    : '' }</Text>
		// 	</React.Fragment>
		// );
	}
}
