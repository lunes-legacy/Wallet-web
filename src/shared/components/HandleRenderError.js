import React from 'react';
import { Text } from 'Components';

export default class HandleRenderError extends React.Component {
	render() {
		let { err } = this.props
		if (!err) {
			return null;
		}
		return (
			<React.Fragment>
				<Text>{ err.fileName   ? err.fileName   : '' }</Text>
				<Text>{ err.lineNumber ? err.lineNumber : '' }</Text>
				<Text>{ err.message    ? err.message    : '' }</Text>
			</React.Fragment>
		);
	}
}
